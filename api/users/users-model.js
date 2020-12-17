const db = require('../../data/dbConfig');

module.exports = {
    findById,
    findBy,
    add
}

function findById(id) {
    return db('users')
    .select('id', 'username', 'password') // do i need to return password?
    .where({ id })
    .first()
}

function findBy(filter) {
    return db('users')
    .where(filter)
}

async function add(user) {
    const [id] = await db('users').insert(user, 'id');
    return findById(id);
  }