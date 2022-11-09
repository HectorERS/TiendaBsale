const express = require('express');
const router = express.Router();
const pool = require('../database');


//trae todos los productos con su categoria
router.get('/productos', async (req, res) => {
    const productos = await pool.query('SELECT *, category.name as category_name FROM product INNER JOIN category ON product.category = category.id');
    res.json(productos);
})

//filtrar productos por el id del producto
router.get('/productos/:id', async(req, res) => {
   const { id } = req.params;
   const productos = await pool.query('SELECT * FROM product WHERE product.id = ?', [id]);
   res.json(productos)
})

//filtra los productos por categoria
router.get('/productos/categoria/:categoria', async(req, res) => {
    const { categoria } = req.params;
    const category = await pool.query('SELECT product.name, product.price, product.url_image, product.discount, category.name as category_name FROM product, category where category.id = product.category and category.name = ?', [categoria]);
    res.json(category);
})

module.exports = router;