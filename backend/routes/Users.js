var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

// Load User model
const User = require("../models/Users");
const Recruiter = require("../models/Recruiter");
const Applicant = require("../models/Applicant");
const Application = require("../models/Application");
const Job = require("../models/Job");
// GET request
// Getting all the users

router.post("/jobrating", (req, res) => {
  Job.update(
    { email: req.body.email, title: req.body.title },
    { $inc: { "rating.given": req.body.value, "rating.total": 5 } },
    function (err, users) {
      console.log(err);
      if (err) {
        res.status(204).json({
          error: "Some unknown error",
        });
      }
    }
  );
});
router.post("/statusshortlist", (req, res) => {
  console.log("HELp");
  Application.update(
    { email: req.body.email, title: req.body.title },
    {
      $set: {
        status: "Rejected",
      },
    },
    function (err, user) {
      console.log(err);
      if (err) {
        return res.status(204).json({
          error: "Some unknown error",
        });
      } else res.status(200).json(user);
    }
  );
});

router.post("/deljob"),
  (req, res) => {
    console.log("DASDA");
    Job.deleteOne(
      { title: req.body.title, email: req.body.email },
      function (err, obj) {
        if (err) {
          console.log(err);
          res.status(204).json({
            error: "Some unknown error",
          });
        } else {
          // Application.deleteOne(
          //   { title: req.body.title, recruiter_email: req.body.email },
          //   function (err, obj) {
          //     if (err) {
          //       console.log(err);
          //       res.status(204).json({
          //         error: "Some unknown error",
          //       });
          //     } else {
          //       res.status(200).json(obj);
          //     }
          //   }
          // );
        }
      }
    );
  };

router.post("/statusaccept", (req, res) => {
  console.log("HELp");
  Application.update(
    { recruiter_email: req.body.email, title: req.body.title },
    {
      $set: {
        status: "Accepted",
        date_of_joining: Date.now(),
      },
      $dec: {},
    },
    function (err, user) {
      console.log(err);
      if (err) {
        return res.status(204).json({
          error: "Some unknown error",
        });
      } else {
        res.status(200).json(user);
      }
    }
  );
});
router.post("/statusreject", (req, res) => {
  console.log("HELp");
  Application.update(
    { recruiter_email: req.body.email, title: req.body.title },
    {
      $set: {
        status: "Rejected",
      },
    },
    function (err, user) {
      console.log(err);
      if (err) {
        return res.status(204).json({
          error: "Some unknown error",
        });
      } else res.status(200).json(user);
    }
  );
});

router.post("/check", (req, res) => {
  // console.log(email);
  // Find user by email
  Application.findOne({
    recruiter_email: req.body.recruiter_email,
    applicant_email: req.body.applicant_email,
    title: req.body.title,
  }).then((user) => {
    // Check if user email exists
    if (!user) {
      Job.findOne({
        email: req.body.recruiter_email,
        title: req.body.title,
      }).then((user) => {
        // Check if user email exists
        if (!user) {
          const tmp = {
            error: "free",
          };
          // console.log(tmp);
          res.status(200).json(tmp);
        } else {
          const tmp = {
            error: "free",
          };
          if (user.applications == 0 || user.positions == 0) tmp.error = "full";
          // console.log(tmp);
          res.status(200).json(tmp);
        }
      });
    } else {
      const tmp = {
        error: "Applied",
      };
      // console.log(tmp);
      res.status(200).json(tmp);
    }
  });
});

router.post("/myapplications", function (req, res) {
  const email = req.body.email;
  Application.find({ applicant_email: email }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});
router.get("/joblist", function (req, res) {
  Job.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/accepted", function (req, res) {
  const email = req.body.email;

  Application.find(
    {
      recruiter_email: email,
      status: "Accepted",
    },
    function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    }
  );
});

router.post("/dash", function (req, res) {
  const email = req.body.email;
  const title = req.body.title;
  Application.find(
    {
      recruiter_email: email,
      title: title,
      status: { $ne: "Rejected" },
    },
    function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    }
  );
});

router.post("/dash2", function (req, res) {
  const email = req.body.email;
  // console.log("FSFA");
  // console.log(email);
  Applicant.findOne({ email: email }).then((user) => {
    // Check if user email exists
    if (!user) {
    } else {
      res.send(user);
      return user;
    }
  });
});

router.post("/active_jobs", function (req, res) {
  const email = req.body.email;
  Job.find(
    {
      email: email,
      positions: { $ne: 0 },
    },
    function (err, users) {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    }
  );
});

router.post("/new_job", (req, res) => {
  const title = req.body.title;
  const email = req.body.email;
  Job.findOne({ email: email, title: title }).then((user) => {
    // Check if user email exists
    if (!user) {
      const newUser = new Job({
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        applications: req.body.max_app,
        positions: req.body.max_pos,
        date_of_post: Date.now(),
        deadline: req.body.deadline,
        skills: req.body.skills,
        type: req.body.type,
        duration: req.body.duration,
        salary: req.body.salary,
        rating: { given: 0, total: 0 },
      });

      newUser
        .save()
        .then((user) => {
          // console.log(user);
          res.status(200).json(user);
        })
        .catch((err) => {
          console.log(err);

          // console.log(err);
          const tmp = {
            error: "Validation error(check input constraints) ",
          };
          // console.log(tmp);
          return res.status(400).json(tmp);
        });
    } else {
      // console.log("DSADASDAD");
      const tmp = {
        error: "Title is already in use.",
      };
      // console.log(tmp);
      return res.status(400).json(tmp);
    }
  });
});

router.post("/new_application", (req, res) => {
  Application.count(
    {
      applicant_email: req.body.applicant_email,
      status: { $ne: "Rejected" },
    },
    function (err, result) {
      if (err) {
      } else {
        if (result >= 10) {
          const tmp2 = {
            error: "Maximum limit of applications exceeded. ",
          };
          res.status(404).json(tmp2);
        } else {
          const newUser = new Application({
            title: req.body.title,
            name: req.body.name,
            salary: req.body.salary,
            recruiter_email: req.body.recruiter_email,
            applicant_email: req.body.applicant_email,
            sop: req.body.sop.sop,
            job_id: req.body.job_id,
            applicant_name: req.body.applicant_name,
            date_of_joining: "",
            date_of_application: Date.now(),
            type: req.body.type,
            status: "Applied",
          });
          // console.log("TEST");
          // console.log(req.body.applicant_email);
          newUser
            .save()
            .then((user) => {
              // console.log(user);
              // console.log(mongoose.Types.ObjectId(req.body.job_id));
              Job.update(
                { email: req.body.recruiter_email, title: req.body.title },
                { $inc: { applications: -1 } },
                function (err, users) {
                  console.log(err);
                  if (err) {
                    res.status(204).json({
                      error: "Some unknown error",
                    });
                  }
                }
              );
              return res.status(200).json(user);
            })
            .catch((err) => {
              console.log(err);

              // console.log(err);
              const tmp = {
                error: "Validation error(check input constraints) ",
              };
              // console.log(tmp);
              res.status(404).json(tmp);
            });
        }
      }
    }
  );

  // console.log(tmp);
});
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/register", (req, res) => {
  const email = req.body.email;
  Recruiter.findOne({ email }).then((user) => {
    // Check if user email exists
    if (!user) {
      Applicant.findOne({ email }).then((user) => {
        // Check if user email exists
        if (!user) {
          if (req.body.role == "Recruiter") {
            const newUser = new Recruiter({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              contact: req.body.contact,
              bio: req.body.bio,
            });

            newUser
              .save()
              .then((user) => {
                // console.log(user);
                res.status(200).json(user);
              })
              .catch((err) => {
                if (err.code == 11000) {
                  // console.log(err);
                  const tmp = {
                    error: "Email is already in use.",
                  };
                  // console.log(tmp);
                  res.status(400).json(tmp);
                }
                res.status(300).json(err);
              });
          } else {
            const newUser = new Applicant({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              education: req.body.education,
              skills: req.body.skills,
              rating: { given: 0, total: 0 },
            });

            newUser
              .save()
              .then((user) => {
                res.status(200).json(user);
              })
              .catch((err) => {
                // console.log(err);
                res.status(400).send(err);
              });
          }
        } else {
          return res.status(404).json({
            error: "Email already in use",
          });
        }
      });
    } else {
      // console.log("DSADASDAD");
      return res.status(404).json({
        error: "Email already in use",
      });
    }
  });
});

// POST request
// Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email);
  // Find user by email
  Recruiter.findOne({ email: email, password: password }).then((user) => {
    // Check if user email exists
    if (!user) {
      Applicant.findOne({ email: email, password: password }).then((user) => {
        // Check if user email exists
        if (!user) {
          return res.status(404).json({
            error: "Either email or password is incorrect",
          });
        } else {
          res.send(user);
          return user;
        }
      });
    } else {
      res.send(user);
      return user;
    }
  });
});

router.post("/profile", (req, res) => {
  const email = req.body.email;
  // Find user by email
  // console.log(email);
  Recruiter.findOne({ email: email }).then((user) => {
    // Check if user email exists
    if (!user) {
      Applicant.findOne({ email: email }).then((user) => {
        // Check if user email exists
        if (!user) {
          return res.status(204).json({
            error: "Either email or password is incorrect",
          });
        } else {
          res.send(user);
          return user;
        }
      });
    } else {
      res.send(user);
      return user;
    }
  });
});
router.post("/update", (req, res) => {
  const email = req.body.email;
  // Find user by email
  // console.log(email);
  // console.log("YES");
  if (req.body.role == "Recruiter") {
    Recruiter.update(
      { email: email },
      {
        $set: {
          name: req.body.name,
          contact: req.body.contact,
          bio: req.body.bio,
        },
      },
      function (err, user) {
        console.log(err);
        if (err) {
          return res.status(204).json({
            error: "Some unknown error",
          });
        } else res.status(200).json(user);
      }
    );
  } else {
    Applicant.update(
      { email: email },
      {
        $set: {
          name: req.body.name,
          skills: req.body.skills,
          education: req.body.education,
        },
      },
      function (err, user) {
        console.log(err);
        if (err) {
          return res.status(204).json({
            error: "Some unknown error",
          });
        } else res.status(200).json(user);
      }
    );
  }
});
module.exports = router;
