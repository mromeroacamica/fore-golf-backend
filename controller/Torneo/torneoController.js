import TorneoDay from "../../models/Torneo/TorneoDay.js";

const obtenerTorneoDays = async (req, res) => {
  try {
    const torneosDays = await TorneoDay.find()
      .where("club")
      .equals(req.usuario.club)
      .limit(10);
    res.json(torneosDays);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Api key no encontrados. ");
    return res.status(404).json({ msg: error2.message });
  }
};
const crearTorneoDay = async (req, res) => {
  try {
    const torneosDay = new TorneoDay(req.body);
    const torneosDayAlmacenado = await torneosDay.save();
    res.status(201).json(torneosDayAlmacenado);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Api key no encontrados. ");
    return res.status(404).json({ msg: error2.message });
  }
};

export { obtenerTorneoDays, crearTorneoDay };
