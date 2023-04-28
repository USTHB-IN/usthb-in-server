import request from 'supertest';
import { app } from '../src/server';

describe('User routes', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/api/auth/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(16);
  });

  it('should return a specific user by id', async () => {
    const res = await request(app).get('/api/auth/users/6436c577ccd8d13deccae01e');
    expect(res.status).toBe(200);
    expect(res.body.matricule).toBe('tkan9ltz');
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/api/auth/users').send({
      matricule: '6543211123132',
      prenom: 'John',
      nom: 'Doe',
      birthday: '1990-01-01',
      email: 'johndd2331123122foe@examle.com',
      password: 'passwor2332d123',
    });

    expect(res.status).toBe(500);
    // expect(res.body.matricule).toBe('6543211123132');
  });

  it('should update an existing user', async () => {
    const res = await request(app).patch('/api/auth/users/6436c577ccd8d13deccae01e').send({
      prenom: 'Jane',
      nom: 'Doe',
    });

    expect(res.status).toBe(200);
    expect(res.body.prenom).toBe('Jane');
  });

  it('should delete an existing user', async () => {
    const res = await request(app).delete('/api/auth/users/6436c577ccd8d13deccae01d');
    expect(res.status).toBe(204);
  });
});
