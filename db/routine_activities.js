const client = require("./client");

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE id= $1
     
      `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const {
  //     rows: [routine_activity],
  //   } = await client.query(`SELECT * FROM routine_activities
  //    WHERE name='${id}';`);
  //   return routine_activity;
  // } catch (error) {
  //   console.log(error.error);
  // }
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
      `
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        
      `,
      [routineId, activityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    console.log(error);
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(
      `
    SELECT *
    FROM routine_activities
    WHERE "routineId"= $1
   
    `,
      [id]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      
      DELETE 
      FROM routine_activities 
      WHERE id=$1
      RETURNING *;
      
    `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    console.log(error);
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const {
      rows: [allRoutineAct],
    } = await client.query(
      `
    SELECT *
    FROM routine_activities
    INNER JOIN routines ON routine_activities."routineId" = routines.id
    AND routine_activities.id=$1
    `,
      [routineActivityId]
    );
    if (userId === allRoutineAct.creatorId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
