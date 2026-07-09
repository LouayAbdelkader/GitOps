// Variables d'environnement nécessaires pour les tests.
// Ce fichier ne modifie rien dans l'application : il fournit juste
// les valeurs que l'app lit normalement depuis process.env (JWT_SECRET, etc.)
// afin que les tests unitaires puissent tourner sans .env ni vraie infra.

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';