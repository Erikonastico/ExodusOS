const { Client, Pool } = require('pg')
const pool = new Pool({
  connectionString: "postgres://ahpqgzebbgjwkx:831faeffacd01c5a38a366eaf62734fc4465cd275b9d61ab29feb0267f219a56@ec2-100-25-231-126.compute-1.amazonaws.com:5432/db51r2pd0v209q",
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

