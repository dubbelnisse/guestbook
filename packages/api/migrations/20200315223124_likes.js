exports.up = knex => {
  return knex.raw('create extension if not exists "uuid-ossp"').then(() =>
    knex.schema.createTable('likes', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
      table
        .uuid('post_id')
        .unique()
        .notNullable()
      table.integer('likes', 128).notNullable()
      table
        .foreign('post_id')
        .references('id')
        .inTable('posts')
    })
  )
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('likes')
}
