import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import { sequelize } from "./db.js";
import router from "./router.js";

const PORT = 7000;

const app = express();
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);

/* const { Pool } = pg;

const pool = new Pool({
  connectionString: DATABASE_URL,
}); */

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Neon PostgreSQL via Sequelize");

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT}. Listen to http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(error);
  }
}

startApp();
