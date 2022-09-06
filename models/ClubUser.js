import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioClubSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    clubUser: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
usuarioClubSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
usuarioClubSchema.methods.comprobarPassword = async function (
  passwordFormulario,
) {
  return await bcrypt.compare(passwordFormulario, this.password);
};
const UsuarioClub = mongoose.model("UsuarioClub", usuarioClubSchema);
export default UsuarioClub;
