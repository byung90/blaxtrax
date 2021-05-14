const router = require("express").Router();
const { Project, User, TablePlayer, Table } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // // Get all projects and JOIN with user data
    // const projectData = await Project.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ["name"],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));
    // // Pass serialized data and session flag into template
    res.render("login", {
      // projects,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  console.log("Hello");
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    console.log(userData);
    const user = userData.get({ plain: true });
    console.log(user);
    const topFive = await User.findAll({
      limit: 5,
      order: [["balance", "DESC"]], //ASC
    });
    const balanceObj = topFive.map((obj) => obj.get({ plain: true }));
    console.log(balanceObj);

    const loser = await User.findAll({
      limit: 5,
      order: [["balance", "ASC"]], //ASC
    });
    const loserObj = loser.map((obj) => obj.get({ plain: true }));
    console.log(loserObj);

    res.render("profile", {
      ...user,
      balanceObj,
      loserObj,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//table game

// router.get("/profile", async (req, res) => {
//   console.log("Hello");
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ["password"] },
//     });
//     const topFive = await User.findAll({
//       limit: 5,
//       order: [["balance", "DESC"]], //ASC
//     });
//     const balanceObj = topFive.map((obj) => obj.get({ plain: true }));
//     console.log(balanceObj);
//     res.render("profile", {
//       balanceObj,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/tableGame", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    console.log(userData);
    const user = userData.get({ plain: true });

    res.render("tableGame", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/tableList", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    console.log(userData);
    const user = userData.get({ plain: true });

    //Findings table_ids and ordering numerically
    const tables = await TablePlayer.findAll(req.session.table_id, {
      limit: 8,
      order: [["table_id", "DESC"]],
    });
    const tableNumbers = tables.map((obj) => obj.get({ plain: true }));
    console.log(tableNumbers);

    const tablePl = await TablePlayer.findAll({
      attributes: { include: [
        "tablePlayer_id",
        "table_id",
        "user_id",
      ]}
    }); 
    const players = tablePl.map((obj) => obj.get({ plain: true })); 
    console.log(players); 

    res.render("tableList", {
      ...user,
      tableNumbers,
      players,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
