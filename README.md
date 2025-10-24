# 👥 Users Directory

Application React **Niveau 4+** : Annuaire d'utilisateurs avec recherche, tri, favoris et thème sombre.

## ✅ Fonctionnalités

- 🔍 **Recherche** en temps réel (nom, email, username)
- 🔀 **Tri** par nom ou âge
- 📄 **Pagination** (10 users/page)
- ⭐ **Favoris** avec persistance localStorage
- 🌓 **Thème** clair/sombre
- 🎁 **Filtres avancés** (âge, entreprise, ville)
- 📱 **Design responsif** avec glassmorphisme
- ⚡ **Optimisé** (useMemo, React.memo, ErrorBoundary)
- 🧪 **Tests** (42 tests Vitest - 100% passing)
- 🔔 **Notifications** avec react-hot-toast

## 🚀 Démarrage

```bash
npm install          # Installation
npm run dev          # Développement (http://localhost:5173)
npm run build        # Production
npm run lint         # ESLint
npm test             # Tests Vitest
```

## 📁 Structure

```
src/
├── components/       # UserCard, AdvancedFilters, ErrorBoundary
├── pages/           # UserListPage, UserDetailPage, FavoritesPage
├── hooks/           # useUsers (logique métier)
├── context/         # ThemeContext
├── utils/           # userService (search, sort, filter)
└── types/           # TypeScript interfaces
```

## 📋 Technologies

| Stack | Version |
|-------|---------|
| React | 19.1.1 |
| TypeScript | 5.9.3 |
| Vite | 7.1.7 |
| Vitest | 2.1.9 |
| React Router | 7.9.4 |
| React Hot Toast | 2.4.1 |

## 🎯 Objectifs (Exam)

- ✅ Niveau 1: Liste + détail + Router
- ✅ Niveau 2: Recherche + tri + pagination
- ✅ Niveau 3: Favoris + thème + optimisations
- ✅ Niveau 4: Custom hook + ErrorBoundary + mode offline
- ✅ Bonus: Toast + tests Vitest complets

## 📊 Résultats Tests

```
✓ 42 tests passed (100%)
✓ Build: 256 KB → 81.58 KB (gzipped)
✓ Production ready
```

## 🔧 Hook Principal

```typescript
const {
  users, filteredUsers, loading, error,
  search, setSearch,
  sortBy, setSortBy,
  favorites, toggleFavorite,
  currentPage, setCurrentPage,
  totalPages, retry
} = useUsers();
```

## 📦 API

```
GET https://dummyjson.com/users?limit=30&skip=0
GET https://dummyjson.com/users/{id}
```

## 💡 Notes

- **Offline Mode**: Les favoris s'affichent même si l'API est down
- **localStorage**: Favoris + Thème persistants
- **Performance**: useMemo pour search/sort, React.memo pour composants

## 📄 Licence

Projet éducatif 2024

# 👥 Users Directory - Application Dynamique

Une application React moderne et performante affichant une liste dynamique d'utilisateurs avec recherche, tri, pagination et favoris persistants.

## [*] Objectifs Atteints (Niveau 4 + Bonus)

### [+] Niveau 1 - Base dynamique et structurée
- [x] Affichage liste utilisateurs depuis API dummyjson
- [x] Affichage détail utilisateur au clic
- [x] 3+ composants (UserCard, UserListPage, UserDetailPage)
- [x] React Router (/ et /user/:id)
- [x] État de chargement et gestion erreurs

### [+] Niveau 2 - Interactivité et navigation
- [x] Recherche temps réel (nom, prénom, email)
- [x] Tri par nom ou âge
- [x] Pagination 10 utilisateurs/page
- [x] Gestion erreurs avec try/catch

### [+] Niveau 3 - Application complète et UX évoluée
- [x] Système de favoris avec localStorage
- [x] Thème clair/sombre avec Context API
- [x] Tri dynamique via select dropdown
- [x] Spinner et skeleton loading
- [x] Messages d'erreur stylisés avec bouton retry
- [x] Optimisation avec useMemo
- [x] Transitions CSS (fade-in, hover)

### [+] Niveau 4 - Projet abouti et professionnel
- [x] Custom hook `useUsers()` centralisé
- [x] Optimisations avancées (useCallback, React.memo, ErrorBoundary)
- [x] Pagination serveur (limit/skip)
- [x] Mode hors ligne (affiche favoris)
- [x] Page 404 pour utilisateurs inexistants

### 🎁 Bonus
- [x] Notifications toast avec react-hot-toast
- [ ] Tests unitaires Vitest (à implémenter)
- [ ] Déploiement Vercel (à configurer)

