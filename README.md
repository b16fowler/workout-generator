# Workout Generator

## Description
This web application is designed to allow users to generate random workouts based on number of exercises and targeted muscle types.

## Getting Started

### Built With:
Javascript, React, AWS EC2, AWS RDS, HTML, MySQL, Node Express

### Using the app
Web app is hosted on an AWS EC2 instance. You can access it at: http://3.80.211.117:3000 
  
A preview account has been set up for testing the app and has several exercises preloaded:  
`Username: admin, Password: admin`  
  
There are measures in place to stop edits of any kind to this account and it's exercises.

## User Features
### Add exercises
Users can add exercises to their account with details like # of reps, # of sets, and an image of the exercise that they want to display during their workout.
### View exercises
A user can view all of the exercises and their details they've added to their account in a table.
### Generate workout
Finally, users can generate of workout to contain a certain.
number of exercises, as well as specific muscle types that this workout should target.

## Admin Features
### See Users
Admin accounts can pull up a chart listing all users who have accounts for the application.
### Delete Users
Admins can search for a user's account and delete it if it exists in the database.
### Reset Passwords
User accounts can have their passwords reset by an admin.

## Notes/Limitations
This project is functional, but still in progress. See a list of coming features/improvements in *index.js*.  
Application is not formatted for mobile devices.

