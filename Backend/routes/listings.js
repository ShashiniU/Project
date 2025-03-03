const { upload } = require("../middleware/upload");
const express = require("express");
require("dotenv").config();
const db = require("../db"); // Database connection file

const router = express.Router();

router.post('/listings', upload.array('images', 5), async (req, res) => {
    const conn = await db.promise().getConnection();
    try {
      await conn.beginTransaction();
      
      const {
        name,
        type,
        carat,
        color,
        clarity,
        cut,
        origin,
        treatment,
        certification,
        certificationNumber,
        price,
        description,
        userId
      } = req.body;
  
      // Validate required fields
      if (!name || !type || !carat || !color || !clarity || !cut || !origin || 
          !certification || !certificationNumber || !price || !description || !userId) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields' 
        });
      }
  
      // Insert gemstone listing
      const [result] = await conn.execute(
        `INSERT INTO gemstone_listings 
        (user_id, name, type, carat, color, clarity, cut, origin, treatment, 
         certification, certification_number, price, description, status, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          userId,
          name,
          type,
          parseFloat(carat),
          color,
          clarity,
          cut,
          origin,
          treatment || 'None',
          certification,
          certificationNumber,
          parseFloat(price),
          description,
          'Active'
        ]
      );
  
      const listingId = result.insertId;
  
      // Process uploaded images
      if (req.files && req.files.length > 0) {
        const imageValues = req.files.map((file, index) => {
          return [
            listingId,
            `/uploads/gemstones/${file.filename}`,
            index === 0 ? 1 : 0, // First image is primary
            new Date()
          ];
        });
  
        // Insert images
        await conn.query(
          `INSERT INTO gemstone_images 
          (gemstone_id, image_url, is_primary, created_at) 
          VALUES ?`,
          [imageValues]
        );
      }
  
      await conn.commit();
      
      res.status(201).json({
        success: true,
        message: 'Listing created successfully',
        data: {
          id: listingId,
          name,
          price,
          images: req.files ? req.files.map(file => `/uploads/gemstones/${file.filename}`) : []
        }
      });
    } catch (error) {
      await conn.rollback();
      console.error('Error creating listing:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create listing',
        error: error.message
      });
    } finally {
      conn.release();
    }
  });
  
  // Get all listings
  router.get('/listings', async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT gl.*, 
          (SELECT image_url FROM gemstone_images gi WHERE gi.gemstone_id = gl.id AND gi.is_primary = 1 LIMIT 1) as primary_image 
        FROM gemstone_listings gl
        ORDER BY gl.created_at DESC
      `);
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch listings',
        error: error.message
      });
    }
  });
  
  // Get listing by ID
  router.get('/listings/:id', async (req, res) => {
    try {
      const [listing] = await db.promise().query(`
        SELECT * FROM gemstone_listings WHERE id = ?
      `, [req.params.id]);
      
      if (listing.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Listing not found'
        });
      }
      
      const [images] = await db.promise().query(`
        SELECT * FROM gemstone_images WHERE gemstone_id = ? ORDER BY is_primary DESC
      `, [req.params.id]);
      
      res.json({
        success: true,
        data: {
          ...listing[0],
          images
        }
      });
    } catch (error) {
      console.error('Error fetching listing details:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch listing details',
        error: error.message
      });
    }
  });
  
  // Get listings by user ID
  router.get('/users/:userId/listings', async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT gl.*, 
          (SELECT image_url FROM gemstone_images gi WHERE gi.gemstone_id = gl.id AND gi.is_primary = 1 LIMIT 1) as primary_image 
        FROM gemstone_listings gl
        WHERE gl.user_id = ?
        ORDER BY gl.created_at DESC
      `, [req.params.userId]);
      
      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      console.error('Error fetching user listings:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user listings',
        error: error.message
      });
    }
  });

  module.exports = router; 
  