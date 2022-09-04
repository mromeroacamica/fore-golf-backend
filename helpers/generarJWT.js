import jwt from "jsonwebtoken";

const generarJWT = (usuario) => {
  return jwt.sign(usuario, process.env.JWT_SECRET, { expiresIn: "365d" });
};

export default generarJWT;
