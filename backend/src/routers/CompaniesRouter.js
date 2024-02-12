const express = require("express");
const multer = require("multer");

const router = express.Router();

const companiesController = require("../controllers/CompaniesController");

const { verifyToken } = require("../middleware/auth");

// const verifyCompany = require("../middleware/verifyOwner");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.use(verifyToken);
// Create a new company
router.post(
  "/company",
  upload.single("CompanyLogo"),
  companiesController.createCompany
);

// Login
// router.post("/company/login", companiesController.login, verifyPassword);
// Authentication Wall - Everything after this requires an authenticated user
// router.use(verifyToken);

// Get all companies
router.get("/companies", companiesController.getCompanies);

// Get a specific event by ID
router.get("/company/:id", companiesController.getCompanyByID);

// Update an existing company
router.put("/company/:id", companiesController.updateCompany);

// Logout
// router.get("/logout", companiesController.logout, blacklistToken);

module.exports = router;
