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

  await client.query(`
  create table if not exists authors (
    id serial primary key,
    name varchar(255) not null,
    lastname varchar(255) not null,
    notes text not null
  )
  `)

  await client.query(`
  create table if not exists authors_books (
    author_id int not null,
    book_id int not null,
    primary key (author_id, book_id),
    foreign key (author_id) references authors(id),
    foreign key (book_id) references books(id)
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

async function get_authors() {
  const client = await pool.connect()

  const { rows } = await client.query('select * from authors')

  client.release()
  
  return rows
}

async function get_book(id) {
  const client = await pool.connect()

  const {rows} = await client.query({
    text: 'select * from books where id=$1',
    values: [id]
  })

  client.release()
  
  return rows[0]
}

async function authors_from_book(book_id) {
  const client = await pool.connect()

  await client.query('BEGIN')
  // autores que SI escribieron este libro
  let authors_yes = await client.query({
    text: `select authors.id, authors.name, authors.lastname
    from authors
    join authors_books on authors.id=authors_books.author_id
    join books on authors_books.book_id=books.id 
    where books.id=$1`,
    values: [book_id]
  })
  authors_yes = authors_yes.rows
  await client.query('COMMIT')
  client.release()
  // TODOS los autores
  authors = await get_authors()

  // autores que NO escribiero el libro
  const authors_not = authors.filter(
    author => authors_yes.find( auth => auth.id == author.id) == undefined
  )

  return {authors_yes, authors_not}
}

async function create_author(name, lastname, notes) {
  const client = await pool.connect()

  const res = await client.query({
    text: 'insert into authors (name, lastname, notes) values ($1, $2, $3) returning *',
    values: [name, lastname, notes]
  })

  client.release()

  return res.rows[0]
}



module.exports = { create_book, get_books, get_book, create_author, get_authors, authors_from_book }