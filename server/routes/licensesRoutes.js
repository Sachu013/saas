const express = require('express');
const router = express.Router();
const licensesController = require('../controllers/licensesController');

router.get('/', licensesController.getAllLicenses);
router.post('/assign', licensesController.assignLicense);
router.delete('/:id', licensesController.revokeLicense);

module.exports = router;
