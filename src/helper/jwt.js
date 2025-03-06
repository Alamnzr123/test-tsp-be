const expressJwt = require("express-jwt");
const config = require("../helper/config.json");

const { table_karyawan } = require('../models');

function jwt(roles = [], status = []) {

  if (typeof roles === "string") {
    roles = [roles];
    console.log(roles);
  }

  if (typeof status === "string") {
    status = [status];
    console.log(status);
  }

  const secret = config.secret;
  return [
    expressJwt({ secret, algorithms: ["HS256"] }),

    async (req, res, next) => {
      const user = await table_karyawan.findOne({ name: req.name });

      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(401).json({ message: "Only admin is Authorized !" });
      }

      req.user.status = user.status;
      req.user.role = user.role;
      next();
    }
  ]
}

module.exports = jwt;