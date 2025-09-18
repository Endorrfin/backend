# POSTS SERVICE
## ► CONTENT
___

### ▸ `Server NodeJS` 
### ▸ `DB PostgreSQL`
### ▸ `UI ReactJS`

___

#### ✦ Implemented features
[1. ✓ Registration]() <br/>
[2. ✓ Authentication & Authorization]() <br/>
[3. ✓ Creating, editing, and deleting posts]() <br/>
[4. ✓ Searching, filtering & sorting posts, group by user]() <br/>

___

🟩  RUN APP

⬛️ Server

cd posts-service

npm install

npm start   # Production mode

npm run dev     # Development mode


⬜️ Frontend

cd posts-service/ui

npm install

npm start

___


⬛️ FILE STRUCTURE SERVER (NodeJS)
posts-service/
|__src/
|	|
|	|── services/
|	|	|
|	|	|── auth.service.ts
|	|	|── jwt.service.ts
|	|	|── user.service.ts
|	|	|── post.service.ts
|	|
|	|── controllers/
|	|	|
|	|	|── auth.controller.ts
|	|	|── user.controller.ts
|	|	|── post.controller.ts
|	|
|	|── routes/
|	|	|
|	|	|── auth.routes.ts
|	|	|── user.routes.ts
|	|	|── post.routes.ts
|	|
|	|── middleware/
|	|	|
|	|	|── auth.middleware.ts
|	|	|── validation.middleware.ts
|	|
|	|── models/
|	|	|
|	|	|── index.ts
|	|	|── refresh-token.models.ts
|	|	|── user.model.ts
|	|	|── notes-page.model.ts
|	|	|── post.model.ts
|	|
|	|── types/
|	|	|
|	|	|── index.ts
|	|	|── auth.types.ts
|	|	|── user.types.ts
|	|	|── notes.types.ts
|	|	|── post.types.ts
|	|
|── shared/
|	|
|	|── constants/
|	|	|── user-roles.ts
|	|
|	|── database/
|	|	|── migration/
|	|	|   |
|	|	|   |── 001-create-users-table.js
|	|	|   |── 002-create-refresh-tokens-table.js
|	|	|   |── 003-create-posts-table.js
|	|	|
|	|	|── seeders/
|	|	|   |
|	|	|   |── 001-admin-user.js
|	|	|
|	|	|── config.js
|	|
|	|── utils/
|	|	|── logger.ts
|	|	|── response.ts
|	|	|── validator.ts
|	|
|── tests/
|	|	|── auth.test.js
|	|	|── setup.js
|	|
|	|── .prettierrc
|	|── app.ts
|
|── .env
|── .sequelizerc
|── .gitignore
|── package.json
|── package-lock.json
|── eslint.config.js
|── tsconfig.json
|── ui/




⬜️ FILE STRUCTURE UI (ReactJS)
ui/
|
|── public/
|	|
|	|── index.html
|
|── src/
|	|
|	|── service/
|	|	|
|	|	|── api.ts
|	|	|── auth.service.ts
|	|	|── post.service.ts
|	|
|	|── components/
|	|	|
|	|	|── Layout/
|	|	|	|
|	|	|	|── Header.tsx
|	|	|	|── Layout.tsx
|	|	|
|	|	|── Posts/
|	|	|	|
|	|	|	|── PostForm.tsx
|	|	|	|── PostList.tsx
|	|	|
|	|	|── PrivateRoute.tsx
|	|	|── LoadingSpinner.tsx
|	|
|	|── contexts/
|	|	|
|	|	|── AuthContext.tsx
|	|
|	|── pages/
|	|	|
|	|	|── Register.tsx
|	|	|── Login.tsx
|	|	|── Dashboard.tsx
|	|	|── Profile.tsx
|	|
|	|── types/
|	|	|
|	|	|── index.ts
|	|	|── api.types.ts
|	|	|── auth.types.ts
|	|	|── form.types.ts
|	|	|── post.types.ts
|	|	|── react-hot-toast.d.ts
|	|
|	|── utils/
|	|	|
|	|	|── constants.ts
|	|	|── helpers.ts
|	|	|── validation.ts
|	|
|	|── App.tsx
|	|── index.ts
|	|── index.css
|	|── react-app-env.d.ts
|
|── .env
|── package.json
|── tsconfig.json







