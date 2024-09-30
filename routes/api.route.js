const { Router } = require("express");
const router = Router();

// --------------> import Controllers
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const adminController = require("../controllers/admin.controller");


//----------------> All Routes
router.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: "API works!"
  })
})

// Login & Registration
router.post('/login', authController.login);
router.post('/register', authController.register);

// User
router.post('/users', userController.addUser);
router.get('/users', userController.listUser);

// Admin
router.get('/admin/profile', adminController.adminProfile)

// Handle unknown routes
router.use('**', (req, res) => {
  res.status(404).json({
    status: false,
    message: "page not found"
  })
})

module.exports = router;