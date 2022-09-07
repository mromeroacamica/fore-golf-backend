import Proyecto from "../models/Proyectos.js";
import Tarea from "../models/Tarea.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({
    $or: [
      { colaboradores: { $in: req.usuario } },
      { creador: { $in: req.usuario } },
    ],
  });
  res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;
  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      const error = new Error("Proyecto no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    const tareas = await Tarea.find().where("proyecto").equals(id);
    res.json({ proyecto, tareas });
  } catch (error) {
    console.log(error);
  }
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      const error = new Error("Proyecto no encontrado.");
      return res.status(404).json({ msg: error.message });
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Sin permisos de acceso.");
      return res.status(401).json({ msg: error.message });
    }
    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
      const proyectoAlmacenado = await proyecto.save();
      res.json(proyectoAlmacenado);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);
  if (!proyecto) {
    const error = new Error("Proyecto no encontrado.");
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Sin permisos de acceso.");
    return res.status(401).json({ msg: error.message });
  }
  try {
    await proyecto.deleteOne();
    res.status(200).json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
  }
};

const buscarColaborador = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("Usuario no encontrado.");
    return res.status(404).json({ msg: error.message });
  }
  res.json(usuario);
};

const agregarColaboradores = async (req, res) => {
  const { id } = req.params;
  const existeProyecto = await Proyecto.findById(id);
  if (!existeProyecto) {
    const error = new Error("Proyecto no encontrado.");
    return res.status(404).json({ msg: error.message });
  }
  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Sin permisos de acceso.");
    return res.status(401).json({ msg: error.message });
  }
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  //Revisar que no este agregado previamente
  if (existeProyecto.colaboradores.includes(usuario._id)) {
    const error = new Error("El usuario ya pertenece al proyecto.");
    return res.status(404).json({ msg: error.message });
  }

  existeProyecto.colaboradores.push(usuario._id);
  await existeProyecto.save();
  res.json({ msg: "Colaborador agregado correctamente" });
  res.json(existeProyecto);
};

const eliminarColaborador = async (req, res) => {
  const { id } = req.params;
  const existeProyecto = await Proyecto.findById(id);
  if (!existeProyecto) {
    const error = new Error("Proyecto no encontrado.");
    return res.status(404).json({ msg: error.message });
  }
  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Sin permisos de acceso.");
    return res.status(401).json({ msg: error.message });
  }

  existeProyecto.colaboradores.pull(req.body.id);
  await existeProyecto.save();
  res.json({ msg: "Colaborador Eliminado correctamente" });
  res.json(existeProyecto);
};

const obtenerTareas = async (req, res) => {
  const { id } = req.params;
  const existeProyecto = await Proyecto.findById(id);
  if (!existeProyecto) {
    const error = new Error("Proyecto no encontrado.");
    return res.status(404).json({ msg: error.message });
  }

  //las tareas las puede consultar el creador o los colaboradores

  const tareas = await Tarea.find().where("proyecto").equals(id);
  res.json(tareas);
};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaboradores,
  eliminarColaborador,
  obtenerTareas,
  buscarColaborador,
};
