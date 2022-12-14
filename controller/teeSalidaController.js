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
    teeSalida.handicapNecesario = req.body.horarios || teeSalida.horarios;

    try {
      const teeSalidaAlmacenado = await teeSalida.save();
      res.json(teeSalidaAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    const error2 = new Error("Tee de salida no se pudo editar.");
    return res.status(404).json({ msg: error2.message });
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
  try {
    const teeSalidas = await ConfigBooking.find()
      .where("club")
      .equals(req.usuario.club);
    res.json(teeSalidas);
  } catch (error) {
    console.log(error);
    const error2 = new Error(
      "No se pudo encontrar Config Booking para este club.",
    );
    return res.status(404).json({ msg: error2.message });
  }
};

const nuevoConfigBooking = async (req, res) => {
  const { dayOfWeek, club, prioridadSocio, prioridadSocioHastaDia } = req.body;
  const configBooking = new ConfigBooking(req.body);
  const { usuario } = req;
  try {
    //Validar que no exista una config para ese dia ya creada en ese club && validar si todos los dias tienen una config
    const configBookingClub = await ConfigBooking.find({
      $and: [{ dayOfWeek: { $eq: dayOfWeek } }, { club: { $eq: club } }],
    });
    if (configBookingClub.length > 0 || !configBookingClub) {
      const error2 = new Error(
        `Ya tienes una Config de reserva para el d??a ${dayOfWeek}.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    //Validar que tengas permisos para crear esta config
    if (!usuario.clubUser || usuario.club !== club) {
      const error2 = new Error(`No tienes permisos para esta acci??n.`);
      return res.status(404).json({ msg: error2.message });
    }
    //Validar que el dia este entre 0 y 6
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      const error2 = new Error(
        `Error al agregar Config a un d??a que no existe.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    // Validar que no ponga prioridadSocioHastaDia si esta prioridad en false
    if (
      (!prioridadSocio && prioridadSocioHastaDia) ||
      (prioridadSocio && prioridadSocioHastaDia === undefined)
    ) {
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
  const { dayOfWeek, prioridadSocio, prioridadSocioHastaDia } = req.body;

  try {
    const configBooking = await ConfigBooking.findById(id);
    if (!configBooking) {
      const error = new Error("Config Booking no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    //Validar que el dia este entre 0 y 6
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      const error2 = new Error(
        `Error al agregar Config a un d??a que no existe.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    //Validar que no exista una config para ese dia ya creada en ese club && validar si todos los dias tienen una config
    const configBookingClub = await ConfigBooking.find({
      $and: [
        { dayOfWeek: { $eq: dayOfWeek } },
        { club: { $eq: configBooking.club } },
        { _id: { $ne: configBooking._id } },
      ],
    });

    if (configBookingClub.length > 0 || !configBookingClub) {
      const error2 = new Error(
        `Ya tienes una Config de reserva para el d??a ${dayOfWeek}.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    if (
      configBooking.club.toString() !== req.usuario.club.toString() ||
      !req.usuario.clubUser
    ) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    // Validar que no ponga prioridadSocioHastaDia si esta prioridad en false
    if (!prioridadSocio && prioridadSocioHastaDia) {
      const error2 = new Error(
        `Error al agregar Config con condiciones no compatibles.`,
      );
      return res.status(404).json({ msg: error2.message });
    }
    configBooking.dayOfWeek = req.body.dayOfWeek;
    configBooking.prioridadSocio = req.body.prioridadSocio;
    configBooking.prioridadSocioHastaDia =
      req.body.prioridadSocioHastaDia || configBooking.prioridadSocioHastaDia;
    configBooking.handicapNecesario = req.body.handicapNecesario;
    try {
      const configBookingAlmacenado = await configBooking.save();
      res.json(configBookingAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    const error2 = new Error("Error al obtener algun dato.");
    return res.status(404).json({ msg: error2.message });
  }
};
const eliminarConfigBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const configBooking = await ConfigBooking.findById(id);
    if (!configBooking) {
      const error = new Error("Config Booking no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (configBooking.club.toString() !== req.usuario.club.toString()) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    try {
      await configBooking.deleteOne();
      res.status(200).json({ msg: "Config Booking eliminado." });
    } catch (error) {
      console.log(error);
      const error2 = new Error("No se pudo eliminar la Config Booking.");
      return res.status(404).json({ msg: error2.message });
    }
  } catch (error) {
    console.log(error);
    const error2 = new Error("Config Booking no encontrado.");
    return res.status(404).json({ msg: error2.message });
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
