const { Client, Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});

async function selectFrom(data, table, condition, values) {
  try {
    const res = await pool.query(
      `SELECT ${data} FROM ${table} ${condition}`, values
    );
    return res.rows[0][data];
  } catch (err) {
    return err.stack;
  }
}

async function update(table, values, place) {
  try {
    await pool.query(`UPDATE ${table} SET ${values} WHERE ${place}`);
  } catch (err) {
    return err.stack;
  }
}

async function select_built(value) {
  try {
    const res = await pool.query(value);
    console.log(res.rows[0]);
    return res.rows[0];
  } catch (err) {
    return err.stack;
  }
}

module.exports = {selectFrom, update, select_built};

