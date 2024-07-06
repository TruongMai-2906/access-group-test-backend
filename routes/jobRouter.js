const express = require("express");

const {
  getAllJobs,
  getJobByID,
  createJob,
  updateJobByID,
  deleteJobByID,
} = require("../controllers/jobController");

const router = express.Router();

//get all jobs
router.get("/", getAllJobs);

//get job by id
router.get("/:id", getJobByID);

//create job
router.post("/", createJob);

//update job by id
router.put("/:id", updateJobByID);

//delete job by id
router.delete("/:id", deleteJobByID);

module.exports = router;
