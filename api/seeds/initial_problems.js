
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('problems').del()
    .then(function () {
      // Inserts seed entries
      return knex('problems').insert([
        {
          name: 'My wife is nagging me', description: 'He/She/It refuses to let me spend six' +
            'hours a day playing video games instead of doing chores'
        },
        { name: 'Mean boss', description: 'She beats me and not in the way I like' },
        {
          name: 'Too many checkpoints!', description: 'We had checkpoints three days in a row. Why, God?'
        },
        {
          name: 'I am bad at my job', description: 'I lied on my resumé and now I have no idea what I\'m doing'
        },
        {
          name: 'I failed my PT test', description: 'No one told me not to eat McDonald\'s right before and I puked on the Commandant'
        },
        {
          name: 'My troop got a DUI', description: 'I got called on the carpet for not giving him the mandatory safety brief'
        },
        {
          name: 'My dog ruined my nice rug', description: 'I bought it for $70 from the rug merchant in front of the BX'
        },
        {
          name: 'I don\'t know how to code', description: 'I literally have no idea what\'s going on. Am I halfway done? Help.'
        },
      ]);
    });
};
