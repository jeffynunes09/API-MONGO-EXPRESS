//IMPORTAÇÃO DE MODULOS

const express = require('express')
const User = require('../model/user')
const router = express.Router()
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const crypto = require('crypto')
const mailer = require ('../../modules/mailer')



//GERANDO TOKEN PARA AUTENTIFICAÇÃO
function generateToken(params = {}){

    return jwt.sign(params, authConfig.secret,{

        expiresIn: 86400,
    })
}


//REGISTRO USER

router.post("/register", async(req,res)=>{

    const { email} = req.body

    try 
    {
        // VERIFICANDO SE O EMAIL DIGITADO JA FOI CADASTRADO
        if(await User.findOne({email}) ){

            return res.status(400).send({error: "User already exists!"})
        }

        const user = await User.create(req.body)
        

        // NÃO MOSTRAR A SENHA
        user.password = undefined

        return res.send( {user} )

    }catch(err){

        return res.status(400).send( {error: ' Resgistration failed'})
    }
})


 // AUTENCAÇÃO DE USER [ VERIFICANDO SE EMAIL E SENHA ESTÃO NO BANCO]

router.post('/authenticate', async ( req,res ) => {

    const {email,password} = req.body

    const user = await User.findOne({email}).select('+password')



    if(!user){ return res.status(400).send({error : 'User not found'})}
        
          
    // COMPARANDO SE SENHA DIGITADA É A MESMA CADASTRADA
    if(!await bcryptjs.compare(password,user.password)){
        
        return res.status(400).send({error: "Invalid password"}) }



    user.password = undefined  

    //CRIANDO TOKEN DE VERIFICAÇÃO






    res.send({user , token: generateToken({id: user.id})})


    
})


// ESQUECEU SENHA 
router.post('/forgot_password', async (req,res) =>{

    const {email} = req.body

    try { 
        const user = await User.findOne({ email })

        if(!user){ return res.status(400).send({error : 'User not found'})}

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
            '$set' : {
                passwordResetToken: token,
                passwordResetExpires:now
            }
        })

      mailer.sendMail({
        to: email,
        from: "nunesjefferson425@gmail.com",
        template: "auth/forgot_password",
        context: {token}
      }, (err) => {
        console.log(err)
        if(err){return res.status(400).send({error: 'Cannot send forgot password email'})}

        return res.send()
      })
        
    } catch (err) {
        console.log(err)
        res.status(400).send({error: 'Erro on fogot password, try again'})
        
    }
})


//RESETAR SENHA

router.post('/reset_password', async (req,res) =>{

    const { email,token,password} = req.body
   
    try { 

        const user = await User.findOne({ email })
        .select('+passwordResetToken  passwordResetExpires') 
        if(!user){ return res.status(400).send({error : 'User not found'})}

        if (token !== user.passwordResetToken){
            return  res.status(400).send({error : 'Token invalid'})   
        }

        const now = new Date()

        if(now > user.passwordResetExpires){
            res.status(400).send({error : 'Token expired, generate a new one'})   
        }

        user.password = password


        await user.save()

        res.send(200)
    } catch (error) {
        res.status(400).send({error : 'Cannot reset password , try again'})        
    }
})


module.exports = app => app.use('/auth', router)  //IMPORTANDO TODA A PAG