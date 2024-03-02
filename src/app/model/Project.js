
const mongoose = require('../../database')
const ProjectSchema = new mongoose.Schema ({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
       
      
    },
    title:{
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true, 

    },

   
    tasks : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }]
    ,
    createdAt:{
        type: Date,
        default: Date.now
    },
})


//ENCRIPTANDO A SENHA DO USUÁRIO ANTES DE SALVAR NO BANCO



const Project = mongoose.model('Project', ProjectSchema)


module.exports = Project