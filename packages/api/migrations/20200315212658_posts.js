exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('posts', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table.text('text').notNullable()
      table.string('author_name', 128).notNullable()
      table.string('author_avatar', 128).notNullable()
      table.integer('author_id', 128).notNullable()
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('posts')
}
