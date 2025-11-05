/**************************************************************************
 * analytics.js
 *
 * analytics file holds functions that are called to track a user's data
 * This data is visually represented in the UsersTable component
 **************************************************************************/

import { EC2_URL } from ".";

export function accountCreated(username) {
  // Create variable to hold current date/time
  let now = new Date();
  now = now.toLocaleString();

  fetch(`${EC2_URL}/api/analytics/account-created`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: username, dateTime: now }),
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    });
}

export function accountLogin(username) {
  // Create variable to hold current date/time
  let now = new Date();
  now = now.toLocaleString();

  fetch(`${EC2_URL}/api/analytics/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: username, dateTime: now }),
  })
    .then((response) => response.json())
    .then((data) => {
      return;
    });
}

export function workoutFinished(username) {
  // Create variable to hold current date/time
  let now = new Date();
  now = now.toLocaleString();

  fetch(`${EC2_URL}/api/analytics/workout-finished`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: username, dateTime: now }),
  });
}
