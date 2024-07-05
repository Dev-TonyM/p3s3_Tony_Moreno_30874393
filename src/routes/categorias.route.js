const express = require('express')
const router = express.Router()
const categorias = require('../models/categorias.model');
router.get('/categorias', (req,res) => {
    categorias.ver_categorias().then(categoria => {
        res.render('categorias.view.ejs', {categorias: categoria });
    })
    .catch(err => {
        return res.status(500).send('Error en las categorias ver' + err.message);
    });
});
router.get('/categorias/add', (req,res)=> {
    res.render('categorias.add.view.ejs');
});
router.post('/categorias/add', (req,res)=> {
    const {categoria} = req.body;
    if (!categoria) {
        return res.status(500).send('Todos los campos son obligatorios');
    }
    categorias.insertar_categorias(categoria).then(() => {
        res.redirect('/categorias');
    })
    .catch(err => {
        return res.status(500).send('Error en los productos agregar');
    });
});
router.get('/categorias/eliminar/:id', function(req,res) {
    categorias.borrar_categorias(req.params.id).then(() => {
        res.redirect('/categorias');
    })
    .catch(err => {
        return res.status(500).send('Error en borrar la categoria');
    })
})
router.get('/categorias/editar/:id', function (req, res) {
    categorias.obtenerPorId(req.params.id).then(categoria => {
            if (categoria) {
                res.render("categorias.edit.view.ejs", {categoria: categoria,});
            } else {
                return res.status(500).send("No existe categoria con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo categoria");
        });
});
router.post('/categorias/update', function (req, res) {
    const { id, categoria } = req.body;
    if (!categoria || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    categorias.actualizar(categoria, id).then(() => {
            res.redirect("/categorias");
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send("Error actualizando producto");
        });
});
module.exports = router