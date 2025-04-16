// worker.js
const jobQueue = require('./queue');

jobQueue.process(async (job) => {
  // console.log('Processing job:', job.data);

  console.log(`✅ Job completed: ${job.data.name}`);
});
