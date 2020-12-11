require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const serveStatic = require('serve-static');
const basicAuth = require('express-basic-auth');
const path = require('path');
const axios = require('axios');
const PORT = process.env.PORT || 3080;
const userId = process.env.USER_ID;
const userPassword = process.env.USER_PASSWORD;

const { testParticipants } = require('./testData');

const app = express();

app.use([
  basicAuth({
    authorizer: authorizeUser,
    challenge: true,
  }),
  serveStatic(path.join(__dirname, 'dist')),
]);

function authorizeUser(username, password) {
  const testUser = basicAuth.safeCompare(username, 'demo_user');
  const testPassword = basicAuth.safeCompare(password, 'demo_pass');
  if (testUser & testPassword) {
    return true;
  }
  const userMatches = basicAuth.safeCompare(username, userId);
  const passwordMatches = basicAuth.safeCompare(password, userPassword);
  return userMatches & passwordMatches;
}

const payload = {
  iss: process.env.API_KEY,
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, process.env.SECRET);

app.get('/logout', function(req, res) {
  //res.set('WWW-Authenticate', 'Basic realm=Authorization Required');

  //res.redirect(401, '/');
  //res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  res.status(401).send('Successfully logged out');
  //res.serveStatic(path.join(__dirname, 'dist'));
});

async function getTestParticipants() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(testParticipants);
    }, 1000);
  });
}

app.get('/api/participants', async function(req, res) {
  if (req.auth.user == 'demo_user') {
    res.send(await getTestParticipants());
    return;
  }
  const { meetingType, meetingId, participantStatus } = req.query;
  try {
    const participants = await fetchParticipants(
      meetingId,
      meetingType,
      participantStatus
    );
    res.send(participants);
  } catch (e) {
    const error = parseError(e);
    res.status(error.status).send(error.message);
  }
});

app.get('/api/live-participants', async function(req, res) {
  if (req.auth.user == 'demo_user') {
    res.send(await getTestParticipants());
    return;
  }
  try {
    const meetingId = await getMeetingId();
    const participants = await fetchParticipants(meetingId, 'live', 'active');
    res.send(participants);
  } catch (e) {
    const error = parseError(e);
    res.status(error.status).send(error.message);
  }
});

async function getMeetingId() {
  const url = `https://api.zoom.us/v2/users/${userId}/meetings`;
  const config = getConfig('live');
  const response = await axios.get(url, config);
  if (!response.data.meetings.length) {
    throw new Error('There are no meetings currently running.');
  }
  if (response.data.meetings.length > 1) {
    throw new Error(
      'There are multiple meetings running. Unable to get a list of participants.'
    );
  }
  const meetingId = response.data.meetings[0].id;
  return meetingId;
}

async function fetchParticipants(
  meetingId,
  meetingType = 'past',
  participantStatus = 'all'
) {
  if (!meetingId) {
    throw new Error('Meeting ID is required.');
  }
  const config = getConfig(meetingType);
  const url = `https://api.zoom.us/v2/metrics/meetings/${meetingId}/participants`;
  const response = await axios.get(url, config);
  const participants =
    participantStatus === 'active'
      ? filterActiveParticipants(response.data.participants)
      : response.data.participants;
  return participants;
}

function getConfig(meetingType) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      type: meetingType,
      page_size: 300,
    },
  };
}

function parseError(e) {
  let error = {};
  if (e.response) {
    error.status = e.response.status;
    error.message = e.response.data.message;
  } else {
    error.status = 500;
    error.message = e.message
      ? e.message
      : 'Something went wrong, please try again later.';
  }
  return error;
}

function filterActiveParticipants(participants) {
  return participants.filter(participant => !participant.leave_time);
}

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
