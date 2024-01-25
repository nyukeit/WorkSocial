// middleware/checkOwnership.js

const models = require("../models");

const verifyOwner = async (req, res, next) => {
  console.info("Début de verifyOwner");
  try {
    const id = parseInt(req.params.id, 10);
    console.info("ID extrait :", id);

    // Extract the resource type from the URL
    const primaryResource = req.url.split("/")[1];
    console.info("Resource primaire :", primaryResource);

    let resourceType = "";
    if (req.url.includes("comments")) {
      resourceType = "comments";
    } else if (req.url.includes("likes")) {
      resourceType = "likes";
    } else {
      resourceType = primaryResource;
    }
    console.info(resourceType);
    let model;
    switch (resourceType) {
      case "surveys":
        model = models.survey;
        break;
      case "events":
        model = models.event;
        break;
      case "posts":
        model = models.post;
        break;
      case "users":
        model = models.user;
        break;
      case "comments":
        switch (primaryResource) {
          case "events":
            model = models.eventComments;
            break;
          case "surveys":
            model = models.surveyComments;
            break;
          case "posts":
            model = models.postComments;
            break;
          default:
            res.status(400).send({ message: "Invalid resource type" });
        }
        break;
      // Add more cases for other resource types
      default:
        res.status(400).send({ message: "Invalid resource type" });
    }

    const [resource] = await model.findByPK(id);
    console.info("Ressource trouvée :", resource);

    // If the user is not the owner of the resource, return a 403 error
    if (resource[0].User_ID === req.User_ID) {
      console.info("Utilisateur est le propriétaire");

      next();
    } else {
      console.info("Utilisateur n'est pas le propriétaire");

      res.status(403).send(`You are not the owner of this ${resourceType}`);
    }
  } catch (err) {
    console.error("Erreur dans verifyOwner :", err);

    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = verifyOwner;
