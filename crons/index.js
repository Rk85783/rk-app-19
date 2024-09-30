const CronJob = require("cron").CronJob;

module.exports.firstJob = new CronJob(
  '* * * * * *',
  async function () {
    console.log('You will see this message every second');
  }
);

module.exports.secondJob = new CronJob(
  '*/5 * * * * *',
  async function () {
    console.log('You will see this message every 5 second');
  }
);