/**************************************************************************
 * analytics.js
 *
 * analytics file holds functions that are called to track a user's data
 * This data is visually represented in the UsersTable component
 **************************************************************************/

import { EC2_URL } from "..";
import axios from "axios";

export function accountCreated(username) {
  // Create variable to hold current date/time
  let now = new Date();
  now = now.toLocaleString();

  const fetchData = async () => {
    try {
      axios.post(`${EC2_URL}/api/analytics/account-created`, {
        user: username,
        dateTime: now,
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}

export function accountLogin(username) {
  // Create variable to hold current date/time
  let now = new Date();
  now = now.toLocaleString();

  const fetchData = async () => {
    try {
      axios.post(`${EC2_URL}/api/analytics/login`, {
        user: username,
        dateTime: now,
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}

export function workoutFinished(username) {
  // Create variable to hold current date/time
  let now = new Date();
  now = now.toLocaleString();

  const fetchData = async () => {
    try {
      axios.post(`${EC2_URL}/api/analytics/workout-finished`, {
        user: username,
        dateTime: now,
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}
