import AagApiKeys from "../models/AagApiKeys.js";
import Club from "../models/Club.js";

const obtenerAagApiKeyByClub = async (req, res) => {
  try {
    console.log(req.usuario);
    const aagApiKey = await AagApiKeys.find()
      .where("club")
      .equals(req.usuario.club);
    res.json(aagApiKey);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Api key no encontrados. ");
    return res.status(404).json({ msg: error2.message });
  }
};

const nuevoAagApiKey = async (req, res) => {
  const aagApiKey = new AagApiKeys(req.body);
  aagApiKey.creador = req.usuario._id;
  const { key, user, club } = req.body;
  if (!req.usuario.clubUser) {
    const error2 = new Error("No tienes permisos para esta acción.");
    return res.status(404).json({ msg: error2.message });
  }
  if (!key || !user || !club) {
    const error2 = new Error("No se han enviado todos los datos necesarios.");
    return res.status(404).json({ msg: error2.message });
  }
  try {
    const clubUser = await Club.findById(club);
    aagApiKey.club = clubUser._id;
    const aagApiKeyAlmacenado = await aagApiKey.save();
    res.json(aagApiKeyAlmacenado);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Api Key no se pudo agregar.");
    return res.status(404).json({ msg: error2.message });
  }
};

const editarAagApiKey = async (req, res) => {
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
const eliminarAagApiKey = async (req, res) => {
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

export {
  obtenerAagApiKeyByClub,
  nuevoAagApiKey,
  editarAagApiKey,
  eliminarAagApiKey,
};
