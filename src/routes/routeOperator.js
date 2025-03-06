const express = require('express');
const router = express.Router();
const ControllerOperator = require('../controllers/controllerOperator');
const jwt = require("../helper/jwt");
const Role = require("../helper/role");

router.get('/', ControllerOperator.getAll);
router.get('/:id', ControllerOperator.getOne);
router.put('/:id', ControllerOperator.update);
router.post('/authenticate', ControllerOperator.authentication);

module.exports = router;
