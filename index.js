import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import dayRoutes from "./routes/dayRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import aagRoutes from "./routes/aagRoutes.js";
import aagApiKeysRoutes from "./routes/aagApiKeysRoutes.js";
import torneoRoutes from "./routes/Torneos/torneoRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDb();
console.log("dese index.js");

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/club", clubRoutes);
app.use("/api/config", configRoutes);
app.use("/api/day", dayRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/aag", aagRoutes);
app.use("/api/aag-api-keys", aagApiKeysRoutes);
app.use("/api/torneo", torneoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
