<!-- # Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->

Application Mobile AZ French

Réalisée par : Hanan Ragban
Sommaire

1. Mise en situation
   1.1 Contexte de l’apprentissage du français chez les enfants
   1.2 Limites des méthodes traditionnelles et du logiciel AZ 1.0.0
   1.3 Évolution des usages vers le mobile
   1.4 Difficultés identifiées
2. Solution proposée : AZ French
3. Objectifs de l’application AZ French
4. La cible
5. Fonctionnalités principales
   5.1 Authentification et gestion des utilisateurs
   5.2 Modules d’apprentissage inspirés d’AZ 1.0.0
   5.3 Backend et base de données
   5.4 Interface mobile
   5.5 Gestion de l’état
   5.6 Sécurité et bonnes pratiques
   5.7 Déploiement et maintenance
6. Technologies utilisées
7. Architecture de l’application
8. Planning prévisionnel

9. Mise en situation
   • L’apprentissage des langues, en particulier du français, représente un défi pour de nombreux enfants. Les méthodes traditionnelles, basées sur des supports papier ou des logiciels desktop, manquent souvent d’interactivité et de dynamisme, ce qui peut réduire l’engagement des jeunes apprenants.
   • Le logiciel desktop AZ 1.0.0 a été développé pour faciliter l’apprentissage du français de manière structurée. Cependant, son utilisation reste limitée : il nécessite un ordinateur, n’offre pas suffisamment d’activités ludiques et ne permet pas un suivi détaillé de la progression des enfants.
   • Aujourd’hui, les enfants utilisent de plus en plus les smartphones et les tablettes pour apprendre et se divertir. Cette évolution des usages nécessite une adaptation des outils pédagogiques vers des solutions mobiles, interactives et engageantes.
   Les principales difficultés identifiées sont :
   • Accessibilité limitée : L’outil actuel n’est pas disponible sur mobile, ce qui restreint son utilisation dans des contextes modernes d’apprentissage.
   • Manque d’interactivité : Les activités proposées sont peu ludiques et ne captent pas suffisamment l’attention des enfants.
   • Suivi des progrès insuffisants : Les parents et enseignants n’ont pas d’outil efficace pour suivre l’évolution des compétences de chaque enfant.
   • Adaptation aux besoins modernes : Les enfants sont habitués aux interfaces intuitives et interactives ; un outil statique ou complexe ne correspond plus à leurs attentes.

2.Solution
AZ French est une application mobile éducative destinée aux enfants pour faciliter l’apprentissage de la langue française de manière interactif et motivante. L’objectif est de rendre l’apprentissage du français accessible, structuré et stimulant, en adaptant les méthodes pédagogiques aux besoins et au rythme de chaque enfant.

2. Objectifs du AZ French
   • Facilite l’apprentissage du français de manière ludique et interactive.
   • Suive la progression de chaque enfant et adapte les exercices à son niveau.
   • Offre une expérience utilisateur intuitive et sécurisée.
   • Permette aux enfants d’apprendre partout et à tout moment.
   • Stimule l’engagement et la motivation grâce à des activités variées et attractives.
3. La cible
   • Enfants de 4 à 7 ans, apprenant le français.
   • Parents et enseignants, pour suivre la progression et accompagner l’apprentissage.
4. Fonctionnalités principales
   4.1 Authentification et gestion des utilisateurs
   • Profils enfants et parents
   • Suivi de la progression individuelle.
   • Sécurité avec JWT et stockage sécurisé des tokens.
   4.2 Modules d’apprentissage inspirés d’AZ 1.0.0
   • Vocabulaire illustré : mots avec images et sons.
   • Grammaire et phrases : exercices adaptés aux enfants.
   • Jeux éducatifs : memory, quiz, puzzles.
   • Suivi et gamification : scores, niveaux, badges et récompenses.
   4.3 Backend et base de données
   • API REST sécurisée avec Node.js et Express.js.
   • Base de données SQL ou NoSQL pour utilisateurs, modules et progression.
   • ORM : Sequelize, Prisma ou TypeORM.
   • Validation et protection contre les injections SQL.
   4.4 Interface mobile
   • Développement avec React Native + Expo.
   • Navigation intuitive (React Navigation ou Expo Router).
   • Design coloré et attractif pour enfants.
   • Écrans principaux : accueil, modules, cours, exercices, profil.
   • Notifications pour encourager la pratique quotidienne.
   4.5 Gestion de l’état
   • Utilisation de Zustand pour l’état global et persistant.
   • Optimisation des performances et des re-renders.
   4.6 Sécurité et bonnes pratiques
   • Hash des mots de passe avec bcrypt.
   • Protection des routes sensibles avec middleware.
   • Validation des données entrantes (Joi/Zod/express-validator).
   • Stockage sécurisé via Expo SecureStore.
   4.7 Déploiement et maintenance
   • Conteneurisation avec Docker.
   • Déploiement sur Railway, Render ou autre cloud.
   • Mise à jour OTA via Expo Updates.

5. Technologies utilisées
   • Frontend mobile : React Native, Expo, Zustand, Axios
   • Backend : Node.js, Express.js, TypeScript, ORM (Sequelize/TypeORM)
   • Base de données : PostgreSQL
   • Sécurité : JWT, bcrypt, validation des données
   • DevOps : Docker, cloud (Railway/Render)
   • UX/UI : design attractif, interface enfantine et intuitive

6. Architecture de l’application
7. Frontend mobile : écrans interactifs, navigation et gamification.
8. Backend : API REST sécurisée, gestion utilisateurs et progression.
9. Base de données : stockage des utilisateurs, modules, jeux et scores.
10. Services complémentaires : notifications push, stockage sécurisé, synchronisation des données.

11. Planning prévisionnel
12. Phase 1 : Analyse et conception – Cahier des charges, diagrammes UML, schéma base de données.
13. Phase 2 : Backend – API REST, authentification, sécurisation, tests unitaires.
14. Phase 3 : Frontend mobile – Écrans, navigation, intégration API, design UX/UI.
15. Phase 4 : Tests et optimisation – Tests fonctionnels, corrections bugs, optimisation performance.
16. Phase 5 : Déploiement et maintenance – Docker, cloud, mises à jour OTA.
