// CONFIG NODEMAILER PARA ENVIO DE EMAIL DE RESETAR SENHA




const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');



const {host,port,user,pass} = require('../config/mailer.json');
const path = require('path');



const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user,pass }
  });





  transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
   
  }))

  module.exports = transport