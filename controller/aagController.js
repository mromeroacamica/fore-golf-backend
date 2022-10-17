import axios from "axios";
const user = "Box449";
const key = "49db5835-ef63-4a2f-ac05-d7a7183baf74";
const getEnrolledsByMatricula = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("hola");
    const userKeyString = user + ":" + key;
    const buffer = Buffer.from(userKeyString);
    const header = buffer.toString("base64");
    console.log("aaaaaaaaaaaaaaaaaaaa", "Basic " + header);
    const data = [id.toString()];
    const response = await axios.post(
      "http://aag-api-test.tecnocode.net/api/supplier/enrolleds",
      data,
      {
        headers: {
          Authorization: "Basic " + header,
          "Content-Type": "application/json",
        },
      },
    );
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa", response);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    const error2 = new Error("Error con algún dato ingresado.");
    return res.status(err.response.status).json({ msg: error2.message });
  }
};

export { getEnrolledsByMatricula };
