/*
    Profesores
    ruta: '/api/profesor'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProfesores,
    crearProfesor,
    actualizarProfesor,
    borrarProfesor,
    getProfesorById
} = require('../controllers/profesores')


const router = Router();

router.get('/', validarJWT, getProfesores);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del profesor es necesario').not().isEmpty(),
        check('curso', 'El curso id debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearProfesor
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del profesor es necesario').not().isEmpty(),
        check('curso', 'El curso id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarProfesor
);

router.delete('/:id',
    validarJWT,
    borrarProfesor
);

router.get('/:id',
    validarJWT,
    getProfesorById
);



module.exports = router;