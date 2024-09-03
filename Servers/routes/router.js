const router = require('express').Router();
const upload = require('../utils/multer');

const Usercontroller = require(`../controllers/Usercontrollers`)
const Gamecontroller = require(`../controllers/Gamecontrollers`)
const Charactercontroller = require(`../controllers/Charactercontrollers`)
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const errorHandler = require('../middleware/errorHandler');

router.post(`/login`, Usercontroller.login)
router.post('/google-login', Usercontroller.googleAuth)
router.post(`/register`, Usercontroller.register),

router.use(authentication)
router.get(`/games`,Gamecontroller.read)
router.post(`/games/add`, authorization, Gamecontroller.add)
router.delete(`/games/:id`, authorization, Gamecontroller.delete)

router.get(`/characters`, Charactercontroller.read)
router.get('/characters/:id',authorization, Charactercontroller.readById);
router.post('/characters/add', authorization, Charactercontroller.add);
router.put('/characters/:id', authorization, Charactercontroller.update);
router.patch('/characters/:id', upload.single('imgUrl'), Charactercontroller.updatePartial)
router.delete('/characters/:id',authorization, Charactercontroller.delete);
router.get(`/characters/generate`, Charactercontroller.generateCharacterName)
router.use(errorHandler)



module.exports = router