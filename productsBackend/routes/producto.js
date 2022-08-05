//Rutas producto
const express = require("express");
const router = express.Router();
const productoController = require('../controllers/producto.controller');

//api/productos
router.post('/', productoController.crearProducto)
router.get('/', productoController.obtenerProductos)
router.put('/:id', productoController.modificarProducto)
router.get('/:id', productoController.obtenerProducto)
router.delete('/:id', productoController.eliminarProducto)



module.exports = router