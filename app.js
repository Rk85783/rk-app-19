require("dotenv").config();
const express = require("express");
const cors = require("cors");
const appRouter = require("./routes/api.route");
const sequelize = require("./db");
// const { firstJob, secondJob } = require("./crons");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", appRouter);

sequelize.authenticate().then(async result => {
  console.log('Connection has been established successfully.');

  await sequelize.sync({
    force: true,
    alter: false,
    logging: false
  });

  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);

    // -----> Crons List
    // firstJob.start();
    // secondJob.start();
  });
}).catch(err => {
  console.error('Unable to connect to the database:', error);
})