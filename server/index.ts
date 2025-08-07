import { initServer } from "./src/server";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const app = await initServer();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();