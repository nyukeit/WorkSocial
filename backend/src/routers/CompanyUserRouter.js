const express = require("express");
// const multer = require("multer");

const router = express.Router();
const companyUserControllers = require("../controllers/CompanyUserController");
const { verifyToken, verifyOwner } = require("../middleware/auth");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "assets/upload/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });
router.use(verifyToken);
// Ajouter un utilisateur à une entreprise
router.post("/company-users", companyUserControllers.addUserToCompany);

// Récupérer tous les utilisateurs dans une entreprise
router.get(
  "/company-users/:companyID",
  companyUserControllers.getUsersInCompany
);

// Mettre à jour le rôle d'un utilisateur dans une entreprise
router.put(
  "/company-users/:companyID/:UserID",
  companyUserControllers.updateUserRoleInCompany
);

// Supprimer un utilisateur d'une entreprise
router.delete(
  "/company-users/:companyID/:UserID",
  companyUserControllers.removeUserFromCompany
);

module.exports = router;
