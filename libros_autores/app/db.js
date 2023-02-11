const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'librosautores',
  password: '1005',
  max: 12,
  min: 2,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 2000
})

async function init() {
  const client = await pool.connect()

  await client.query(`
  create table if not exists books (
    id serial primary key,
    title varchar(255) not null,
    description text not null
  )
  `)
  client.release()
}
init()

async function create_book(title, description) {
  const client = await pool.connect()

  await client.query({
    text: 'insert into books (title, description) values ($1, $2)',
    values: [title, description]
  })

  client.release()
}

async function get_books() {
  const client = await pool.connect()

  const { rows } = await client.query('select * from books')

  client.release()
  
  return rows
}

module.exports = { create_book, get_books }