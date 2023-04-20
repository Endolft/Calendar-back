const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo",
      });
    }
    user = new User(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generar token JWT
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con el administrador",
    });
  }
};

const loginUser = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o contraseña no son correctos",
      });
    }

    //confirmar los password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }
    //generar el token  JWT

    const token = await generarJWT(user._id, user.name);

    res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con el administrador",
    });
  }
};

const revToken = async (req, res = express.response) => {
  const { uid, name } = req;

  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { createUser, loginUser, revToken };
