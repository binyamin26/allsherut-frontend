# TODO France — dépend de l'URL du backend France

À traiter **quand l'URL du backend France est connue** (hébergement non décidé
au 2026-10-06). Ne rien déployer ni modifier avant.

Aujourd'hui, ces points renvoient encore vers le backend d'Israël
(`homesherut-backend.fly.dev`, app Fly de la prod israélienne).

## 1. Variable d'environnement (à définir une fois l'URL connue)

- `VITE_API_URL=https://<backend-france>/api` (`/api` inclus), dans les
  variables d'environnement du **projet Vercel France** (lue au build).
- En production, `src/services/api.js` lève une erreur explicite si elle manque.
  En dev, le proxy Vite `/api` est utilisé (`.env.local` : `VITE_API_URL=/api`).

## 2. `vercel.json` — rewrites vers Israël

- `/api/:path*` → `https://homesherut-backend.fly.dev/api/:path*` (ligne ~21)
- `/sitemap-providers.xml` → `https://homesherut-backend.fly.dev/sitemap-providers.xml` (ligne ~25)

Risque : plusieurs fichiers retombent sur `/api` quand `VITE_API_URL` est absente
(`AuthModal.jsx`, `AuthContext.jsx`, `RecruitmentListingDetailPage.jsx`,
`RecruitmentServicePage.jsx`) ; sur Vercel ce chemin passe par le rewrite, donc
par le backend d'Israël. Remplacer les destinations par l'URL du backend France.

## 3. URLs d'images codées en dur (affichage uniquement)

Remplacer le domaine par une base dérivée de `VITE_API_URL` (sans `/api`) :

- `src/components/cards/ProviderCard.jsx` (l. 47, 54)
- `src/components/recruitment/JobListingCard.jsx` (l. 81)
- `src/context/AuthContext.jsx` (l. 321)
- `src/pages/DashboardPage.jsx` (l. 1770)
- `src/pages/ProviderDetailPage.jsx` (l. 1774, 2009 : repli `|| 'https://homesherut-backend.fly.dev'`)
- `src/pages/ReviewRequestPage.jsx` (l. 14)

Aussi : commentaire obsolète `AuthModal.jsx` l. 978 (mentionne fly.dev).

## 4. Autres

- `backend/fly.toml` pointe sur l'app Fly d'Israël (`homesherut-backend`) : ne
  pas déployer depuis ce dossier tant que la cible France n'est pas définie.
- Comparer `SHOW CREATE TABLE trial_history` sur la base Israël avec la
  définition ajoutée à `server.js` / `schema-unified.sql` (index/types éventuels).
- `RESEND_API_KEY` absent du `backend/.env` local : le backend ne démarre pas
  sans (variable factice suffisante en local).
