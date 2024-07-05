const express = require('express')
const router = express.Router()
const productos = require('../models/productos.model');

function IsNumeric(input)
{
    return (input - 0) == input && (''+input).trim().length > 0;
}

router.get('/productos', (req,res) => {
    productos.ver_productos().then(producto => {
        res.render('productos.view.ejs', {productos: producto });
    })
    .catch(err => {
        return res.status(500).send('Error en los productos ver ' + err.message);
    });
});
router.get('/productos/add', (req,res)=> {
    res.render('productos.add.view.ejs');
});
router.post('/productos/add', (req,res)=> {
    const {codigo, producto, precio, categoria_id, existencia_actual} = req.body;
    if (!codigo || !producto || !precio || !categoria_id || !existencia_actual) {
        return res.status(500).send('Todos los campos son obligatorios');
    }
    productos.insertar_productos(codigo, producto, precio, categoria_id, existencia_actual).then(() => {
        res.redirect('/productos');
    })
    .catch(err => {
        return res.status(500).send('Error al agregar el producto');
    });
});
router.get('/productos/eliminar/:id', function(req,res) {
    productos.borrar_productos(req.params.id).then(() => {
        res.redirect('/productos');
    })
    .catch(err => {
        return res.status(500).send('Error en borrar producto');
    })
})
router.get('/productos/editar/:id', function (req, res) {
    productos.obtenerPorId(req.params.id).then(producto => {
            if (producto) {
                res.render("productos.edit.view.ejs", {productos: producto, err : false});
            } else {
                return res.status(500).send("No existe producto con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo producto");
        });
});
router.post('/productos/update', function (req, res) {
    const { producto, codigo, precio, existencia_actual, categoria_id, id } = req.body;
    if (!producto || !codigo || !precio || !existencia_actual || !categoria_id || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    productos.actualizar(producto, codigo, precio, existencia_actual, categoria_id, id).then(() => {
            res.redirect("/productos");
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send("Error actualizando producto");
        });
});
module.exports = router