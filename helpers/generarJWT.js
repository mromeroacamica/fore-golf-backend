import jwt from "jsonwebtoken";

const generarJWT = (usuario) => {
  return jwt.sign(usuario, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default generarJWT;
