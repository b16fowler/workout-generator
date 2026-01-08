import pool from "../config/db.js";

export const generateWorkout = async (req, res) => {
  console.log("GENERATE WORKOUT ATTEMPT (exercise info)");
  const create_table_query = `SELECT name, type, sets, reps, id FROM user_exercises WHERE username = "${req.body.username}" AND type IN (${req.body.selectedTypes})`;
  try {
    const result = await pool.query(create_table_query);
    console.log(
      `[SUCCESS] Exercise rows for user ${req.body.username} pulled from DB`
    );
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.username}'s data\n` + err
    );
    res.json({
      success: false,
    });
  }
  console.log("End of post handler\n");
};

export const getExercisePhoto = async (req, res) => {
  console.log("GENERATE WORKOUT ATTEMPT (exercise image(s))");
  try {
    const picQuery = `SELECT pic FROM user_exercises WHERE username = "${req.body.username}" AND name = "${req.body.exerciseName}";`;
    const response = await pool.query(picQuery);
    const buffer = response[0][0].pic;
    const blob = new Blob([buffer], { type: "image/png" });

    console.log(`[SUCCESS] Image for user ${req.body.username} pulled from DB`);
    res.set("Content-Type", blob.type);
    res.send(buffer);
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.username}'s exercise image` + err
    );
  }
  console.log("End of post handler\n");
};

export const getExerciseTable = async (req, res) => {
  console.log("LOAD EXERCISE TABLE ATTEMPT");
  const create_table_query = `SELECT * FROM user_exercises WHERE username = "${req.body.username}"`;
  try {
    const result = await pool.query(create_table_query);
    console.log(
      `[SUCCESS] User ${req.body.username}'s exercises pulled from DB`
    );
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.username}'s exercise data\n` + err
    );
  }
  console.log("End of post handler\n");
};

export const addExercise = async (req, res) => {
  console.log("UPLOAD IMAGE ATTEMPT");
  // buffer object for user's uploaded picture
  const photo = req.file.buffer;
  const info = req.body;

  // Determine how many exercises user currently has for ID
  const id_query = `SELECT COUNT(*) FROM user_exercises WHERE username = "${info.username}";`;
  let num_exercises = await pool.query(id_query);
  num_exercises = num_exercises[0][0]["COUNT(*)"] + 1;

  // Query + data being inserted into table
  const sql = "INSERT INTO user_exercises VALUES (?, ?, ?, ?, ?, ?, ?);";
  const values = [
    info.username,
    info.name,
    info.type,
    info.sets,
    info.reps,
    photo,
    num_exercises,
  ];

  // Run query
  try {
    await pool.execute(sql, values);
    console.log(
      `[SUCCESS] Image inserted into DB for user ${req.body.username}`
    );
    res.json({ message: "Exercise uploaded successfully" });
  } catch (err) {
    console.log(
      `[ERROR] Error trying to run insert query for user ${req.body.username}\n` +
        err
    );
  }
  console.log("End of post handler\n");
};

export const saveWorkout = async (req, res) => {
  console.log("SAVE WORKOUT ATTEMPT");

  // Find number of favorited workouts user has for new id
  const id_query = `SELECT COUNT(*) FROM favorites WHERE username = "${req.body.username}";`;
  let num_favorites = await pool.query(id_query);
  // No need to increment since id starts at 0
  const exercise_id = num_favorites[0][0]["COUNT(*)"];

  // Loop through all exercises in workout to save ids in workout_string
  let workout_string = "";
  req.body.workout.forEach(exercise => {
    // Concatenate exercise id and workout_string to make string of numbers separated by spaces
    workout_string = workout_string + exercise["id"] + " ";
  });

  const saveQuery = `INSERT INTO favorites VALUES ("${req.body.username}", "${exercise_id}", "${req.body.workoutName}", "${workout_string}");`;
  try {
    await pool.query(saveQuery);
    console.log(`[SUCCESS] Workout saved for user ${req.body.username}`);
    res.json({ success: true, message: "Workout saved successfully!" });
  } catch (err) {
    console.log(
      `[ERROR] Error trying to save workout for user ${req.body.username}` + err
    );
  }
  console.log("End of post handler\n");
};

export const workoutOptions = async (req, res) => {
  console.log("LOAD SAVED WORKOUTS ATTEMPT");
  const loadQuery = `SELECT name, workout FROM favorites WHERE username = "${req.body.username}";`;
  try {
    const workouts = await pool.query(loadQuery);
    console.log(workouts[0]);

    console.log(`[SUCCESS] Workouts fetched for user ${req.body.username}`);

    res.send({ success: true, workoutOptions: workouts });
  } catch (err) {
    console.log(
      `[ERROR] Error loading saved workouts for ${req.body.username}` + err
    );
  }
  console.log("End of post handler\n");
};

export const loadPreview = async (req, res) => {
  console.log("LOAD WORKOUT PREVIEW ATTEMPT");
  const previewQuery = `SELECT name, type, sets, reps, id FROM user_exercises WHERE username = "${req.body.username}" AND id = ${req.body.id};`;
  try {
    const exerciseInfo = await pool.query(previewQuery);
    console.log(
      `[SUCCESS] Workout preview fetched for user ${req.body.username} id: ${req.body.id}`
    );
    res.send({ success: true, preview: exerciseInfo[0][0] });
  } catch (err) {
    console.log(
      `[ERROR] Error loading preview for ${(req, body.username)} id: ${
        req.body.id
      }` + err
    );
    res.send({ success: false });
  }
  console.log("End of post handler\n");
};
