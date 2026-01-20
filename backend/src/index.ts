import express from "express";
import cookieParser from "cookie-parser";
import unprotectedRoutes from "./routes/unprotected";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:8000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Unprotected routes
app.use(unprotectedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});