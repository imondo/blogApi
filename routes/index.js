const Router = require('koa-router');
const loginCtrl = require('./../controller/login');
const acticleCtrl = require('./../controller/article');
const aboutCtrl = require('./../controller/aboutBlog');
const checkToken = require('./../middlreware/checkToken');
const router = new Router({
  prefix: '/api'
});

router.post('/login', loginCtrl.login);
// router.post('/register', loginCtrl.register);

router.get('/classes/article', acticleCtrl.getArticle);
router.get('/classes/article/:id', acticleCtrl.getDetails);
router.get('/classes/classify', acticleCtrl.getClassify);
router.post('/classes/article', checkToken, acticleCtrl.addArticle);
router.put('/classes/article', checkToken, acticleCtrl.updateArticle);
router.delete('/classes/article/:id', checkToken, acticleCtrl.deleteArticle);

router.get('/classes/about', aboutCtrl.getAbout);
router.post('/classes/about', checkToken, aboutCtrl.addAbout);
router.put('/classes/about', checkToken, aboutCtrl.updateAbout);

module.exports = router;