## 📋 Technologies

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **API**: DummyJSON
- **Styling**: CSS3 (modular par composant)
- **Notifications**: React Hot Toast
- **Testing**: Vitest (optionnel)

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ErrorBoundary.tsx
│   ├── Layout.tsx
│   ├── Loader.tsx
│   ├── UserCard.tsx
│   └── *.css
├── context/             # Context API
│   └── ThemeContext.tsx
├── hooks/               # Custom hooks
│   └── useUsers.ts
├── pages/               # Pages/Routes
│   ├── UserListPage.tsx
│   ├── UserDetailPage.tsx
│   ├── NotFoundPage.tsx
│   └── *.css
├── types/               # TypeScript types
│   └── index.ts
├── utils/               # Fonctions utilitaires
│   └── userService.ts
├── App.tsx              # Composant principal
├── main.tsx             # Point d'entrée
└── index.css            # Styles globaux
```

## 🚀 Démarrage Rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application s'ouvrira à `http://localhost:5173`

### Build Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 🔑 Fonctionnalités Principales

### 📱 Recherche et Filtrage
- Recherche en temps réel par nom, prénom, email ou username
- Résultats mis à jour instantanément

### 🔀 Tri Dynamique
- Tri par nom (A-Z)
- Tri par âge (croissant)
- Option "Pas de tri"

### 📄 Pagination
- 10 utilisateurs par page
- Boutons navigation Previous/Next
- Indicateur page actuelle

### [*] Système de Favoris
- Clic sur l'étoile pour ajouter/retirer des favoris
- Persistance via localStorage
- Sauvegarde automatique

### 🌓 Thème Clair/Sombre
- Toggle theme en haut à droite
- Persistance via localStorage
- Transition fluide entre les thèmes

### 📊 Détails Utilisateur Complets
- Informations personnelles (âge, genre, date de naissance)
- Informations professionnelles (entreprise, département, titre)
- Adresse complète (rue, ville, état, pays, code postal)
- Informations physiques (taille, poids, groupe sanguin)

### ⚡ Optimisations
- **React.memo**: Mémorisation composants
- **useCallback**: Prévention re-rendus inutiles
- **useMemo**: Optimisation filtrage/tri
- **ErrorBoundary**: Capture erreurs React
- **Code Splitting**: Via React Router

### 🔌 Mode Hors Ligne
- Affichage des favoris si l'API est inaccessible
- Gestion gracieuse des erreurs réseau

## 🛠️ Custom Hook `useUsers()`

Point central de la logique métier:

```typescript
const {
  users,              // Utilisateurs paginés actuels
  filteredUsers,      // Tous les utilisateurs filtrés
  loading,            // État du chargement
  error,              // Message d'erreur
  search,             // Terme de recherche
  setSearch,          // Mettre à jour recherche
  sortBy,             // Type de tri
  setSortBy,          // Mettre à jour tri
  favorites,          // IDs des favoris
  toggleFavorite,     // Ajouter/retirer favoris
  currentPage,        // Page actuelle
  setCurrentPage,     // Changer page
  totalPages,         // Nombre total de pages
  retry,              // Réessayer le chargement
} = useUsers();
```

## 📦 API Integration

### Endpoints utilisés:

```
GET https://dummyjson.com/users?limit=30&skip=0
GET https://dummyjson.com/users/{id}
```

### Paramètres serveur:
- `limit`: Nombre d'utilisateurs à récupérer (max 30)
- `skip`: Nombre d'utilisateurs à ignorer (pagination serveur)

## 🎨 Design System

### Couleurs
- **Primaire**: #667eea (Bleu indigo)
- **Secondaire**: #764ba2 (Violet)
- **Succès**: #4caf50 (Vert)
- **Erreur**: #c33 (Rouge)
- **Neutre**: #2c3e50 (Gris foncé)

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📝 Notes de Développement

### Performance
- La recherche et le tri utilisent `useMemo` pour éviter recalculs inutiles
- Les composants enfants sont wrappés avec `React.memo`
- Les callbacks sont mémorisées avec `useCallback`

### État Global
- Thème: Context API + localStorage
- Favoris: localStorage
- Utilisateurs: Hook local (re-fetch à chaque visite)

### Gestion Erreurs
- ErrorBoundary pour les erreurs React
- Try/catch pour les appels API
- Messages d'erreur utilisateur-friendly

## 🔮 Améliorations Futures

1. **Tests Unitaires**: Implémenter suite Vitest complète
2. **Favoris Page**: Page dédiée aux utilisateurs favoris
3. **Filtres Avancés**: Par ville, entreprise, groupe sanguin
4. **Pagination Serveur**: Implémenter skip/limit côté serveur
5. **Persistance BD**: Ajouter backend pour stocker favoris
6. **Dark Mode Auto**: Détecter préférence système
7. **Animations**: Framer Motion pour animations avancées

## 📞 Support

Pour toute question ou problème, vérifiez:
1. Les logs de la console du navigateur
2. Le statut de l'API DummyJSON
3. La connexion internet

## 📄 Licence

Projet éducatif - Université 2024

---

**Dernière mise à jour**: Octobre 2024
**Auteur**: Tom
**Statut**: Phase de développement ⚙️

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
