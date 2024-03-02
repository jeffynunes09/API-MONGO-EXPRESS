
const mongoose = require('../../database')
const TaskSchema = new mongoose.Schema ({
    title:{
        type: String,
        required: true, 
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true, 

    },

    assignedTo :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    completed: [{
        type: Boolean,
        require: true,
        default: false,
    }]
    ,
    createdAt:{
        type: Date,
        default: Date.now
    },
})


//ENCRIPTANDO A SENHA DO USUÁRIO ANTES DE SALVAR NO BANCO



const Task = mongoose.model('Task', TaskSchema)


module.exports = Task