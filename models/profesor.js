const { Schema, model } = require('mongoose');

const ProfesorSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },

});


ProfesorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Profesor', ProfesorSchema);