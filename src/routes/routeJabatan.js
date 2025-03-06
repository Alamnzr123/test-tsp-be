const express = require('express');
const router = express.Router();
const ControllerJabatan = require('../controllers/controllerJabatan');

router.get('/', ControllerJabatan.getAll);
router.post('/', ControllerJabatan.create);
router.get('/:id', ControllerJabatan.findByPk);
router.get('/department/:id', ControllerJabatan.findByDepartment);
router.put('/:id', ControllerJabatan.update);
router.delete('/:id', ControllerJabatan.delete);

module.exports = router;