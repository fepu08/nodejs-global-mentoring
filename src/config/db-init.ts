import { client } from './pg-config';

async function init() {
  await client.connect();
  try {
    await client.query('BEGIN');
    await initUsersTable();
    await client.query('COMMIT');
  } catch (error) {
    console.error(error);
    await client.query('ROLLBACK');
  } finally {
    await client.end();
  }
}

async function initUsersTable() {
  await client.query(
    'CREATE TABLE Users(id SERIAL PRIMARY KEY, login VARCHAR(30) UNIQUE, password VARCHAR(30), age INTEGER )'
  );

  await client.query(
    'INSERT INTO Users (login, password, age) VALUES($1, $2, $3)',
    ['JohnDoe12', 'pasw123', 20]
  );

  await client.query(
    'INSERT INTO Users (login, password, age) VALUES($1, $2, $3)',
    ['JaneDoe', 'pasw321', 19]
  );

  await client.query(
    'INSERT INTO Users (login, password, age) VALUES($1, $2, $3)',
    ['JohnSmith112', '123pasw', 63]
  );

  await client.query(
    'INSERT INTO Users (login, password, age) VALUES($1, $2, $3)',
    ['JaneSmith221', '321pasw', 25]
  );
}

init();
