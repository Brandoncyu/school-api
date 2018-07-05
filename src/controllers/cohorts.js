const model = require('../models/cohorts')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAll(req, res, next){
  model.getAll()
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

function getOne(req, res, next){
  model.getOne(parseInt(req.params.cohortId))
  .then(function(data){
    if(data){
      res.status(200).send({data})
    }
    else{
      throw {status: 404, message: 'Cohort not found'}
    }
  })
  .catch(next)
}

function create(req, res, next){
  if (!req.body.name) next({status: 400, message: 'Need Cohort Name'})

  model.create(req.body.name)
  .then(function(data){
    return res.status(201).send({data})
  })
  .catch(next)
}

function update(req, res, next){
  if (!req.body.name) next({status: 400, message: 'Need Cohort Name'})

  model.update(req.params.cohortId, req.body.name)
  .then(function(data){
    return res.status(200).send({data})
  })
  .catch(next)
}

function remove(req, res, next){
  model.remove(req.params.cohortId)
  .then(function(data){
    return res.status(200).send({data})
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllStudents(req, res, next){
  model.getAllStudents(req.params.cohortId)
  .then(function(data){
    return res.status(200).send({data})
  })
  .catch(next)
}

function getAllInstructors(req, res, next){
  model.getAllInstructors(parseInt(req.params.cohortId))
  .then(function(data){
    return res.status(200).send({ data })
  })
  .catch(next)
}

//////////////////////////////////////////////////////////////////////////////
// Quality of Life functions
//////////////////////////////////////////////////////////////////////////////

function checkIfCohortExists(req, res, next){
  model.getOne(parseInt(req.params.cohortId))
  .then(function(data){
    if(!data) next({ status: 404, message: 'Cohort Not Found' })
    next()
  })
}

module.exports = {
  getAll,
  getOne,
  getAllStudents,
  getAllInstructors,
  create,
  update,
  remove,
  checkIfCohortExists
}
