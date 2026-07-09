const request = require('supertest');
const bcrypt = require('bcrypt');

// On mocke le module de connexion PostgreSQL pour que les tests
// n'aient besoin d'aucune vraie base de données, et pour éviter
// la boucle "connectWithRetry" qui tournait après la fin des tests.
jest.mock('../src/config/db', () => ({
  query: jest.fn(),
}));

const app = require('../src/app'); // app Express (sans .listen()), PAS server.js
const db = require('../src/config/db');

describe('Auth API', () => {
  const plainPassword = 'password123';
  const passwordHash = bcrypt.hashSync(plainPassword, 10);

  const mockUser = {
    id: 1,
    full_name: 'Test User',
    username: 'testuser',
    email: 'test@exemple.com',
    password: passwordHash,
    role: 'employee',
  };

  beforeEach(() => {
    db.query.mockReset();
  });

  it('should login with valid credentials', async () => {
    // findByEmail() fait un SELECT unique -> on simule qu'il trouve l'utilisateur
    db.query.mockResolvedValueOnce({ rows: [mockUser] });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: mockUser.email, password: plainPassword });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject login with wrong password', async () => {
    // Utilisateur trouvé, mais mot de passe incorrect -> 401 (comportement réel du controller)
    db.query.mockResolvedValueOnce({ rows: [mockUser] });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: mockUser.email, password: 'mauvais-mot-de-passe' });

    expect(res.status).toBe(401);
  });

  it('should return 404 for an unknown email', async () => {
    // Aucun utilisateur trouvé -> 404 (comportement réel du controller)
    db.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'inconnu@exemple.com', password: 'peu-importe' });

    expect(res.status).toBe(404);
  });
});