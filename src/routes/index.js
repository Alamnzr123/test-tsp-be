const express = require('express');
const router = express.Router();
const routeDepartment = require('./routeDepartment');
const routeJabatan = require('./routeJabatan');
const routeKaryawan = require('./routeKaryawan');
const routeOperator = require('./routeOperator');

router.use('/department', routeDepartment);
router.use('/jabatan', routeJabatan);
router.use('/karyawan', routeKaryawan);
router.use('/operator', routeOperator);

module.exports = router;