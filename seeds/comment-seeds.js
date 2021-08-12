const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Nunc rhoncus dui vel sem.',
    user_id: 1,
    game_id: 1
  },
  {
    comment_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 2,
    game_id: 2
  },
  {
    comment_text: 'Aliquam erat volutpat. In congue.',
    user_id: 3,
    game_id: 3
  },
  {
    comment_text: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    user_id: 4,
    game_id: 4
  },
  {
    comment_text: 'In hac habitasse platea dictumst.',
    user_id: 5,
    game_id: 5
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;