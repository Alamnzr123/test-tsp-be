const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const config = require("../helper/config.json");

const { table_karyawan } = require('../models');

function jwtVerify(roles = [], status = []) {

  if (typeof roles === "string") {
    roles = [roles];
  }

  if (typeof status === "string") {
    status = [status];
  }

  const secret = config.secret;
  return [
    expressJwt({ secret, algorithms: ["HS256"] }),

    async (req, res, next) => {
      const user = await table_karyawan.findOne({ name: req.name });
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).send('Access Denied. No token provided.');
      }

      const verified = jwt.verify(token, secret);

      req.user = verified;
      req.user.role = verified.role;
      // req.user.status = verified.status;
      next();
    }
  ]
}

module.exports = jwtVerify;