const restful = require('node-restful')
const mongoose = restful.mongoose




const workSchema = new mongoose.Schema({
  name: { type: String, required: true },
  typePassword: {type: String, require: true },
  charset: {type: String, require: false, default: '' },
  lengthMin: {type: Number, require: true },
  lengthMax: {type: Number, require: true },
  passwordProvided: {type: String, require: true },
  discoveredPassword: {type: String, require: true },
  created: {type: Date, require: true },
  typeAttack: {type: String, require: true },
  startWork: {type: Number, require: false, default: 0 },
  totalWordsAvailable: {type: Number, require: false },
  totalWordVerified: {type: Number, require: false, default: 0 },
  status: {type: String, require: true, default: '' },
  jobsCount: {type: Number, default: 0},
  jobs: {
    browser: { type: String, required: false },
    jobTime: { type: Date, required: false },
    owner: { type: String, required: false },
    },
  

})



module.exports = restful.model('disPass', workSchema)
