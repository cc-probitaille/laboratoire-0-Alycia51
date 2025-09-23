import 'jest-extended';
import request from 'supertest';
import app from '../../src/app';

describe('redemarrerJeu après avoir créé un joueur', () => {
  const testNom = 'TestJoueur';

  beforeAll(async () => {
    // Créer un joueur
    await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: testNom });
    
    // Redémarrer le jeu pour supprimer tous les joueurs
    await request(app)
      .get('/api/v1/jeu/redemarrerJeu');
  });

  it('devrait retourner 404 quand on essaie de jouer après redemarrerJeu', async () => {
    const response = await request(app)
      .get('/api/v1/jeu/jouer/' + testNom);
    
    expect(response.status).toBe(404);
  });
});