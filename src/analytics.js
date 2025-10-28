/**************************************************************************
 * analytics.js
 *
 * analytics file holds functions that are called to track a user's data
 * This data is visually represented in the UsersTable component
 **************************************************************************/

export function accountCreated(username) {
  console.log("Top of accountCreated function");

  // Create variable to hold current date/time
  let now = new Date();
  now = now.toLocaleString();

  fetch("/api/analytics/account-created", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, dateTime: now }),
  });
}
