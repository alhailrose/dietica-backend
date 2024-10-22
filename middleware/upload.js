// middlewares/uploadMiddleware.js
import multer from "multer";

// Konfigurasi multer untuk menyimpan file ke memori
const storage = multer.memoryStorage();
const upload = multer({ storage });

export { upload };
