const models = require("../models");

const login = async (req, res, next) => {
  const Email = req.body;
  await models.company
    .login(Email)
    .then(([result]) => {
      if (result.length === 0) {
        // User not found
        res.status(401).json({ message: "Email not found" });
      } else {
        const company = result[0];
        // Pass the entire user object to auth.js for password verification
        req.company = company;
        next(); // Proceed to password verification in the auth middleware
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getCompanies = (req, res) => {
  models.company
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getCompanyByID = (req, res) => {
  models.company
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

const createCompany = (req, res) => {
  const Company = req.body;

  // Ajoute le chemin de l'image de profil à l'objet company si une image est téléchargée
  if (req.file) {
    Company.CompanyLogo = req.file.filename; // Utilisez seulement le nom du fichier
  }

  models.company
    .insert(Company)
    .then(([result]) => {
      res.location(`/companies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error("Erreur lors de la création de l'entreprise :", err);
      res.sendStatus(500);
    });
};

const updateCompany = (req, res) => {
  const company = req.body;
  const companyID = req.Company_ID;

  company.id = parseInt(req.params.id, 10);

  models.company
    .update(company, companyID)
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

module.exports = {
  getCompanies,
  getCompanyByID,
  createCompany,
  updateCompany,
  login,
  logout,
};
