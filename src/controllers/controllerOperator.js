const { table_operator } = require('../models/index.js');
const { table_karyawan } = require('../models/index.js');

const jwt = require("jsonwebtoken");
const Role = require("../helper/role.js");

const bcrypt = require("bcryptjs");
const config = require("../helper/config.json");
const { where } = require('sequelize');


const ControllerOperator = {

    authentication: async function (req, res, next) {
        try {

            // const project = await table_karyawan.findOne({ where: { age: 11 } });
            // if (project === null) {
            //     console.log('Not found!');
            // } else {
            //     console.log(project instanceof table_karyawan); // true
            //     console.log(project.title); // 'My Title'
            // }

            const user = await table_operator.findOne({ where: { nama_operator: req.body.nama_operator } });
            console.log(user);
            if (user) {
                const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
                    expiresIn: "7h"
                });
                res.json({ user, message: "User logged in", token })
            } else {
                res.status(400).json({ message: "Nama Operator tidak ada." });
            }


            // if (user) {
            //     const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
            //         expiresIn: "7h"
            //     });

            //     res.json({ user, message: "User logged in", token })
            // } else {
            //     res.status(400).json({ message: "name incorect" });
            // }
        }
        catch (err) {
            next(err);
        }
    },

    getAll: async function (req, res, next) {
        try {

            // const currentUser = req.user;
            // console.log(currentUser);


            // if (currentUser.role !== Role.Admin) {
            //     return res.status(401).json({ message: "Not Authorized!" });
            // }

            const data = await table_operator.findAll({
                include: [
                    {
                        model: table_karyawan
                    }
                ],
                where: [
                    {
                        role: 'Operator'
                    }
                ],
                order: [
                    ['id', 'ASC']
                ]
            });
            res.status(200).json(data);
        } catch (err) {
            next(err)
        }
    },

    getOne: async function (req, res, next) {
        try {
            const { id } = req.params;
            const data = await table_operator.findByPk(id, {
                include: [
                    {
                        model: table_karyawan,
                    }
                ]
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    },

    update: async function (req, res, next) {
        try {
            console.log(req.body, '<<< req.body');
            const { id } = req.params;
            const {
                work_order,
                nama_product,
                jumlah,
                tenggat_waktu,
                status
            } = req.body;
            const data = await table_operator.update({
                work_order,
                nama_product,
                jumlah,
                tenggat_waktu,
                status
            }, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(data[1][0]);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ControllerOperator;