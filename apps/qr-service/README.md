



🟫 RESTful API Design

// Web Pages API
GET    /api/v1/pages           // List user's web pages
POST   /api/v1/pages           // Create new web page
GET    /api/v1/pages/:id       // Get specific web page
PUT    /api/v1/pages/:id       // Update web page
DELETE /api/v1/pages/:id       // Delete web page
POST   /api/v1/pages/:id/publish // Publish web page

// QR Codes API
POST   /api/v1/qr-codes        // Generate QR code for web page
GET    /api/v1/qr-codes/:id    // Get QR code details
PUT    /api/v1/qr-codes/:id    // Update QR code settings

// Orders API
POST   /api/v1/orders          // Create new order
GET    /api/v1/orders          // List user's orders
GET    /api/v1/orders/:id      // Get order details
PUT    /api/v1/orders/:id      // Update order status





ℹ️ INTEGRATION STRIPE
💰💵 STRIPE
API keys
Publishable key: pk_test_51S3nleH5p7EUmVB1TLvgDbVf6eOLKNvOA4hSCod0VXu5N0vOEvdAF4fJU5lQlUYr9dJfy4krUEzedh97hMYmlDED00jLY0Fuwc
Secret key: sk_test_51S3nleH5p7EUmVB1RCCa2wfCxVxo3G2onvUmZVyssEfcVtd6NE4epS4fa8Gn6jQSpjOuMzjPwUdHOSXBt1RBq4Yx00HjT2AXPR
Test cards: 4242424242424242

# Install Stripe CLI on macbook for testing webhooks locally
brew install stripe/stripe-cli/stripe

(base) vk stripe login
Your pairing code is: scenic-fair-nicely-mercy
This pairing code verifies your authentication with Stripe.
Press Enter to open the browser or visit https://dashboard.stripe.com/stripecli/confirm_auth?t=xD4DpGoHSl8Dk9B1zuBP28RwU6HBKanm (^C to quit)

Stripe CLI to access your account information?
roomy-easier-snappy-work

⚠️ Important Notes:
Stripe Dashboard: Create your products and prices in Stripe first
Test Mode: Use Stripe test mode for development
Webhooks: Essential for syncing subscription status
Credits: Applied to customer's Stripe balance for next invoice
Downgrade Timing: Takes effect at period end to avoid complexity

The system now handles all the complex scenarios you specified, including mid-cycle proration, usage validation, and proper credit calculations!

🌐 STRIPE DASHBOARD
https://dashboard.stripe.com/test/dashboard

(base) vk stripe --version
stripe version 1.30.0
(base) vk stripe login
Your pairing code is: grin-eager-refine-humane
This pairing code verifies your authentication with Stripe.
Press Enter to open the browser or visit https://dashboard.stripe.com/stripecli/confirm_auth?t=Jpp3hmmjtlRPcZTMw3flJz2c5m1k8D6Y (^C to quit)
> Done! The Stripe CLI is configured for Leonid Kirnadz sandbox with account id acct_1S3nleH5p7EUmVB1

Please note: this key will expire after 90 days, at which point you'll need to re-authenticate.



⬛️ FILE STRUCTURE SERVER
web-service/
|__src/
|	|
|	|── services/
|	|	|
|	|	|── auth.service.js
|	|	|── user.service.js
|	|	|── jwt.service.js
|	|	|── payment.service.js
|	|	|── stripe.service.js
|	|	|── subscription.service.js
|	|	|── qr.service.js
|	|	|── ...
|	|
|	|── controllers/
|	|	|
|	|	|── auth.controller.js
|	|	|── user.controller.js
|	|
|	|── routes/
|	|	|
|	|	|── auth.routes.js
|	|	|── user.routes.js
|	|	|── payment.routes.js
|	|	|── subscription.routes.js
|	|	|── webhook.routes.js
|	|	|── qr.routes.js
|	|	|── ...
|	|
|	|── middleware/
|	|	|
|	|	|── auth.middleware.js
|	|	|── validation.middleware.js
|	|
|	|── models/
|	|	|
|	|	|── refresh-token.models.js
|	|	|── user.model.js
|	|	|── credit.model.js
|	|	|── invoice.model.js
|	|	|── plan.model.js
|	|	|── subscription.model.js
|	|	|── qr-code.model.js
|	|	|── ...
|	|
|── shared/
|	|
|	|── constants/
|	|	|── user-roles.js
|	|
|	|── database/
|	|	|── migration/
|	|	|── config.js
|	|
|	|── utils/
|	|	|── logger.js
|	|	|── response.js
|	|	|── validator.js
|	|	|── ...
|	|
|── tests/
|	|	|── auth.test.js
|	|	|── setup.js
|	|	|── ...
|	|
|	|── index.js
|	|── package.json
|	|── .prettierrc
|	|── README.md
|
|── .env
|── .sequelizerc
|── .gitignore
|── package.json
|── eslint.config.js
|── ui



⬜️ FILE STRUCTURE UI
ui/
|__src/
|	|
|	|── service/
|	|	|
|	|	|── auth.service.js
|	|	|── subscription.service.js
|	|	|── api.js
|	|	|── ...
|	|
|	|── components/
|	|	|
|	|	|── Layout
|	|	|	|
|	|	|	|── Header.js
|	|	|	|── Layout.js
|	|	|	|──
|	|	|
|	|	|── PrivateRoute.js
|	|	|── LoadingSpinner.js
|	|	|── ...
|	|
|	|── contexts/
|	|	|
|	|	|── AuthContext.js
|	|
|	|── pages/
|	|	|
|	|	|── Register.js
|	|	|── Login.js
|	|	|── Dashboard.js
|	|	|── Profile.js
|	|	|── Pricing.js
|	|	|── Subscription.js
|	|	|── SubscriptionSuccess.js
|	|	|── ...
|	|
|	|── utils/
|	|	|
|	|	|── constants.js
|	|
|	|── App.js
|	|── index.js
|	|── index.css
|
|── .env
|── package.json








🔺 DB MIGRATION

# Navigate to web-service
cd web-service

# Install dependencies
npm install

# Create logs directory
mkdir logs

# Run migrations to set up database tables
npx sequelize-cli db:migrate

# Seed the database with initial plans
npx sequelize-cli db:seed:all
or specific seed
npx sequelize-cli db:seed --seed 003-update-plans-with-stripe

# Start the backend server
npm run dev


🔺 UI RUN
# Navigate to ui
cd ui

# Then install dependencies
npm install

# Start the React development server
npm start
