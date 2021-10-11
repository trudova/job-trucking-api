const Job =require("../models/Job");
const {StatusCodes} = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../errors");

const getAllJobs = async (req, res) => {
const jobs = await Job.find({createdBy: req.user.userId}).sort("createdAt");
res.status(StatusCodes.OK).json({jobs, count: jobs.length});

};

const getJob = async (req, res) => {
  const {user: {userId}, params:{id: jobId}} = req;
  const job = await Job.findOne({_id: jobId, createdBy: userId});
  if(!job){
    throw new NotFoundError(`no job with id ${jobId} was found`)
  }
  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
req.body.createdBy = req.user.userId;
const job = await Job.create(req.body);
res.status( StatusCodes.CREATED).json({job})
};

const updateJob = async (req, res) => {
  res.send("up all jobs");
};

const deleteJob = async (req, res) => {
  res.send("get all jobs");
};


module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
