import Club from "../models/Club.js";
import Day from "../models/Day.js";

const obtenerDays = async (req, res) => {
  try {
    const days = await Day.find().where("club").equals(req.usuario.club);
    res.json(days);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Días no encontrados.");
    return res.status(404).json({ msg: error2.message });
  }
};

const nuevoDia = async (req, res) => {
  const dayToSave = new Day(req.body);
  try {
    const usuarioClub = await Club.findById(req.usuario.club);
    if (!usuarioClub) {
      const error2 = new Error("Club no encontrados.");
      return res.status(404).json({ msg: error2.message });
    }
    dayToSave.club = usuarioClub._id;
    try {
      const { day, month, year } = req.body;
      //Tener en considracion que se comienza desde el mes 0
      const newDate = new Date(year, month, day);
      //Tener en consideracion que el dia domingo es el dia 0
      const dayOfWeek = newDate.getDay();
      dayToSave.date = newDate;
      dayToSave.dayOfWeek = dayOfWeek;
      const clubAlmacenado = await dayToSave.save();
      res.json(clubAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    const error2 = new Error("Club no encontrados.");
    return res.status(404).json({ msg: error2.message });
  }
};

const obtenerDaysByClubId = async (req, res) => {
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

const editarDay = async (req, res) => {
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
const eliminarDay = async (req, res) => {
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

export { eliminarDay, editarDay, obtenerDaysByClubId, nuevoDia, obtenerDays };
