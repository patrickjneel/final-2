const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.locals.title = 'Final-2';

app.get('/', (request,response) => {
  response.send('Welcome')
});

app.get('/api/v1/items', (request, response) => {
  database('items').select()
    .then(items => {
      return response.status(200).json(items)
    })
    .catch(error => {
      return response.status(500).json({ error })
    })
})

app.post('/api/v1/items', (request, response) => {
  const item = request.body;

  for (let requiredParameter of ['name']) {
    if (!item[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the one required field ${requiredParameter}`
      })
    }
  }
  database('items').insert(item, 'id')
    .then(item => {
      return response.status(201).json({ id: item[0]})
    })
    .catch(error => {
      return response.status(500).json({ error })
    })
})

app.delete('/api/v1/items/:id', (request,response) => {
  const id = request.params;
  database('items').where(id).del()
  .then(item => {
    if(!item) {
      response.status(422).json({error: 'No item exists'})
    } else {
      response.status(200).json({status: 'success'})
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

module.exports = app;

