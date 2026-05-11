const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simulación de base de datos para el prototipo
const ProductoSchema = new mongoose.Schema({
    nombre: String,
    categoria: String,
    precio: Number,
    cantidad: Number,
    unidad: String,
    vendedor: String,
    ubicacion: { type: String, default: "Aipe, Huila" }
});

const Producto = mongoose.model('Producto', ProductoSchema);

// Ruta para obtener todos los productos del marketplace
app.get('/api/productos', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// Ruta para que el agricultor publique
app.post('/api/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
});

app.listen(3000, () => console.log('Prototipo TRL5 ejecutándose en puerto 3000'));
