const conexion = require('../db');
const categorias = {
    ver_categorias() {
        return new Promise((resolve, reject) => {
            conexion.query('select categorias.id, categorias.categoria from categorias', (err,resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
        });
    },
    insertar_categorias(categoria) {
        return new Promise((resolve, reject) => {
            conexion.query('insert into categorias (categoria) values (?)',[categoria], (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });
        });
    },
    borrar_categorias(id) {
        return new Promise((resolve, reject) => {
            conexion.query('delete from categorias where id=?', [id], (err) => {
                if (err) reject(err);
                
                else resolve();
            });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, categoria from categorias where id = ?`,[id],(err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    actualizar(categoria, id) {
        return new Promise((resolve, reject) => {
            conexion.query(`update categorias set categoria = ? where id = ?`, [categoria, id ],(err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}

module.exports = categorias;