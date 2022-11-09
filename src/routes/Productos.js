const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/productos', (req, res) => {
    res.render('index');
})

module.exports = router;