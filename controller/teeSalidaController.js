import TeeSalida from "../models/TeeSalida.js";
import ConfigBooking from "../models/ConfigBooking.js";

const obtenerTeeSalidas = async (req, res) => {
  const teeSalidas = await TeeSalida.find()
    .where("club")
    .equals(req.usuario.club);
  res.json(teeSalidas);
};

const nuevoTeeSalida = async (req, res) => {
  const teeSalida = new TeeSalida(req.body);
  teeSalida.creador = req.usuario._id;
  try {
    const teeSalidaAlmacenado = await teeSalida.save();
    res.json(teeSalidaAlmacenado);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Tee de salida no se pudo agregar.");
    return res.status(404).json({ msg: error2.message });
  }
};

const editarTeeSalida = async (req, res) => {
  const { id } = req.params;
  try {
    const teeSalida = await TeeSalida.findById(id);
    if (!teeSalida) {
      const error = new Error("Tee de Salida no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (teeSalida.club.toString() !== req.usuario.club.toString()) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    teeSalida.label = req.body.label || teeSalida.label;
    teeSalida.horarios = req.body.horarios || teeSalida.horarios;

    try {
      const teeSalidaAlmacenado = await teeSalida.save();
      res.json(teeSalidaAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
const eliminarTeeSalida = async (req, res) => {
  const { id } = req.params;
  try {
    const teeSalida = await TeeSalida.findById(id);
    if (!teeSalida) {
      const error = new Error("Tee de Salida no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (teeSalida.club.toString() !== req.usuario.club.toString()) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    try {
      await teeSalida.deleteOne();
      res.status(200).json({ msg: "Tee salida eliminado" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    const error2 = new Error("Tee de Salida no encontrado.");
    return res.status(404).json({ msg: error2.message });
  }
};
const obtenerConfigBooking = async (req, res) => {
  const teeSalidas = await TeeSalida.find()
    .where("club")
    .equals(req.usuario.club);
  res.json(teeSalidas);
};

const nuevoConfigBooking = async (req, res) => {
  const { dayOfWeek, club, prioridadSocio, prioridadSocioHastaDia } = req.body;
  const configBooking = new ConfigBooking(req.body);
  const { usuario } = req;
  console.log(usuario);
  try {
    //Validar que no exista una config para ese dia ya creada en ese club && validar si todos los dias tienen una config
    const configBookingClub = await ConfigBooking.find({
      $and: [{ dayOfWeek: { $eq: dayOfWeek } }, { club: { $eq: club } }],
    });
    if (configBookingClub.length > 0 || !configBookingClub) {
      const error2 = new Error(
        `Ya tienes una Config de reserva para el día ${dayOfWeek}.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    //Validar que tengas permisos para crear esta config
    if (!usuario.clubUser || usuario.club !== club) {
      const error2 = new Error(`No tienes permisos para esta acción.`);
      return res.status(404).json({ msg: error2.message });
    }
    //Validar que el dia este entre 0 y 6
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      const error2 = new Error(
        `Error al agregar Config a un día que no existe.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    // Validar que no ponga prioridadSocioHastaDia si esta prioridad en false
    if (!prioridadSocio && prioridadSocioHastaDia) {
      const error2 = new Error(
        `Error al agregar Config con condiciones no compatibles.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    const configBookingAlmacenado = await configBooking.save();
    res.status(201).json(configBookingAlmacenado);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Config de reserva no se pudo agregar.");
    return res.status(404).json({ msg: error2.message });
  }
};

const editarConfigBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const teeSalida = await TeeSalida.findById(id);
    if (!teeSalida) {
      const error = new Error("Tee de Salida no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (teeSalida.club.toString() !== req.usuario.club.toString()) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    teeSalida.label = req.body.label || teeSalida.label;
    teeSalida.horarios = req.body.horarios || teeSalida.horarios;

    try {
      const teeSalidaAlmacenado = await teeSalida.save();
      res.json(teeSalidaAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
const eliminarConfigBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const teeSalida = await TeeSalida.findById(id);
    if (!teeSalida) {
      const error = new Error("Tee de Salida no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (teeSalida.club.toString() !== req.usuario.club.toString()) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    try {
      await teeSalida.deleteOne();
      res.status(200).json({ msg: "Tee salida eliminado" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    const error2 = new Error("Tee de Salida no encontrado.");
    return res.status(404).json({ msg: error2.message });
    console.log(error);
  }
};

export {
  eliminarTeeSalida,
  editarTeeSalida,
  nuevoTeeSalida,
  obtenerTeeSalidas,
  obtenerConfigBooking,
  nuevoConfigBooking,
  editarConfigBooking,
  eliminarConfigBooking,
};
