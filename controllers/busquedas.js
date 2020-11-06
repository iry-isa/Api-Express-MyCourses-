const { response } = require('express');

const Usuario = require('../models/usuario');
const Profesor = require('../models/profesor');
const Curso = require('../models/curso');


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, profesores, cursos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Profesor.find({ nombre: regex }),
        Curso.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        profesores,
        cursos
    })

}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'profesores':
            data = await Profesor.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('curso', 'nombre img');
            break;

        case 'cursos':
            data = await Curso.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/profesores/cursos'
            });
    }

    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}