import AagApiKeys from "../models/AagApiKeys.js";

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

export { getAagApiHeader };
