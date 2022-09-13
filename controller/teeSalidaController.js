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
  const configBooking = new ConfigBooking(req.body);
  try {
    //Validar que no exista una config para ese dia ya creada en ese club && validar si todos los dias tienen una config

    //Validar que tengas permisos para crear esta config
    const configBookingAlmacenado = await configBooking.save();
    res.json(configBookingAlmacenado);
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
