import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario o la contraseña son incorrectas.");
    return res.status(404).json({ msg: error.message });
  }
  //comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Debes confirmar y validar tu correo electrónico.");
    return res.status(403).json({ msg: error.message });
  }
  //Comprobar
  if (await usuario.comprobarPassword(password)) {
    const usuarioToken = {
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
    };
    res.json({
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuarioToken),
    });
  } else {
    const error = new Error("El usuario o la contraseña son incorrectas.");
    return res.status(404).json({ msg: error.message });
  }
};
const confirmar = async (req, res) => {
  console.log("routing dinamico", req.params);
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido.");
    return res.status(403).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.token = "";
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.status(200).json({ msg: "Usuario confirmado correctamente." });
  } catch (error) {
    console.log(error);
    const e = new Error("Token no válido.");
    return res.status(403).json({ msg: e.message, error: error });
  }
  console.log(usuarioConfirmar);
};
const olvidePassword = async (req, res) => {
  const { email } = req.body;
  //comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario o la contraseña son incorrectas.");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuario.token = generarId();
    await usuario.save();
    return res.status(201).json({
      msg: "Hemos enviado un email con las instrucciones",
    });
  } catch (error) {
    console.log(error);
  }
};
const comprobarToken = async (req, res) => {};

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken };
