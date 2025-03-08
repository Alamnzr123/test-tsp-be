const { table_karyawan } = require('../models');
const { table_department } = require('../models');
const { table_jabatan } = require('../models');
const { table_operator } = require('../models');

const jwt = require("jsonwebtoken");
const Role = require("../helper/role.js");

const config = require("../helper/config.json");
const { where } = require('sequelize');


const ControllerKaryawan = {


    authentication: async function (req, res, next) {
        try {
            const user = await table_karyawan.findOne({ where: { name: req.body.name } });
            console.log(user.dataValues);

            if (user) {
                const token = jwt.sign({ sub: user.dataValues.id, role: user.dataValues.role }, config.secret, {
                    expiresIn: "7h"
                });
                res.json({ user, message: "User logged in", token })
            } else {
                res.status(400).json({ message: "password incorect" });
            }
        }
        catch (err) {
            next(err);
        }
    },

    getAllFilterStatus: async function (req, res, next) {
        try {
            const data = await table_karyawan.findAll({
                include: [
                    {

                        model: table_jabatan,
                        include: [
                            {
                                model: table_department
                            }
                        ]
                    }
                ],
                where: [
                    {
                        status: 'InProgress'
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

    getAll: async function (req, res, next) {
        try {

            const currentUser = req.user;
            console.log(currentUser);


            if (currentUser.role !== Role.User) {
                return res.status(401).json({ message: "Not Authorized!" });
            }

            const data = await table_karyawan.findAll({
                include: [
                    {

                        model: table_jabatan,
                        include: [
                            {
                                model: table_department
                            }
                        ]
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

    create: async function (req, res, next) {
        try {

            const user = await table_karyawan.findOne({ where: { name: req.body.name } });

            const { name, id_jabatan, age, gender, tanggal_lahir, alamat, role, work_order, nama_product, jumlah, tenggat_waktu, status } = req.body;

            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            try {
                if (role === "Operator") {
                    const dataOperator = await table_operator.create({
                        nama_operator: name,
                        nama_product,
                        jumlah,
                        role,
                        status
                    });

                    const data = await table_karyawan.create({
                        name,
                        id_jabatan,
                        age: +age,
                        gender,
                        tanggal_lahir,
                        role,
                        alamat,
                        work_order,
                        nama_product,
                        jumlah,
                        tenggat_waktu,
                        status
                    });

                    res.status(201).json({
                        DataKaryawan: data,
                        DataOperator: dataOperator
                    });
                } else {
                    const data = await table_karyawan.create({
                        name,
                        id_jabatan,
                        age: +age,
                        gender,
                        tanggal_lahir,
                        role,
                        alamat,
                        work_order,
                        nama_product,
                        jumlah,
                        tenggat_waktu,
                        status
                    });
                    res.status(201).json(data);
                }

            }
            catch (err) {
                console.log(err);
                return res.status(400).json({ message: err.message });
            }
        } catch (err) {
            next(err);
        }
    },

    getOne: async function (req, res, next) {
        try {
            const { id } = req.params;
            const data = await table_karyawan.findByPk(id, {
                include: [
                    {
                        model: table_jabatan,
                        include: [
                            {
                                model: table_department
                            }
                        ]
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
                name,
                id_jabatan,
                age,
                gender,
                tanggal_lahir,
                role,
                alamat,
                work_order,
                nama_product,
                jumlah,
                tenggat_waktu,
                status
            } = req.body;
            const data = await table_karyawan.update({
                name,
                id_jabatan,
                age: +age,
                gender,
                tanggal_lahir,
                alamat,
                role,
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
    },

    delete: async function (req, res, next) {
        try {
            const { id } = req.params;
            const data = await table_karyawan.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({ Data: data, message: 'Karyawan deleted' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ControllerKaryawan;