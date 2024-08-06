import app from "./src";
import connectDB from "./src/lib/config/db";

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`),
);
