require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const axios = require('axios');

const app = express();

const payload = {
  iss: process.env.API_KEY,
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, process.env.SECRET);

app.get('/api/participants', async function(req, res) {
  const meetingType = req.query.meetingType;
  const meetingId = req.query.meetingId;
  const participantStatus = req.query.participantStatus;
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
  const userId = process.env.USER_ID;
  const url = `https://api.zoom.us/v2/users/${userId}/meetings`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      type: 'live',
    },
  };
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
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      type: meetingType,
      page_size: 300,
    },
  };
  const url = `https://api.zoom.us/v2/metrics/meetings/${meetingId}/participants`;
  const response = await axios.get(url, config);
  const participants =
    participantStatus === 'active'
      ? response.data.participants.filter(
          participant => !participant.leave_time
        )
      : response.data.participants;
  return participants;
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

app.listen(3080, () => {
  console.log('App is listening on port 3080');
});
