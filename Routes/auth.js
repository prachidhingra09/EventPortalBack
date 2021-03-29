const express = require('express')
const { signup,signin,signout} = require('../Controllers/auth')
const { userById } = require('../Controllers/user')

const router = express.Router();
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.param("userId", userById);
module.exports = router;