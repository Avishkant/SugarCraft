const express = require('express');
const router = express.Router();
const sweetController = require('../controllers/sweetController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, sweetController.createSweet);
router.get('/', authMiddleware, sweetController.getSweets);
router.get('/search', authMiddleware, sweetController.searchSweets);
router.put('/:id', authMiddleware, sweetController.updateSweet);
router.delete('/:id', authMiddleware, sweetController.deleteSweet);

module.exports = router;
