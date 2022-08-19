const client = require("./client");
const bcrypt = require("bcrypt");
const { de } = require("faker/lib/locales");
// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES($1, $2)
        RETURNING *;
      `,
      [username, hash]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users WHERE username = '${username}';
      `
    );
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users WHERE id = ${userId};
      `
    );
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users WHERE username = ${userName};
      `
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
