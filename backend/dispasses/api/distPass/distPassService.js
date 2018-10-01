const _ = require('lodash')
const DistPass = require('./distPass')
var fs = require('fs')


DistPass.methods(['get', 'post', 'put', 'delete'])


DistPass.updateOptions({new: true, runValidators: true})

DistPass.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

DistPass.route('count', function(req, res, next) {
  DistPass.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

DistPass.route('taskdistribution', function(req, res, next) {
  //put the code in...
  //res.sendFile('./taskdist.html', {root: __dirname})
})

//add work in the collection dictionaries

const dictionaries = require('./dictionaries')

const express = require('express')
const server = express()

const allowCors = require('./cors')
server.use(allowCors)

server.put('/addwork/:name/:min/:max/:kind/:cset', function(req, res, next) {
    
  if(req.params.cset == "all"){
  dictionaries.updateMany(  
    { $and: [{ l: { $gte: req.params.min, $lte: req.params.max }}, { k: req.params.kind}] },
    { $push: { works: req.params.name } },

    // callback function
    (err, v) => {
        if (err) return res.status(200).send(err)
        return res.status(200).send(v)
    }
    );
  }else{
  dictionaries.updateMany(  
    { $and: [{ l: { $gte: req.params.min, $lte: req.params.max }}, { k: req.params.kind}, {t: req.params.cset}] },
    { $push: { works: req.params.name } },

    // callback function
    (err, v) => {
        if (err) return res.status(200).send(err)
        return res.status(200).send(v)
    }
    
  );
  }
  
})
server.listen(3000, () => console.log('Add work...'))

module.exports = DistPass
