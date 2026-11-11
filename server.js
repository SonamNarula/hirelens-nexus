require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server start nahi ho paya: ${error.message}`);
    process.exit(1);
  }
};

startServer();