# Workout Generator

## Description
This web application is designed to allow users to generate random workouts based on number of exercises and targeted muscle types.

## Getting started

### Built with:
Javascript, React, AWS EC2, AWS RDS, HTML, MySQL, Node Express

### Using the app
Web app is hosted on an AWS EC2 instance. You can access it at -> http://3.80.211.117:3000 
  
A preview account has been set up for testing the app and has several exercises preloaded:  
`Username: admin`  
`Password: admin`  
  
There are measures in place to stop edits of any kind to this account and it's exercises.

## User features
### Add exercises
Users can add exercises to their account with details like # of reps, # of sets, and an image of the exercise that they want to display during their workout.
### View exercises
A user can view all of the exercises they've added to their account in a table.
### Generate workout
Users can generate a workout to contain a certain number of exercises, as well as specific muscle types that this workout should target.
### Save/load workouts
After a workout is finished, users can reload it or save that workout to their library. When generating a workout, users will have the option to generate one from scratch or to load one from their saved workouts. 

## Admin features
### View accounts
Administrators can load a table listing all users who have accounts for the application. There is a column for each accounts: name, date/time account was created, date/time of last login, number of workouts that account has completed, and date/time of their last workout.
### Delete users
Admins can search for a user's account and delete it if it exists in the database.
### Reset passwords
User accounts can have their passwords reset by an admin (currently only resets passwords to whatever the accounts name is.

## Notes/limitations
This project is functional, but still in progress. See a list of coming features/improvements in *index.js*.  
Application is only formatted for desktop.

