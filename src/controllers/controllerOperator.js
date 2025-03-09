const { table_operator } = require('../models/index.js');
const { table_karyawan } = require('../models/index.js');

const jwt = require("jsonwebtoken");
const Role = require("../helper/role")

const config = require("../helper/config.json");
const { where } = require('sequelize');


const ControllerOperator = {

    getAll: async function (req, res, next) {
        try {
            const currentUser = req.user;

            if (currentUser.role !== Role.Operator) {
                return res.status(401).json({ message: "Not Authorized!" });
            }

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

            const currentUser = req.user;
            console.log(currentUser);


            if (currentUser.role !== Role.Operator) {
                return res.status(401).json({ message: "Not Authorized!" });
            }

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
            const currentUser = req.user;
            console.log(currentUser);


            if (currentUser.role !== Role.Operator) {
                return res.status(401).json({ message: "Not Authorized!" });
            }

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