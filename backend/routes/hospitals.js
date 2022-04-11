var express = require('express');
var router = express.Router();
var hospital_controller = require('../controllers/hospitalController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/addHospital', hospital_controller.add_hospital_post);

router.get('/getEmail', hospital_controller.get_email);

router.get('/sendEmail', hospital_controller.send_email);

module.exports = router;