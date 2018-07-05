const db = require('../../db')

//////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
//////////////////////////////////////////////////////////////////////////////

function getAll(){
  return db('students') // SELECT * FROM students
}

function getOne(studentId){
  return db('students').where({ id: studentId }).first()

   // SELECT * FROM students WHERE id = ?
}

function create(name, cohorts_id){
  return (
    db('students')
    .insert({ name, cohorts_id })
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function update(studentId, name, cohorts_id){
  return (
    db('students').where({ id: studentId })
    .update({name, cohorts_id})
    .returning('*')
    .then(function([data]){
      return data
    })
  )
}

function remove(studentId){
  return (
    db('students')
    .where({ id: studentId })
    .del()
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

function getAllInstructors(studentId){
  return (
    db('students')
    .select('instructors.id as instructors_id',
            'instructors.name as instructors_name',
            'cohorts.id as cohorts_id',
            'cohorts.name as cohorts_name')
    .join('cohorts', 'cohorts.id', 'students.cohorts_id')
    .join('instructors_cohorts', 'instructors_cohorts.cohorts_id', 'cohorts.id')
    .join('instructors', 'instructors.id', 'instructors_cohorts.instructors_id')
    .where('students.id', studentId)
  )
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAllInstructors
}
