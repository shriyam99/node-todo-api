const expect = require('expect');
const request = require('supertest');

const {app} = require('../server.js');
const {todo} = require('../models/todos.js');

beforeEach((done)=>{                    //mocha function runs before testing application
  todo.remove({}).then(()=>{
    todo.insertMany([{
      text: 'first test case'
    }, {
      text: 'Second test case'
    }]).then(()=>done());
  });
});

describe('POST /todos', ()=>{
  it('should work as expected', (done)=>{
    var text = 'working hard';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res)=>{
      if(err)
        return done(err);
      todo.find().then((todos)=>{
        expect(todos.length).toBe(3);
        expect(todos[2].text).toBe(text);
        done();
      }).catch((err)=>done(err));
    });
  });

  it('should not put data in database', (done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res)=>{
      if(err)
        return done(err);
      todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      })
    });
  });
});


describe('GET /todos', ()=>{
  it('should check if data is added', (done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body['todos'].length).toBe(2);
    })
    .end(done);
  });
})
