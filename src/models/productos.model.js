const conexion = require('../db');
const productos = {
    ver_productos() {
        return new Promise((resolve, reject) => {
            conexion.query('select productos.id, productos.codigo, productos.producto, productos.precio, categorias.categoria, productos.categoria_id, productos.existencia_actual from productos join categorias on categorias.id = productos.categoria_id', (err,resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertar_productos(codigo, producto, precio, categoria_id, existencia_actual) {
        return new Promise((resolve, reject) => {
            conexion.query('insert into productos (codigo, producto, precio, categoria_id, existencia_actual) values (?, ?, ?, ?, ?)',[codigo, producto, precio, categoria_id, existencia_actual], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });
        });
    },
    borrar_productos(id) {
        return new Promise((resolve, reject) => {
            conexion.query('delete from productos where id=?', [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    actualizar(producto,codigo,precio,existencia_actual,categoria_id,id) {
        return new Promise((resolve, reject) => {
            conexion.query(`update productos set producto = ?, codigo = ?, precio = ?, existencia_actual = ?, categoria_id = ? where id = ?`, [producto, codigo, precio, existencia_actual, categoria_id,id],(err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, producto,codigo,precio,existencia_actual,categoria_id from productos where id = ?`,[id],(err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
}

module.exports = productos;