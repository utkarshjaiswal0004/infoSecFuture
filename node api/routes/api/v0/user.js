var express = require('express');
var router = express.Router();
var {registerUserWithEmail, verifyEmailAccount, loginWithEmail} = require('../../../controllers/user');
var {authenticate, limiter} = require('../../../middleware/auth');

router.post('/registerUserWithEmail', limiter,  registerUserWithEmail);
router.get('/verifyEmailAccount/:token', limiter,  verifyEmailAccount);
router.post('/loginWithEmail', limiter,  loginWithEmail);

router.get('/verification-success', limiter, (req, res, next) => {
    res.render('verification-success');
});

router.get('/verification-error', limiter, (req, res, next) => {
    const errorMessage = req.query.error || '';
    res.render('verification-error', {error: errorMessage});
});

module.exports = router;
