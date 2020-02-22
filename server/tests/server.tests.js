const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server.js');
const {todo} = require('../models/todos.js');
const {User} = require('../models/users.js');
const {loadTodoData, populateTodos, loadUserData, populateUsers} = require('./seed/seed.js');


beforeEach(populateTodos);
beforeEach(populateUsers);

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
    .expect(400)
    .expect((res)=>{
      expect(res.body.errorMessage).toBe('Id incorrect');
    })
    .end(done);
  });
});

describe('DELETE /todos/:id', ()=>{
  it('should delete a todo', (done)=>{
    request(app)
    .delete(`/todos/${loadTodoData[0]._id}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(loadTodoData[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done)=>{
    request(app)
    .delete('/todos/123234')
    .expect(404)
    .expect((res)=>{
      expect(res.body.errorMessage).toBe('Id incorrect');
    })
    .end(done);
  });

  it('should return 404 if object id is invalid', (done)=>{
    request(app)
    .delete('/todos/6e2b6669c908bb04f47a186a')
    .expect(404)
    .expect((res)=>{
      expect(res.body.errorMessage).toBe('Data not found');
    })
    .end(done);
  });
});

describe('PATCH /todos/:id', ()=>{
  it('should update the todo', (done)=>{
    request(app)
    .patch(`/todos/${loadTodoData[0]._id}`)
    .send({
      text: 'test update1',
      completed: true
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('test update1');
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('should clear compltedAt when todo is not completed', (done)=>{
    request(app)
    .patch(`/todos/${loadTodoData[1]._id}`)
    .send({
      text: 'test update2',
      completed: false
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('test update2');
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});

describe('GET /users/me', ()=>{
  it('should return user when authenticated', (done)=>{
    request(app)
    .get('/users/me')
    .set('x-auth', loadUserData[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body._id).toBe(loadUserData[0]._id.toHexString());
      expect(res.body.email).toBe(loadUserData[0].email);
    })
    .end(done);
  });

  it('should return 401 when not authenticated', (done)=>{
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res)=>{
      expect(res.body.error).toBe('Access token not provided');
    })
    .end(done);
  });
});

describe('POST /users', ()=>{
  it('should create a user', (done)=>{
    var email = 'sample321@gmail.com';
    var password = 'userpass123';
    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res)=>{
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end((err)=>{
      if(!err){
        return done(err);
      }
      User.findOne({email}).then((user)=>{
        expect(user).toExist();
        expect(user.password).toNotBe(password);
        done();
      })
    });
  });

  it('should return validation errors if user is invalid', (done)=>{
    request(app)
    .post('/users')
    .send({
      email: 'nfeofn',
      password: 'abc123'
    })
    .expect(400)
    .end(done);
  });

  it('should not create user if email is in use', (done)=>{
    request(app)
    .post('/users')
    .send({
      email: loadUserData[0].email,
      password: 'abc123'
    })
    .expect(400)
    .end(done);
  })
});
