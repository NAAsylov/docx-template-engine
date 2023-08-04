const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const documentController = require('../controllers/document-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

/** Routers for docs */
router.post('/document/new', documentController.newDocument);
router.post('/document/download', documentController.downloadDocument);
router.get('/document/all', documentController.getAll)

module.exports = router;
