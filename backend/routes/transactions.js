const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed'));
    }
  }
});

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create transaction (only BPH can create)
router.post('/', auth, upload.single('photo'), async (req, res) => {
  try {
    // Check if user is BPH
    if (req.user.role !== 'bph') {
      return res.status(403).json({ message: 'Only BPH can create transactions' });
    }

    const { name, description, amount, type } = req.body;
    const photo = req.file ? req.file.path : '';

    const transaction = new Transaction({
      name,
      description,
      amount: parseFloat(amount),
      photo,
      type: type || 'income',
      createdBy: req.user.userId
    });

    await transaction.save();
    await transaction.populate('createdBy', 'name email');

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update transaction (only BPH can update)
router.put('/:id', auth, upload.single('photo'), async (req, res) => {
  try {
    // Check if user is BPH
    if (req.user.role !== 'bph') {
      return res.status(403).json({ message: 'Only BPH can update transactions' });
    }

    const { name, description, amount, type } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update fields
    transaction.name = name || transaction.name;
    transaction.description = description || transaction.description;
    transaction.amount = amount ? parseFloat(amount) : transaction.amount;
    transaction.type = type || transaction.type;

    // Update photo if new one is uploaded
    if (req.file) {
      // Delete old photo if exists
      if (transaction.photo && fs.existsSync(transaction.photo)) {
        fs.unlinkSync(transaction.photo);
      }
      transaction.photo = req.file.path;
    }

    await transaction.save();
    await transaction.populate('createdBy', 'name email');

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete transaction (only BPH can delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is BPH
    if (req.user.role !== 'bph') {
      return res.status(403).json({ message: 'Only BPH can delete transactions' });
    }

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Delete photo if exists
    if (transaction.photo && fs.existsSync(transaction.photo)) {
      fs.unlinkSync(transaction.photo);
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

