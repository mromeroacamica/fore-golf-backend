import Club from "../models/Club.js";
import Day from "../models/Day.js";
import Usuario from "../models/Usuario.js";
import Horario from "../models/Horario.js";

const getBookings = async (req, res) => {
  try {
    const days = await Day.find().where("club").equals(req.usuario.club);
    res.json(days);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Días no encontrados.");
    return res.status(404).json({ msg: error2.message });
  }
};

const newBooking = async (req, res) => {
  //obtengo el id del horario donde voy a agregar la reserva
  const { id } = req.params;
  const bookingToSave = new Day();
  try {
    const usuarioClub = await Club.findById(req.usuario.club);
    const horarioBooking = await Horario.findById(id);
    if (!usuarioClub) {
      const error2 = new Error("Club no encontrados.");
      return res.status(404).json({ msg: error2.message });
    }
    if (!horarioBooking) {
      const error2 = new Error("Horario no encontrados.");
      return res.status(404).json({ msg: error2.message });
    }
    let playersArray = [];
    for (let user of req.body.users) {
      const player = await Usuario.findById(user);
      if (player) playersArray.push(player);
    }
    bookingToSave.club = usuarioClub._id;
    bookingToSave.horario = horarioBooking._id;
    bookingToSave.creador = req.usuario._id;
    bookingToSave.jugadores = playersArray;

    try {
      const bookingAlmacenado = await bookingToSave.save();
      res.json(bookingAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    const error2 = new Error("Error con algún dato ingresado.");
    return res.status(404).json({ msg: error2.message });
  }
};

const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const days = await Day.find().where("club").equals(id);
    res.json(days);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Días no encontrados.");
    return res.status(404).json({ msg: error2.message });
  }
};

const editBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const dayToEdit = await Day.findById(id);
    const { usuario } = req;
    if (!dayToEdit) {
      const error = new Error("Día no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (
      dayToEdit.club._id.toString() !== usuario.club.toString() &&
      !usuario.clubUser
    ) {
      const error = new Error("No tienes acceso a esta acción.");
      return res.status(403).json({ msg: error.message });
    }
    const { day, month, year } = req.body;
    //Tener en considracion que se comienza desde el mes 0
    const newDate = new Date(year, month, day);
    //Tener en consideracion que el dia domingo es el dia 0
    const dayOfWeek = newDate.getDay();
    dayToEdit.date = newDate;
    dayToEdit.dayOfWeek = dayOfWeek;
    dayToEdit.day = req.body.day || dayToEdit.day;
    dayToEdit.month = req.body.month || dayToEdit.month;
    dayToEdit.year = req.body.year || dayToEdit.year;

    try {
      const dayAlmacenado = await dayToEdit.save();
      res.json(dayAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  const day = await Day.findById(id);
  if (!day) {
    const error = new Error("Día no encontrado.");
    return res.status(404).json({ msg: error.message });
  }
  if (
    day.club._id.toString() !== usuario.club.toString() &&
    !usuario.clubUser
  ) {
    const error = new Error("No tienes acceso a esta acción.");
    return res.status(403).json({ msg: error.message });
  }
  try {
    await day.deleteOne();
    res.status(200).json({ msg: "Día eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export { deleteBooking, editBooking, getBookingById, newBooking, getBookings };
