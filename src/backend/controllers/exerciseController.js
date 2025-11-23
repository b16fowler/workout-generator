import pool from "../config/db.js";

export const generate = async (req, res) => {
  console.log("\nGENERATE WORKOUT ATTEMPT (exercise info)\n");
  const create_table_query = `SELECT name, type, sets, reps FROM user_exercises WHERE username = "${req.body.user}" AND type IN (${req.body.selectedTypes})`;
  try {
    const result = await pool.query(create_table_query);
    console.log(
      `[SUCCESS] Exercise rows for user ${req.body.user} pulled from DB\n`
    );
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.user}'s data\n` + err + "\n"
    );
    res.json({
      success: false,
    });
  }
  console.log("End of post handler\n");
};

export const getExercisePhoto = async (req, res) => {
  console.log("\nGENERATE WORKOUT ATTEMPT (exercise image(s))\n");
  try {
    const picQuery = `SELECT pic FROM user_exercises WHERE username = "${req.body.user}" AND name = "${req.body.exerciseName}";`;
    const response = await pool.query(picQuery);
    const buffer = response[0][0].pic;
    const blob = new Blob([buffer], { type: "image/png" });

    console.log(`[SUCCESS] Image for user ${req.body.user} pulled from DB\n`);
    res.set("Content-Type", blob.type);
    res.send(buffer);
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.user}'s exercise image\n` +
        err +
        "\n"
    );
  }
  console.log("End of post handler\n");
};

export const getExerciseTable = async (req, res) => {
  console.log("\nLOAD EXERCISE TABLE ATTEMPT\n");
  const create_table_query = `SELECT * FROM user_exercises WHERE username = "${req.body.user}"`;
  try {
    const result = await pool.query(create_table_query);
    console.log(`[SUCCESS] User ${req.body.user}'s exercises pulled from DB\n`);
    res.json({
      success: true,
      exercises: result,
    });
  } catch (err) {
    console.log(
      `[ERROR] Error fetching user ${req.body.user}'s exercise data\n` +
        err +
        "\n"
    );
  }
  console.log("End of post handler\n");
};

export const addExercise = async (req, res) => {
  console.log("\nUPLOAD IMAGE ATTEMPT\n");
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
      `[SUCCESS] Image inserted into DB for user ${req.body.username}\n`
    );
    res.json({ message: "Exercise uploaded successfully" });
  } catch (err) {
    console.log(
      `[ERROR] Error trying to run insert query for user ${req.body.username}\n` +
        err +
        "\n"
    );
  }
  console.log("End of post handler\n");
};

export const saveWorkout = async (req, res) => {
  console.log("\nSAVE WORKOUT ATTEMPT\n");
  const saveQuery = ";";
  try {
    await pool.query(saveQuery);
    console.log(`[SUCCESS] Workout saved for user ${req.body.user}\n`);
    res.json({ success: true });
  } catch (err) {
    console.log(
      `[ERROR] Error trying to save workout for user ${req.body.user}\n` +
        err +
        "\n"
    );
  }
};
