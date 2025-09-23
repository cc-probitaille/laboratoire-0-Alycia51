import 'jest-extended';
import request from 'supertest';
import app from '../../src/app';

describe('redemarrerJeu.test.ts', () => {
  const testNom = 'TestJoueur';

  beforeAll(async () => {
    // Créer un joueur pour préparer le test
    await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: testNom });
  });

  it('devrait redemarrer le jeu avec succès', async () => {
    const response = await request(app)
      .get('/api/v1/jeu/redemarrerJeu');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Success');
    expect(response.body.resultat.message).toBe(
      "Le jeu a été redémarré. Tous les joueurs ont été supprimés."
    );
  });

  it('devrait valider qu\'il ne reste plus de joueurs après redemarrerJeu', async () => {
    // Appeler redemarrerJeu pour s'assurer que la Map est vide
    await request(app).get('/api/v1/jeu/redemarrerJeu');

    // Vérifier qu'il n'y a plus de joueurs
    const response = await request(app).get('/api/v1/jeu/obtenirJoueurs');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); 
  });

  it('devrait retourner 404 quand on essaie de jouer après redemarrerJeu', async () => {
    // Essayer de jouer avec le joueur créé avant le redémarrage
    const response = await request(app).get(`/api/v1/jeu/jouer/${testNom}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(`Joueur ${testNom} non trouvé`);
  });
});
