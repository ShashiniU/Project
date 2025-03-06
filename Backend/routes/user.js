const express = require("express");
const db = require("../db"); // Database connection file
const path = require("path");
const jwt = require("jsonwebtoken");



const router = express.Router();
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
};

// Example of a protected route
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.promise().query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [req.user.userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      user: {
        id: users[0].id,
        firstName: users[0].first_name,
        lastName: users[0].last_name,
        email: users[0].email
      }
    });
    
  } catch (error) {
    console.error('Profile retrieval error:', error);
    res.status(500).json({ message: 'Server error while retrieving profile' });
  }
});

// router.post("/update-profile-picture", upload.single("profilePicture"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const userId = req.body.userId;
//   const profilePicturePath = `uploads/${req.file.filename}`; // Correct path

//   try {
//     const query = "UPDATE users SET image_path = ? WHERE id = ?";
//     await db.promise().query(query, [profilePicturePath, userId]);

//     const sql = "SELECT * FROM users WHERE id = ?";
//     db.query(sql, [userId], async (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

//         const user = results[0];
//             const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            
//             const profilePictureUrl = user.image_path
//             ? `${req.protocol}://${req.get("host")}/${user.image_path}`
//             : null;

//             const resumeUrl = user.cv_path
//             ? `${req.protocol}://${req.get("host")}/${user.cv_path}`
//             : null;

//             const coverLetterUrl = user.cover_letter_path
//             ? `${req.protocol}://${req.get("host")}/${user.cover_letter_path}`
//             : null;
      
//             res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, profilePicture: profilePictureUrl, resume: resumeUrl, coverletter: coverLetterUrl}});
//         // });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update profile picture." });
//   }
// });


// // Upload files route (resume and cover letter)
// router.post("/upload-files", uploadfile.fields([  // Corrected multer middleware
//   { name: "resume", maxCount: 1 },
//   { name: "coverLetter", maxCount: 1 },
// ]), async (req, res) => {
//   try {
  

//  const resumePath = path.join(
//   "uploads",
//   "resume",
//   req.files.resume[0].filename
// );
// const coverLetterPath = path.join(
//   "uploads",
//   "coverLetter",
//   req.files.coverLetter[0].filename
// ); //  const coverLetterPath = req.files.coverLetter[0].path;
//       const userId = req.body.userId; // Assuming you're passing userId in the request body
//       const query = "UPDATE users SET cover_letter_path = ?, cv_path = ? WHERE id = ?";  // Corrected query
//       await db.promise().query(query, [coverLetterPath, resumePath, userId]); 
      
//       const sql = "SELECT * FROM users WHERE id = ?";
//     db.query(sql, [userId], async (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

//         const user = results[0];
//             const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            
//             const profilePictureUrl = user.image_path
//             ? `${req.protocol}://${req.get("host")}/${user.image_path}`
//             : null;

//             const resumeUrl = user.cv_path
//             ? `${req.protocol}://${req.get("host")}/${user.cv_path}`
//             : null;

//             const coverLetterUrl = user.cover_letter_path
//             ? `${req.protocol}://${req.get("host")}/${user.cover_letter_path}`
//             : null;
      
//             res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, profilePicture: profilePictureUrl, resume: resumeUrl, coverletter: coverLetterUrl}});
//         // });
//     });

//   } catch (error) {
     
//       console.error("Error uploading files:", error);
//       res.status(500).json({ message: "Failed to upload files", error: error.message });  // Include error message in response for debugging
//   }
// });

// User applying Registration
router.post("/applying", async (req, res) => {
  try {
      const { jobid, userId } = req.body;
      if (!jobid || !userId) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      // Example SQL query (Adjust based on your database schema)
      const sql = "INSERT INTO job_user_mapping (user_id, job_id) VALUES (?, ?)";
      await db.promise().query(sql, [userId, jobid]);

      res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
      console.error("Error submitting job application:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



// Get applicants for a job
router.get("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameter
      const sql = `SELECT job_user_mapping.id,
      job_user_mapping.applied_at, jobs.title, jobs.company, jobs.description,
      job_user_mapping.is_reviewing AS review,
      job_user_mapping.is_interview AS interview,
      job_user_mapping.is_pending AS pending,
      job_user_mapping.is_confirmation AS confirm,
      job_user_mapping.IsRejected AS reject,
      users.name, users.email, users.image_path, users.cv_path, users.cover_letter_path
  FROM job_user_mapping 
  JOIN jobs ON job_user_mapping.job_id = jobs.id
  JOIN users ON job_user_mapping.user_id = users.id
  WHERE job_user_mapping.user_id = ?`;
  
  const [results] = await db.promise().query(sql, [id]);

  if (!results.length) {
    return res.status(404).json({ message: "No jobs found for this user." });
  }  const applicants = results.map(applicant => ({
          id: applicant.id,
          applied_at: applicant.applied_at,
          title: applicant.title,
          company: applicant.company,
          description: applicant.description,
          cover_letter_path: applicant.cover_letter_path,          
          status: getStatus(applicant) // Function to determine status
      }));

      res.json(applicants);
  } catch (error) {
      console.error("Error fetching applicants:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
// Helper function to determine applicant status
const getStatus = (applicant) => {
  if (applicant.confirm) return "Selected";
  if (applicant.reject) return "Rejected";
  if (applicant.interview) return "Interviewing";
  if (applicant.review) return "Reviewing";
  if (applicant.pending) return "Pending";
  return "Applied";
};


// Set up multer to handle file uploads
// const upload = multer({ storage: storage });
module.exports = router;
