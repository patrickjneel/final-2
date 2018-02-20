exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return knex('items').insert([
        {name: 'The Martian'},
        {name: 'Mars Attacks'},
        {name: 'Artemis'}
      ]);
    });
};
