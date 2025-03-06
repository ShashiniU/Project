const multer = require("multer");
const path = require("path");
const fs = require('fs'); 

// Configure Image multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/gemstones';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Configure multer storage for specific file types like resume and cover letter
const storagefie = multer.diskStorage({
    destination: (req, file, cb) => {
      const fileType = file.fieldname;
      const dir = path.join( "uploads", fileType);
  
      // Ensure the directory exists
      require("fs").mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = Date.now() + ext;
      cb(null, fileName);
    },
  });
  
  // Use the storagefie for other files (resume, cover letter)
  const uploadfile = multer({ storage: storagefie });
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|webp/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
      
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'));
      }
    }
  });
  
   module.exports = { upload, uploadfile }; 
// module.exports = upload; 

