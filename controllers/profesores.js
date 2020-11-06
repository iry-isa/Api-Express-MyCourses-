const { response } = require('express');

const Profesor = require('../models/profesor');

const getProfesores = async(req, res = response) => {

    const profesores = await Profesor.find()
        .populate('usuario', 'nombre img')
        .populate('curso', 'nombre img')


    res.json({
        ok: true,
        profesores
    })
}

const getProfesorById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const profesor = await Profesor.findById(id)
            .populate('usuario', 'nombre img')
            .populate('curso', 'nombre img');

        res.json({
            ok: true,
            profesor
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearProfesor = async(req, res = response) => {

    const uid = req.uid;
    const profesor = new Profesor({
        usuario: uid,
        ...req.body
    });


    try {

        const profesorDB = await profesor.save();


        res.json({
            ok: true,
            profesor: profesorDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarProfesor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const profesor = await Profesor.findById(id);

        if (!profesor) {
            return res.status(404).json({
                ok: true,
                msg: 'Profesor no encontrado por id',
            });
        }

        const cambiosProfesor = {
            ...req.body,
            usuario: uid
        }

        const profesorActualizado = await Profesor.findByIdAndUpdate(id, cambiosProfesor, { new: true });


        res.json({
            ok: true,
            profesor: profesorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarProfesor = async(req, res = response) => {

    const id = req.params.id;

    try {

        const profesor = await Profesor.findById(id);

        if (!profesor) {
            return res.status(404).json({
                ok: true,
                msg: 'Profesor no encontrado por id',
            });
        }

        await Profesor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



module.exports = {
    getProfesores,
    crearProfesor,
    actualizarProfesor,
    borrarProfesor,
    getProfesorById
}