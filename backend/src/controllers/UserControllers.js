const models = require("../models");

const login = async (req, res, next) => {
  const Email = req.body;
  await models.user
    .login(Email)
    .then(([result]) => {
      if (result.length === 0) {
        // User not found
        res.status(401).json({ emailNotFound: true });
      } else {
        const user = result[0];
        // Pass the entire user object to auth.js for password verification
        req.user = user;
        next(); // Proceed to password verification in the auth middleware
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsers = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByID = (req, res) => {
  models.user
    .findByPK(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUser = (req, res) => {
  const user = req.body;
  const userID = req.User_ID;
  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user, userID)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updatePassword = async (req, res) => {
  const user = req.body;
  const userID = req.User_ID;
  user.id = parseInt(req.params.id, 10);

  try {
    const result = await models.user.updatePassword(user, userID);

    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createUser = (req, res) => {
  const user = req.body;

  // Ajouter le chemin de l'image de profil à l'objet user si une image est téléchargée
  if (req.file) {
    user.ProfileImage = req.file.filename; // Utilisez seulement le nom du fichier
  }

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUser = async (req, res, next) => {
  const emailInput = req.body.Email;

  const [user] = await models.user.findByPK(req.params.id);
  const userEmail = user[0].Email;

  if (emailInput === userEmail) {
    next();
  } else {
    res.sendStatus(403);
  }

  models.user
    .delete(emailInput)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.replace(/^Bearer\s+/, "");
    models.tokenBlacklist.insert(token).then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Error logging out" });
  }
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const email = req.body;
  models.user
    .findUserByEmail(email.Email)
    .then(([users]) => {
      if (users[0] != null) {
        const [firstUser] = users;
        req.user = firstUser;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const verifyUsernameAvailability = async (req, res) => {
  const { username } = req.query;
  try {
    const isAvailable = await models.user.checkUsernameAvailability(username);
    res.json({ isAvailable });
  } catch (error) {
    console.error(
      "Erreur lors de la vérification du nom d'utilisateur:",
      error
    );
    res.status(500).send("Erreur interne du serveur");
  }
};

const verifyEmailAvailability = async (req, res) => {
  const { email } = req.query;
  try {
    const isAvailable = await models.user.checkEmailAvailability(email);
    res.json({ isAvailable });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    res.status(500).send("Erreur interne du serveur");
  }
};
const verifyPhoneAvailability = async (req, res) => {
  const { phone } = req.query;
  try {
    const isAvailable = await models.user.checkPhoneAvailability(phone);
    res.json({ isAvailable });
  } catch (error) {
    console.error("Erreur lors de la vérification du téléphone:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
module.exports = {
  getUsers,
  getUserByID,
  updateUser,
  createUser,
  deleteUser,
  login,
  logout,
  getUserByEmailWithPasswordAndPassToNext,
  updatePassword,
  verifyUsernameAvailability,
  verifyEmailAvailability,
  verifyPhoneAvailability,
};
