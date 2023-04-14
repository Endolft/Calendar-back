const express = require("express");
const Event = require("../models/EventModel");

const getEvents = async (req, res = express.response) => {
  const events = await Event.find().populate("user", "name");

  return res.status(200).json({
    ok: true,
    msg: events,
  });
};

const createEvent = async (req, res = express.response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSaved = await event.save();
    res.json({
      ok: true,
      evento: eventSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const updateEvent = async (req, res = express.response) => {
  const eventId = req.params.id;
  const { uid } = req;

  try {
    const evento = await Event.findById(eventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio para editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const deleteEvent = async (req, res = express.response) => {
  const eventId = req.params.id;
  const { uid } = req;

  try {
    const evento = await Event.findById(eventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio para eliminar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventDeleted = await Event.findByIdAndRemove(eventId, newEvent, {
      new: true,
    });

    return res.json({
      ok: true,
      event: eventDeleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
};
