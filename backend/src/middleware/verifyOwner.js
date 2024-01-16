// middleware/checkOwnership.js

const models = require("../models");

const verifyOwner = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const resourceType = req.url.split("/")[1];
    console.info(resourceType);
    let model;
    switch (resourceType) {
      case "surveys":
        model = models.survey;
        break;
      case "events":
        model = models.EventManager;
        break;
      case "posts":
        model = models.PostManager;
        break;
      case "user":
        model = models.UserManager;
        break;
      // Add more cases for other resource types
      default:
        res.status(400).send({ message: "Invalid resource type" });
    }

    const [resource] = await model.findByPK(id);
    console.info(resource[0].User_ID, req.User_ID);
    // If the user is not the owner of the comment, return a 403 error
    if (resource[0].User_ID === req.User_ID) {
      next();
    } else {
      res.status(403).send(`You are not the owner of this ${resourceType}`);
    }
    // ... rest of the middleware logic
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = verifyOwner;