const restful = require('node-restful')
const mongoose = restful.mongoose

/*
const worksSchema = new mongoose.Schema({
  work: { type: String, required: false },
})
*/
//.update({}, {$set: {"kind": 'dictionary'}}, false, true)
//db.getCollection('dicionaries').updateMany({},{ $set: { wordInUse: "" }} )

const workSchema = new mongoose.Schema({
  w: { type: String, required: true },
  l: { type: Number, required: true },
  works: { type: Array, required: true },
  worksDone: { type: Array, required: true }
  
})



module.exports = restful.model('dictionaries', workSchema)
