const db = require('../../db')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAll(){
  return db('cohorts')
}

function getOne(cohortId){
  return db('cohorts').where({ id: cohortId }).first()
}

function create(name){
  return (
    db('cohorts')
    .insert({name})
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function update(cohortId, name){
  return (
    db('cohorts')
    .where({id: cohortId})
    .update({name})
    .returning('*')
    .then(function([data]){
      return data
    })
  )

}

function remove(cohortId){
  return(
    db('cohorts')
    .del()
    .where({id: cohortId})
    .returning('*')
    .then(function([data]){
      delete data.id
      return data
    })
  )

}

//////////////////////////////////////////////////////////////////////////////
// Nested CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAllStudents(cohortId){
  return (
    db('cohorts')
    .select('students.id as students_id',
            'students.name as students_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name')
    .join('students', 'students.cohorts_id', 'cohorts.id')
    .where('cohorts.id', cohortId)
  )
}

function getAllInstructors(cohortId){
  return (
    db('cohorts')
    .select('instructors.id as instructors_id',
            'instructors.name as instructors_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name')
    .join('instructors_cohorts', 'instructors_cohorts.cohorts_id', 'cohorts.id')
    .join('instructors', 'instructors.id', 'instructors_cohorts.instructors_id')
    .where('cohorts.id', cohortId)
  )
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllStudents,
  getAllInstructors
}
