const jobModel = require("../models/jobModel");

//get all jobs
const getAllJobs = async (req, res) => {
  const { page_number, page_size } = req.query;

  const jobsData = await jobModel.getAllJobs(page_number, page_size);

  res.json({
    statusCode: 200,
    row_count: jobsData.row_count,
    data: jobsData.data,
    page_number: page_number,
    page_size: page_size,
    total_page: jobsData.total,
  });
};

//get job by id
const getJobByID = async (req, res) => {
  const { id } = req.params;
  const jobData = await jobModel.getJobByID(id);

  res.json({
    method: "GET",
    data: jobData.data,
  });
};

//create job
const createJob = async (req, res) => {
  const body = req.body;

  const requestData = {};

  requestData.title = body.title || "";
  requestData.description = body.description || "";
  requestData.expired_date = body.expired_date || "";

  const createData = await jobModel.createJob(
    requestData.title,
    requestData.description,
    requestData.expired_date
  );

  res.json({
    method: "POST",
    state: createData ? "successed" : "failed",
  });
};

//update job
const updateJobByID = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const requestData = {};

  requestData.title = body.title || "";
  requestData.description = body.description || "";
  requestData.expired_date = body.expired_date || "";

  const updateData = await jobModel.updateJobByID(
    id,
    requestData.title,
    requestData.description,
    requestData.expired_date
  );

  res.json({
    method: "PUT",
    state: updateData ? "successed" : "failed",
  });
};

//delete job
const deleteJobByID = async (req, res) => {
  const { id } = req.params;

  const deleteData = await jobModel.deleteJobByID(id);

  res.json({
    method: "DELETE",
    state: deleteData ? "successed" : "failed",
  });
};

//wrap up all things
const controller = {
  getAllJobs,
  getJobByID,
  createJob,
  updateJobByID,
  deleteJobByID,
};

module.exports = controller;
