import Usuario from "../models/Usuario.js";
import Club from "../models/Club.js";

const obtenerClubs = async (req, res) => {
  const clubs = await Club.find().where("creador").equals(req.usuario);
  res.json(clubs);
};

const nuevoClub = async (req, res) => {
  const club = new Club(req.body);
  try {
    const clubAlmacenado = await club.save();
    res.json(clubAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerClubById = async (req, res) => {
  const { id } = req.params;
  try {
    const club = await Club.findById(id);
    if (!club) {
      const error = new Error("Club no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    res.json(club);
  } catch (error) {
    console.log(error);
  }
};

const editarClub = async (req, res) => {
  const { id } = req.params;
  try {
    const club = await Club.findById(id);
    if (!club) {
      const error = new Error("Club no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    club.nombre = req.body.nombre || club.nombre;
    club.email = req.body.email || club.email;

    try {
      const proyectoAlmacenado = await club.save();
      res.json(proyectoAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
const eliminarClub = async (req, res) => {
  const { id } = req.params;
  const club = await Club.findById(id);
  if (!club) {
    const error = new Error("Club no encontrado.");
    return res.status(404).json({ msg: error.message });
  }
  //   if (club.creador.toString() !== req.usuario._id.toString()) {
  //     const error = new Error("Sin permisos de acceso.");
  //     return res.status(401).json({ msg: error.message });
  //   }
  try {
    await club.deleteOne();
    res.status(200).json({ msg: "Club eliminado" });
  } catch (error) {
    console.log(error);
  }
};

// const buscarColaborador = async (req, res) => {
//   const { email } = req.body;
//   const usuario = await Usuario.findOne({ email });
//   if (!usuario) {
//     const error = new Error("Usuario no encontrado.");
//     return res.status(404).json({ msg: error.message });
//   }
//   res.json(usuario);
// };

// const agregarColaboradores = async (req, res) => {
//   const { id } = req.params;
//   const existeProyecto = await Proyecto.findById(id);
//   if (!existeProyecto) {
//     const error = new Error("Proyecto no encontrado.");
//     return res.status(404).json({ msg: error.message });
//   }
//   if (proyecto.creador.toString() !== req.usuario._id.toString()) {
//     const error = new Error("Sin permisos de acceso.");
//     return res.status(401).json({ msg: error.message });
//   }
//   res.json(existeProyecto);
// };

// const eliminarColaborador = async (req, res) => {};
// const obtenerTareas = async (req, res) => {
//   const { id } = req.params;
//   const existeProyecto = await Proyecto.findById(id);
//   if (!existeProyecto) {
//     const error = new Error("Proyecto no encontrado.");
//     return res.status(404).json({ msg: error.message });
//   }

//   //las tareas las puede consultar el creador o los colaboradores

//   const tareas = await Tarea.find().where("proyecto").equals(id);
//   res.json(tareas);
// };

export { obtenerClubs, nuevoClub, obtenerClubById, editarClub, eliminarClub };
