import TorneoDay from "../../models/Torneo/TorneoDay.js";
import Club from "../../models/Club.js";

const obtenerTorneoDays = async (req, res) => {
  try {
    const { date } = req.query;
    let inferiorDate = null;
    let superiorDate = null;
    if (date) {
      inferiorDate = new Date(date);
      superiorDate = new Date(date);
      superiorDate.setDate(inferiorDate.getDate() + 1);
    }
    const torneosDays = await TorneoDay.find(
      date
        ? {
            date: {
              $gte: inferiorDate,
              $lt: superiorDate,
            },
          }
        : null,
    )
      .where("club")
      .equals(req.usuario.club)
      .sort({ _id: -1 })
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
    const userClub = await Club.findById(req.usuario.club);
    torneosDay.club = userClub;
    torneosDay.date = new Date();
    const torneosDayAlmacenado = await torneosDay.save();
    res.status(201).json(torneosDayAlmacenado);
  } catch (error) {
    console.log(error);
    const error2 = new Error("Api key no encontrados. ");
    return res.status(404).json({ msg: error2.message });
  }
};

export { obtenerTorneoDays, crearTorneoDay };
