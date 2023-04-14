//Todas tienes que pasar por la validadcion del JWT
//obtener eventos

/* 
RUTAS DE USUARIOS (AUTH)
host+ /api/auth
*/

const { Router } = require("express");
const {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/events");
const { validationJWT } = require("../middlewares/validation-jwt");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const { fieldValidator } = require("../middlewares/fieldValidator");

const router = Router();
router.use(validationJWT); // sirve para validar en cada router.algo como middleware

router.get("/", getEvents);

//crear un nuevo evento

router.post(
  "/",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "la fecha de inicio es obligatia").custom(isDate),
    check("end", "la fecha de inicio es obligatia").custom(isDate),
    fieldValidator,
  ],
  createEvent
);

//actualizar evento

router.put("/:id", updateEvent);

//borrar evento

router.delete("/:id", deleteEvent);

module.exports = router;
