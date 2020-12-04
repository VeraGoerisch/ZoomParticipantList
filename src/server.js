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

app.get('/api/participants', function(req, res) {
  let meetingStatus = req.query.meetingStatus;
  let meetingId = req.query.meetingId;
  let participantStatus = req.query.participantStatus;

  let url =
    meetingStatus === 'current'
      ? `https://api.zoom.us/v2/metrics/meetings/${meetingId}/participants`
      : `https://api.zoom.us/v2/past_meetings/${meetingId}/participants`;

  let params = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get(url, params)
    .then(response => {
      let participants = response.data.participants;
      if (participantStatus === 'active') {
        participants = participants.filter(participant => {
          return !participant.leave_time;
        });
      }
      if (meetingStatus === 'current') {
        participants = participants.map(participant => {
          return {
            id: participant.id,
            name: participant.user_name,
            user_email: participant.email,
          };
        });
      }
      res.send(participants);
    })
    .catch(error => {
      let errorMsg = error.response.data
        ? error.response.data.message
        : 'Something went wrong, please try again later.';
      res.status(error.response.status).send(errorMsg);
    });
});

app.listen(3080, () => {
  console.log('App is listening on port 3080');
});
