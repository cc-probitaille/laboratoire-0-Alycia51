import { assert } from 'console';
import 'jest-extended';
import request from 'supertest';
import app from '../../src/app';

describe('redemarrerJeu.test.ts', () => {
  
  describe('GET /api/v1/jeu/redemarrerJeu', () => {
    
    beforeAll(async () => {
      // Créer deux joueurs pour satisfaire la précondition du cas d'utilisation
      await request(app)
        .post('/api/v1/jeu/demarrerJeu')
        .send({ nom: 'Joueur1' });
      
      await request(app)
        .post('/api/v1/jeu/demarrerJeu')
        .send({ nom: 'Joueur2' });
    });

    it('devrait redémarrer le jeu avec succès (scénario principal)', async () => {
      const response = await request(app)
        .get('/api/v1/jeu/redemarrerJeu');
      
      // Valider le succès de l'opération
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
    });

    it('devrait valider la postcondition - il ne devrait plus y avoir de joueurs', async () => {
      // Appeler redémarrerJeu
      await request(app)
        .get('/api/v1/jeu/redemarrerJeu');
      
      // Vérifier qu'il n'y a plus de joueurs
      const response = await request(app)
        .get('/api/v1/jeu/obtenirJoueurs');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  it("devrait implémenter test", async () => {
    throw new Error("Ce test n'a pas été défini")
  });
});