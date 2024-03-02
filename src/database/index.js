// CONXEXÃO COM BANCO

require('dotenv').config()

const USER = process.env.USER
const PASS= process.env.PASS


const { config } = require('dotenv')
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${USER}:${PASS}@clustero.5xfvudv.mongodb.net/?retryWrites=true&w=majority&appName=Clustero`)
mongoose.Promise = global.Promise

module.exports = mongoose 