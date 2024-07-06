const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASS || "root",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || "5432",
  database: process.env.DATABASE_NAME || "recruitment",
});

const getAllJobs = async (page_number, page_size) => {
  pool.connect();

  let data = {};

  try {
    const resultData = await pool.query(
      `
        SELECT * , count(*) OVER() AS full_count
        FROM job
        WHERE now() < job.expired_date
        ORDER BY job_id
        LIMIT  ${page_size}
        OFFSET ${page_number * page_size}
      `
    );

    data.row_count = resultData.rowCount;
    data.data = resultData.rows;
    data.total = resultData.rows[0]?.full_count || 0;
  } catch (error) {}

  return data;
};

const getJobByID = async (id) => {
  pool.connect();

  let data = {};

  try {
    const resultData = await pool.query(
      `
        SELECT * FROM job
        WHERE job.job_id = ${id}
      `
    );

    data.data = resultData.rows[0] || {};
  } catch (error) {}

  return data;
};

const createJob = async (title, description, expired_date) => {
  pool.connect();

  try {
    const resultData = await pool.query(
      `
        INSERT INTO job(title, description, expired_date)
        VALUES('${title}', '${description}', '${expired_date}')
      `
    );

    if (resultData.rowCount > 0) {
      return true;
    }
  } catch (error) {}

  return false;
};

const updateJobByID = async (id, title, description, expired_date) => {
  pool.connect();

  try {
    const resultData = await pool.query(
      `
        UPDATE job
        SET title = '${title || oldData.title}', description= '${
        description || oldData.description
      }', expired_date = '${expired_date || oldData.expired_date}'
        WHERE job_id = '${id}'
      `
    );

    if (resultData.rowCount > 0) {
      return true;
    }
  } catch (error) {}

  return false;
};

const deleteJobByID = async (id) => {
  pool.connect();

  try {
    const resultData = await pool.query(
      `
        DELETE FROM job
        WHERE job.job_id = ${id}
      `
    );

    if (resultData.rowCount > 0) {
      return true;
    }
  } catch (error) {}

  return false;
};

//wrap up all things
const model = {
  getAllJobs,
  getJobByID,
  createJob,
  updateJobByID,
  deleteJobByID,
};

module.exports = model;
