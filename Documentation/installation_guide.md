# Installation Guide - AuthInteractive v1.2.4

## System Requirements

- Node.js v18+ (recommended v22+)
- npm v9+
- Git
- A modern web browser
- Gmail account with 2FA enabled (for contact form)

## Step 1: Clone the Repository

```bash
git clone https://github.com/3dainde/Website_Vite.git
cd Website_Vite
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Configure Environment Variables

Create a `.env` file in the project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# Backend API Configuration
VITE_API_URL=https://websitevite-production.up.railway.app

# Gmail SMTP Configuration - Contact Form Email Sender
GMAIL_USER=authinteractive@gmail.com
GMAIL_PASSWORD=your_app_password_here
PORT=3001
NODE_ENV=development
```

### Gmail App Password Setup

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to "App passwords" section
4. Select "Mail" and "Windows Computer"
5. Generate a 16-character password
6. Use this password in `GMAIL_PASSWORD`

**Important**: Never commit `.env` file. Use `.env.example` for distribution.

## Step 4: Start Development Server (Frontend)

```bash
npm run dev
```

The frontend will be accessible at `http://localhost:5173` (or `http://localhost:5174` if 5173 is in use)

## Step 5: Start Backend Server (Local Development)

In a separate terminal:

```bash
npm run server:dev
```

The backend will be accessible at `http://localhost:3001`

## Step 6: Build for Production

### Frontend Build
```bash
npm run build
```

Compiled files are in the `dist/` folder

### Backend Build
```bash
npm run server:build
```

## Step 7: Deployment

### Backend Deployment (Railway)

1. Create account on https://railway.app
2. Connect your GitHub repository
3. Select "Node.js" as service
4. Configure environment variables in Railway dashboard
5. Backend will be deployed automatically on each push

### Frontend Deployment (GitHub Pages)

```bash
npm run deploy
```

This will:
1. Build the frontend
2. Push to `gh-pages` branch
3. Deploy to GitHub Pages

## Project Structure

```
Website_Vite/
├── src/
│   ├── pages/           # React pages
│   ├── components/      # Reusable components
│   ├── context/         # Context API (auth, cart, translation)
│   ├── services/        # Services (Firebase, Stripe, Formspree)
│   ├── data/            # Static data
│   ├── styles/          # Specialized CSS files
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main component
│   ├── App.css          # Global styles
│   └── index.jsx        # Entry point
├── public/              # Static assets
├── dist/                # Production build (generated)
├── Documentation/       # This documentation
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Main Dependencies

- **React 19** - UI Framework
- **Vite 5** - Build tool and dev server
- **React Router v7** - Routing
- **Firebase** - Backend (auth, database)
- **Stripe.js** - Payment integration
- **TypeScript** - Type safety

## Available Scripts

```bash
# Frontend
npm run dev             # Development server (frontend)
npm run build           # Build for production
npm run preview         # Preview production build

# Backend (Local)
npm run server:dev      # Development server (backend)
npm run server:build    # Build backend
npm run server:start    # Start backend

# Deployment
npm run deploy          # Build and deploy to GitHub Pages
```

## Advanced Configuration

### Vite

Modify `vite.config.ts` to:
- Change development server port
- Add import aliases
- Configure build options

### TypeScript

Modify `tsconfig.json` to:
- Add global types
- Change compilation options
- Configure import paths

## Troubleshooting

### Port 5173 Already in Use

```bash
npm run dev -- --port 3000
```

### Module Not Found

Ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

Check that TypeScript compiles without errors:
```bash
npx tsc --noEmit
```

## Multi-Language Support

The site supports 6 languages:
- French (FR)
- English (EN)
- Spanish (ES)
- German (DE)
- Italian (IT)
- Russian (RU)

Language is automatically detected based on the user's browser.

## Security

Sensitive keys should be in `.env.local` (never committed):
- Never commit `.env.local`
- Use `.env.example` to document required variables
- Use public keys for Stripe (private keys stay server-side)

## Need Help?

- Vite Documentation: https://vitejs.dev
- React Documentation: https://react.dev
- React Router Documentation: https://reactrouter.com
- GitHub Issues: https://github.com/3dainde/Website_Vite/issues
