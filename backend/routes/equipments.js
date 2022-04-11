var express = require('express');
var router = express.Router();
var equipment_controller = require('../controllers/equipmentController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/addEquipment', equipment_controller.add_equipment_post);

router.get('/getType', equipment_controller.get_type);

module.exports = router;