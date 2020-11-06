/*
    Cursos
    ruta: '/api/cursos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCursos,
    crearCurso,
    actualizarCurso,
    borrarCurso
} = require('../controllers/cursos')


const router = Router();

router.get('/', getCursos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del curso es necesario').not().isEmpty(),
        validarCampos
    ],
    crearCurso
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del curso es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarCurso
);

router.delete('/:id',
    validarJWT,
    borrarCurso
);



module.exports = router;