/* 
RUTAS DE USUARIOS (AUTH)
host+ /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, revToken } = require("../controllers/auth");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { validationJWT } = require("../middlewares/validation-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El email es obligatorio").isEmail(),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", [validationJWT], revToken);

module.exports = router;
