const express = require('express');
const router = express.Router();
const ControllerDepartment = require('../controllers/controllerDepartment');

router.get('/', ControllerDepartment.getAll);
router.post('/', ControllerDepartment.create);
router.get('/:id', ControllerDepartment.getOne);
router.put('/:id', ControllerDepartment.update);
router.delete('/:id', ControllerDepartment.delete);

module.exports = router;