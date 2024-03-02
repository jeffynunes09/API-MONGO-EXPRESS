const express = require('express')
const Project = require("../model/Project.js")
const Task = require("../model/Task.js")

const authMiddleware = require('../middlewares/auth')


const router = express.Router()

router.use( authMiddleware )

// ROTA DE LISTAGEM DE PROJETOS

router.get('/', async (req,res) => {

   try {
    const projects = await Project.find().populate('user', 'tasks')
    
    return res.send({projects})
   } catch (error) {

    return res.status(400).send({error : "Error loading projects"})
   }
})



// PROCURAR TODOS UM USUARIOS

router.get('/:projectId', async (req, res) => {

    res.send({ user: req.userId })
})


//ROTA DE CREATE DE PROJETO

router.post('/', async (req, res) => {

    try {
        const {title, description, tasks} = req.body

        const project = await Project.create( {title, description, user: req.userId} )

       await Promise.all(tasks.map(async task => {
        const projectTask = new Task ({...task, project: project._id}) 

        await projectTask.save()

        project.tasks.push(projectTask)

       }))

        await project.save()

        return res.send({ project })
        
    } catch ( err ) {
        console.log(err)
        return res.status(400).send({ error: "Error creating new project" })
    }
})


//ATUALIZANDO 


router.put('/:projectId', async (req, res) =>{

    try {
        const {title, description, tasks,} = req.body

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title, 
            description, 
          },{new: true} )


          project.tasks= []
          await Task.removeAllListeners({project : project._id})


       await Promise.all(tasks.map(async task => {
        const projectTask = new Task ({...task, project: project._id}) 

        await projectTask.save()

        project.tasks.push(projectTask)

       }))

        await project.save()

        return res.send({ project })
        
    } catch ( err ) {
        console.log(err)
        return res.status(400).send({ error: "Error updating new project" })
    }
})

//DELETAR UM USUARIO

router.delete('/:projectId', async (req, res) => {  

    try {
        const project = await Project.findByIdAndDelete(req.params.projectId).populate('user')

        return  res.send()
    } catch (error) {
         
        return res.status(400).send({error : "Error loading project"})
        
    }

   
})



module.exports = app => app.use('/projects', router)