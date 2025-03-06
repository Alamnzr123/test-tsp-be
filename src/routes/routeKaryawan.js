const express = require('express');
const router = express.Router();
const ControllerKaryawan = require('../controllers/controllerKaryawan');
const jwt = require("../helper/jwt");
const Role = require("../helper/role");

router.get('/', ControllerKaryawan.getAll);
router.get('/filter', ControllerKaryawan.getAllFilterStatus);
router.post('/', ControllerKaryawan.create);
router.get('/:id', ControllerKaryawan.getOne);
router.put('/:id', ControllerKaryawan.update);
router.delete('/:id', ControllerKaryawan.delete);
router.post('/authenticate', ControllerKaryawan.authentication);

module.exports = router;
