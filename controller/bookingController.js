import Club from "../models/Club.js";
import Day from "../models/Day.js";
import Usuario from "../models/Usuario.js";
import Horario from "../models/Horario.js";
import Booking from "../models/Booking.js";

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
  const { users } = req.body;
  const bookingToSave = new Booking();
  try {
    const horarioBooking = await Horario.findById(id).populate("day");
    console.log(horarioBooking);
    if (horarioBooking.cuposDisponibles < users.length) {
      const error2 = new Error(
        "No hay cupos disponibles para esta cantidad de jugadores.",
      );
      return res.status(404).json({ msg: error2.message });
    }
    if (!horarioBooking.day.clubOpen) {
      const error2 = new Error("Club cerrado este día.");
      return res.status(404).json({ msg: error2.message });
    }
    if (!horarioBooking) {
      const error2 = new Error("Horario no encontrados.");
      return res.status(404).json({ msg: error2.message });
    }
    let playersArray = [];
    for (let user of req.body.users) {
      const duplicatePlayer = playersArray.find(
        (x) => x._id.toString() === user,
      );
      if (duplicatePlayer) {
        const error2 = new Error(
          `Usuario ${duplicatePlayer.nombre} ${duplicatePlayer.apellido} se encuentra duplicado.`,
        );
        return res.status(404).json({ msg: error2.message });
      }
      const player = await Usuario.findById(user);

      if (!player.confirmado) {
        const error2 = new Error(
          `Usuario ${player.nombre} ${player.apellido} no tiene su correo confirmado.`,
        );
        return res.status(404).json({ msg: error2.message });
      }
      if (player.clubUser) {
        const error2 = new Error(
          `Usuario ${player.nombre} ${player.apellido} no tiene acceso a esta función.`,
        );
        return res.status(404).json({ msg: error2.message });
      }
      if (player) playersArray.push(player._id);
    }
    //Validacion que no se encuentra ya anotado en una linea del dia
    if (horarioBooking.day.jugadores) {
      for (let user of req.body.users) {
        const duplicatePlayeronDay = horarioBooking.day.jugadores.find(
          (x) => x.toString() === user,
        );
        if (duplicatePlayeronDay) {
          const duplicatePlayerFound = await Usuario.findById(
            duplicatePlayeronDay,
          );
          const error2 = new Error(
            `Usuario ${duplicatePlayerFound.nombre} ${duplicatePlayerFound.apellido} ya se encuentra en un horario de este día.`,
          );
          return res.status(404).json({ msg: error2.message });
        }
      }
    }
    const playersOfTheDay = [];
    playersOfTheDay.push(...horarioBooking.day.jugadores);
    playersOfTheDay.push(...playersArray);
    bookingToSave.club = horarioBooking.club;
    bookingToSave.horario = horarioBooking._id;
    bookingToSave.creador = req.usuario._id;
    bookingToSave.jugadores = playersArray;
    try {
      const nuevosCuposDisponibles =
        horarioBooking.cuposDisponibles - playersArray.length;
      const bookingAlmacenado = await bookingToSave.save();
      await Horario.updateOne(
        { _id: id },
        {
          $set: {
            cuposDisponibles: nuevosCuposDisponibles,
            booking: bookingAlmacenado._id,
          },
        },
      );
      await Day.updateOne(
        { _id: horarioBooking.day._id },
        {
          $set: {
            jugadores: playersOfTheDay,
          },
        },
      );
      res.json(bookingAlmacenado);
    } catch (error) {
      console.log(error);
      const error2 = new Error("Error al guardar la reserva.");
      return res.status(404).json({ msg: error2.message });
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
