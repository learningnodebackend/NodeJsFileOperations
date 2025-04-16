// server.js
const express = require('express');
const jobQueue = require('./queue');

const app = express();
app.use(express.json());

app.post('/job', async (req, res) => {
  const { name } = req.body;

  const job = await jobQueue.add({ name });

  res.json({ message: 'Job added to queue', jobId: job.id });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// curl -X POST http://localhost:3000/job -H "Content-Type: application/json" -d '{"name":"Dhaval’s Task4"}'