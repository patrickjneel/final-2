process.env.NODE_ENV = 'test'

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Side Routes', () => {

  it('should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.includes('Major Toms Mars List')
      response.text.should.match(/class="add-btn"/)
    })
    .catch(error => {
      throw error;
    })
  })

  it('should return a 404 if the homepage can not be found', () => {
    return chai.request(server)
    .get('/notthere')
    .then(() => {
    })
    .catch(error => {
      response.should.have.status(404)
    })
  })
})

describe('API Endpoints', () => {

  it('should get all of the items', () => {
    return chai.request(server)
    .get('/api/v1/items')
    .then(response => {
      response.should.have.status(200)
      response.should.be.json;
      response.body.should.be.a('array')
      response.body.length.should.equal(3)
      response.body[0].should.have.property('id')
      response.body[0].should.have.property('name')
    })
    .catch(error => {
      throw error;
    })
  })
})
