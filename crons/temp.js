const CronJob = require("cron").CronJob;
const User = require("../db/models/user.model");

module.exports.firstCronJob = () => {
  firstJob.start();
  console.log("firstCronJob(): firstJob.start()")
}

// const firstJob = new cron.CronJob(
//   '* * * * * *', // cronTime
//   function () {
//     console.log('You will see this message every second');
//   }, // onTick
//   // null, // onComplete
//   // true, // start
//   // 'America/Los_Angeles' // timeZone
// );

let count = 0
const firstJob = new CronJob(
  '* * * * * *',
  async function () {
    console.log('You will see this message every second');
    count++
    try {
      const users = await User.findAndCountAll({
        raw: true,
        order: [
          ["createdAt", "ASC"]
        ]
      });
      console.log(users, '---------> users');
      // firstJob.stop();
    } catch (error) {
      console.log("catch error: ", error);
      // firstJob.stop();
    }
    firstJob.stop();
    console.log(count);
  }
);