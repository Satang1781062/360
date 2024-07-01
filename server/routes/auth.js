const express = require("express");
const router = express.Router();

//Controller
const {register,login,listUser,editUser,deleteUser,currentUser,googleLogin} = require ('../controllers/auth')


// middleware
const { auth,adminCheck } = require('../middleware/auth')


//@Endpoint http://localhost:3000/api/register
//@Method POST
//@Access Publish
router.post('/register',register)

//@Endpoint http://localhost:3000/api/login
//@Method POST
//@Access Publish
router.post('/login',login)

//@Endpoint http://localhost:3000/api/current-user
//@Method POST
//@Access Private
router.post('/current-user', auth, currentUser)

//@Endpoint http://localhost:3000/api/current-admin
//@Method POST
//@Access Private
router.post('/current-admin', auth, adminCheck, currentUser)


//@Endpoint http://localhost:5500/api/auth
//@Method GET
//@Access Private
router.get('/auth',listUser)





//@Empoint http://localhost:3000/api/auth
//@Method GET
//@Access Publish
router.put('/auth',editUser)

//@Empoint http://localhost:3000/api/auth
//@Method GET
//@Access Publish
router.delete('/auth',deleteUser)

router.post('/google-login', googleLogin);

module.exports = router;