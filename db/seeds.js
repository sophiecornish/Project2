const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/cord_project');

///Models
const Post = require('../models/post');
const User = require('../models/user');

User.collection.drop();
Post.collection.drop();

User
  .create([{
    username: 'A',
    email: 'a@a.com',
    password: 'a',
    passwordConfirmation: 'a'
  }, {
    username: 'B',
    email: 'b@b.com',
    password: 'b',
    passwordConfirmation: 'b'
  }])
  .then(users => {
    console.log(`${users.length} users were created!`);

    return Post.create([{
      title: 'Sustainable Practices',
      subtitle: 'We put sustainability at the core of everything we do.',
      author: users[0],
      image: 'https://www.thereformation.com/media/W1siZiIsIjIwMTgvMDIvMjcvMTgvMDUvMDYvMDljMTBmMjMtNTg3NC00YTJjLWI2YzYtZjY3ODM1ZmMxY2VjLzktc2VydmljZWFuZGNvbW11bml0eS1hNmQ3OWNlODVkNzg5ZTliNGZlOTgzZDg4M2RhNTczZS5qcGciXV0/9-serviceandcommunity-a6d79ce85d789e9b4fe983d883da573e.jpg?sha=fbe59eb983bd7b16',
      content: 'TEXT TEXT TEXT TEXT',
      date: '12th August',
      readingTime: 8,
      likes: 293,
      comments: [
        {name: 'Sophie', content: 'Wow I never knew'},
        {name: 'Laura', content: 'Thanks for sharing. Check out my blog!'}
      ]
    },
    {
      title: '30 Days to Zero-Waste, a guide to more conscious living',
      subtitle: 'Going zero waste…',
      author: users[0],
      image: 'http://www.theecoedit.co.uk/wp-content/uploads/2018/02/3.jpg',
      content: 'TEXT TEXT TEXT TEXT',
      date: '2nd September',
      readingTime: 6,
      likes: 201
    },
    {
      title: 'At Harrods, Vetements Calls Out The Fashion Industry On Overproduction',
      subtitle: 'Unveiled today, Vetements is taking over four Harrods windows to create awareness around the corporate overproduction the brand’s co-founder Guram Gvasalia says is destroying fashion and its surrounding world.',
      author: users[1],
      image: 'http://img3.hungertv.com/wp-content/uploads/2018/02/VETEMENTS-SAKS--980x551.jpg',
      content: 'TEXT TEXT TEXT TEXT',
      date: '8th July',
      readingTime: 12,
      likes: 453
    }])
      .then(posts => console.log(`${posts.length} posts were created!`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close());
  });

// Post
//   .create([
//     {
//       title: 'Sustainable Practices',
//       subtitle: 'We put sustainability at the core of everything we do.',
//       authorName: 'Reformation',
//       image: 'https://www.thereformation.com/media/W1siZiIsIjIwMTgvMDIvMjcvMTgvMDUvMDYvMDljMTBmMjMtNTg3NC00YTJjLWI2YzYtZjY3ODM1ZmMxY2VjLzktc2VydmljZWFuZGNvbW11bml0eS1hNmQ3OWNlODVkNzg5ZTliNGZlOTgzZDg4M2RhNTczZS5qcGciXV0/9-serviceandcommunity-a6d79ce85d789e9b4fe983d883da573e.jpg?sha=fbe59eb983bd7b16',
//       content: 'TEXT TEXT TEXT TEXT',
//       date: '12th August',
//       readingTime: 8,
//       likes: 293,
//       comments: [
//         {name: 'Sophie', content: 'Wow I never knew'},
//         {name: 'Laura', content: 'Thanks for sharing. Check out my blog!'}
//       ]
//     },
//     {
//       title: '30 Days to Zero-Waste, a guide to more conscious living',
//       subtitle: 'Going zero waste…',
//       authorName: 'The Eco Edit',
//       image: 'http://www.theecoedit.co.uk/wp-content/uploads/2018/02/3.jpg',
//       content: 'TEXT TEXT TEXT TEXT',
//       date: '2nd September',
//       readingTime: 6,
//       likes: 201
//     },
//     {
//       title: 'At Harrods, Vetements Calls Out The Fashion Industry On Overproduction',
//       subtitle: 'Unveiled today, Vetements is taking over four Harrods windows to create awareness around the corporate overproduction the brand’s co-founder Guram Gvasalia says is destroying fashion and its surrounding world.',
//       authorName: 'Vogue',
//       image: 'http://img3.hungertv.com/wp-content/uploads/2018/02/VETEMENTS-SAKS--980x551.jpg',
//       content: 'TEXT TEXT TEXT TEXT',
//       date: '8th July',
//       readingTime: 12,
//       likes: 453
//     }
//   ])
//   .then(posts => console.log(`created ${posts.length} posts`))
//   .catch(err => console.log(err))
//   .finally(() => mongoose.connection.close());
