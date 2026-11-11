require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

const PORT = Number(process.env.PORT) || 3000;

function validateEnvironment() {
  const requiredVariables = ["MONGO_URI", "JWT_SECRET"];
  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]?.trim()
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missingVariables.join(", ")}`
    );
  }
}

const startServer = async () => {
  try {
    validateEnvironment();
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