export const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://makenotes-backend.onrender.com/"
    : "http://localhost:4000/";
