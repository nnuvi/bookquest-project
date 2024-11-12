import multer from 'multer';

// Set up Multer to use memory storage
const storage = multer.memoryStorage();

// Initialize Multer with the memory storage configuration
const upload = multer({ storage });

export default upload;

