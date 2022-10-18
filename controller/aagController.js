import axios from "axios";
import AagApiKeys from "../models/AagApiKeys.js";

const getEnrolledsByMatricula = async (req, res) => {
  const { id } = req.params;
  try {
    const aagApiHeaders = await getAagApiHeader(req.usuario);
    const data = [id.toString()];
    const response = await axios.post(
      "http://aag-api-test.tecnocode.net/api/supplier/enrolleds",
      data,
      {
        headers: aagApiHeaders,
      },
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    const error2 = new Error("Error con algún dato ingresado.");
    return res.status(err.response.status).json({ msg: error2.message });
  }
};
const getAagApiHeader = async (usuario) => {
  const aagApiKey = await AagApiKeys.find().where("club").equals(usuario.club);
  const userKeyString = aagApiKey[0].user + ":" + aagApiKey[0].key;
  const buffer = Buffer.from(userKeyString);
  const header = buffer.toString("base64");
  const headers = {
    Authorization: "Basic " + header,
    "Content-Type": "application/json",
  };
  return headers;
};
const getClubFields = async (req, res) => {
  try {
    const aagApiHeaders = await getAagApiHeader(req.usuario);
    const response = await axios.get(
      "http://aag-api-test.tecnocode.net/api/supplier/fields",
      {
        headers: aagApiHeaders,
      },
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    const error2 = new Error("Error con algún dato ingresado.");
    return res.status(err.response.status).json({ msg: error2.message });
  }
};

export { getEnrolledsByMatricula, getClubFields };
