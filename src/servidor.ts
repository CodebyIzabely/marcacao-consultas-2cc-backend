import express from "express";
import cors from "cors";
import {
  garantirBanco,
  listarEspecialidades,
  listarMedicos,
  listarUsuarios,
  listarConsultas,
  inserirConsulta,
} from "./banco";

garantirBanco();

const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

app.get("/clinica", (_req, res) => {
  res.status(200).json({
    ok: true,
    servico: "clinica-api",
    agora: new Date().toISOString(),
  });
});

app.get("/especialidades", (_req, res) => {
  res.status(200).json(listarEspecialidades());
});

app.get("/medicos", (_req, res) => {
  res.status(200).json(listarMedicos());
});

app.get("/usuarios", (_req, res) => {
  res.status(200).json(listarUsuarios());
});

app.get("/consultas", (_req, res) => {
  res.status(200).json(listarConsultas());
});

app.post("/consultas", (req, res) => {
  const { medicoId, pacienteId, data, observacoes } = req.body;
  const criada = inserirConsulta({
    medicoId: Number(medicoId),
    pacienteId: Number(pacienteId),
    data: String(data),
    observacoes: String(observacoes ?? ""),
  });
  res.status(201).json(criada);
});

app.listen(PORTA, () => {
  console.log(`API da clínica em http://localhost:${PORTA}`);
});