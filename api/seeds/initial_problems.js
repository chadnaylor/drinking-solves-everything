
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('problems').del()
    .then(function () {
      // Inserts seed entries
      return knex('problems').insert([
        {
          name: 'Spouse nagging', description: 'He/She/It refuses to let me spend six' +
            'hours a day playing video games instead of doing chores'
        },
        { name: 'Mean boss', description: 'He/She/It expects me to come to work on time' }
      ]);
    });
};
