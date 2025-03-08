const express = require('express');
const router = express.Router();
const ControllerOperator = require('../controllers/controllerOperator');
const jwt = require("../helper/jwt");
const Role = require("../helper/role");

router.get('/', jwt(Role.Operator), ControllerOperator.getAll);
router.get('/:id', jwt(Role.Operator), ControllerOperator.getOne);
router.put('/:id', jwt(Role.Operator), ControllerOperator.update);

module.exports = router;
