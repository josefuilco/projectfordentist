import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/AuthRouter";
import UserRouter from "./routes/UserRouter";
import ProjectRouter from "./routes/ProjectRouter";
import DocumentRouter from "./routes/DocumentRouter";
import usePrivateKey from "./middlewares/usePrivateKey";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware para la llave privada
app.use(usePrivateKey);

// Routers
app.use("/api", AuthRouter);
app.use("/api", UserRouter);
app.use("/api", DocumentRouter);
app.use("/api", ProjectRouter);

app.listen(PORT, () => {
  console.log(`Server initialized on port: ${PORT}`);
});
