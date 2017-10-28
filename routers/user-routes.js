const UserController = require('../controllers/user-controller.js'),
      userService = require('../services/service-loader.js').getUserService();

module.exports = function(router) {
    function isAuthenticated(req, res, next) {
       if (req.isAuthenticated()) {
         next();
       } else {
         res.sendStatus(401);
       }
    }
    
    let controller = new UserController(userService);

    router.get('/:username/profile', isAuthenticated, (req, res) => controller.loadProfilePage(req, res))
          .get('/order', isAuthenticated, (req, res) => controller.loadOrderPage(req, res))
          .get('/:username/settings', isAuthenticated, (req, res) => controller.loadSettingsPage(req, res))
          .post('/:username/update/email', isAuthenticated, (req, res) => controller.updateEmail(req, res))
          .post('/:username/update/profileImage', isAuthenticated, (req, res) => controller.updateProfileImage(req, res))
          .post('/:username/update/username', isAuthenticated, (req, res) => controller.updateUsername(req, res));
};