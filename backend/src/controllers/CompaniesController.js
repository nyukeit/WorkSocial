const models = require("../models");

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
    .find(req.params.id)
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

  if (req.file) {
    Company.Logo = req.file.filename; // Utilisez seulement le nom du fichier
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

// const updateCompany = (req, res) => {
//   const company = req.body;
//   const companyID = req.Company_ID;

//   company.id = parseInt(req.params.id, 10);

//   models.company
//     .update(company, companyID)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

module.exports = {
  getCompanies,
  getCompanyByID,
  createCompany,
  // updateCompany,
};
