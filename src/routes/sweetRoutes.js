const express = require('express');
const router = express.Router();
const sweetController = require('../controllers/sweetController');
const upload = require('../utils/cloudinaryUpload');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, upload.single('image'), sweetController.createSweet);
router.get('/', authMiddleware, sweetController.getSweets);
router.get('/search', authMiddleware, sweetController.searchSweets);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), sweetController.updateSweet);
router.delete('/:id', authMiddleware, adminMiddleware, sweetController.deleteSweet);
router.post('/:id/purchase', authMiddleware, sweetController.purchaseSweet);
router.post('/:id/restock', authMiddleware, adminMiddleware, sweetController.restockSweet);

module.exports = router;
