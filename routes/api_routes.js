// Require models 
const db = require("../models");

module.exports = function (app) {

  // Get all workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        if (err) {
          throw (err);
        } else {
          res.status(400);
        }
      });
  });

  // Create workout
  app.post("/api/workouts", ({
    body
  }, res) => {
    db.Workout.create(body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        if (err) {
          throw (err);
        } else {
          res.status(400);
        }
      });
  });

  // Update workout by id
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne({
      _id: req.params.id
    }, {
      $push: {
        exercises: req.body
      }
    })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        if (err) {
          throw (err);
        } else {
          res.status(400);
        }
      });
  });

  // Get all workouts to update stats page, sort oldest to newest
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).sort({_id:-1})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        if (err) {
          throw (err);
        } else {
          res.status(400);
        }
      });
  });

};