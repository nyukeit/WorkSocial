const express = require("express");
const multer = require("multer");

const router = express.Router();

const companiesController = require("../controllers/CompaniesController");

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
  "/company",
  upload.single("CompanyLogo"),
  companiesController.createCompany
);

// Get all companies
router.get("/companies", companiesController.getCompanies);

// Get a specific event by ID
router.get("/company/:id", companiesController.getCompanyByID);

// Update an existing company
router.put("/company/:id", companiesController.updateCompany);

module.exports = router;
