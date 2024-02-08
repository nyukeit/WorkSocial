const express = require("express");
const multer = require("multer");

const router = express.Router();

const companiesController = require("../controllers/CompaniesController");

const {
  hashPass,
  verifyPassword,
  verifyToken,
} = require("../middleware/authCompany");

// const verifyOwner = require("../middleware/verifyOwner");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new company
router.post(
  "/companies",
  upload.single("CompanyLogo"),
  hashPass,
  companiesController.createCompany
);

// Login
router.post("/login/company", companiesController.login, verifyPassword);
// Authentication Wall - Everything after this requires an authenticated user
router.use(verifyToken);

// Get all companies
router.get("/companies", companiesController.getCompanies);

// Get a specific event by ID
router.get("/companies/:id", companiesController.getCompanyByID);

module.exports = router;
