const client = require("./client");

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(`SELECT * FROM routine_activities
     WHERE id=${id};`);
    return routine_activity;
  } catch (error) {
    console.log(error.error);
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `,
      [routineId, activityId, count, duration]
    );

    return routine_activity;
  } catch (error) {
    console.log(error.error);
  }
}
//cart items
async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(`SELECT * FROM routine_activities
     WHERE "routineId"=${id};`);
    return rows;
  } catch (error) {
    console.log(error.error);
  }
}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {
  try {
    const { rows } = await client.query(`DELETE FROM routine_activities
     WHERE id=${id}
     RETURNING *;`);
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.log(error.error);
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
