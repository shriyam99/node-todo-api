const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server.js');
const {todo} = require('../models/todos.js');

var loadTodoData =  [{
  _id: new ObjectID(),
  text: 'first test case'
}, {
  _id: new ObjectID(),
  text: 'Second test case'
}];

beforeEach((done)=>{                    //mocha function runs before testing application
  todo.remove({}).then(()=>{
    todo.insertMany(loadTodoData).then(()=>done());
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


describe('GET todos/:id', ()=>{
  it('should return todo doc', (done)=>{
    request(app)
    .get(`/todos/${loadTodoData[0]._id}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.text).toBe(loadTodoData[0].text);
    })
    .end(done);
  });

  it('should return 404 not found', (done)=>{
    request(app)
    .get(`/todos/${new ObjectID()}`)
    .expect(404)
    .expect((res)=>{
      expect(res.body.errorMessage).toBe('Data not found');
    })
    .end(done);
  });

  it('should return 404 id incorrect', (done)=>{
    request(app)
    .get(`/todos/e2b63fec457ae298886d4a3`)
    .expect(404)
    .expect((res)=>{
      expect(res.body.errorMessage).toBe('Id incorrect');
    })
    .end(done);
  });
})
