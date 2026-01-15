const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/toolsController');

router.get('/', toolsController.getAllTools);
router.post('/', toolsController.createTool);
router.put('/:id', toolsController.updateTool);
router.delete('/:id', toolsController.deleteTool);

module.exports = router;
