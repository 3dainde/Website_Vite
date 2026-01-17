# Installation Guide - AuthInteractive v1.2.1

## System Requirements

- Node.js v16+ (recommended v18+)
- npm or pnpm
- Git
- A modern browser

## Step 1: Clone the Repository

```bash
git clone https://github.com/3dainde/Website_Vite.git
cd Website_Vite
```

## Step 2: Install Dependencies

```bash
npm install
```

Or with pnpm:
```bash
pnpm install
```

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Formspree (for contact form)
VITE_FORMSPREE_ID=your_id_here

# Firebase (optional, for future features)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# Stripe (optional, for future payments)
VITE_STRIPE_PUBLISHABLE_KEY=your_public_key
```

### Formspree Configuration

1. Go to https://formspree.io
2. Create a free account
3. Create a new "website" form
4. Get the form ID from the URL: `https://formspree.io/f/xxxxxID`
5. Insert this ID in `VITE_FORMSPREE_ID`

## Step 4: Start Development Server

```bash
npm run dev
```

The site will be accessible at `http://localhost:5173`

## Step 5: Build for Production

```bash
npm run build
```

Compiled files are in the `dist/` folder

## Step 6: Preview Production Build

```bash
npm run preview
```

## Deployment

### GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

The site will be accessible at `https://your-username.github.io/Website_Vite/`

### Custom Domain with GitHub Pages

1. Create a `CNAME` file in the `public/` folder with your domain
2. Configure DNS at your registrar to point to GitHub Pages
3. Enable HTTPS in the repository settings

### Other Platforms

The project can be deployed on:
- Vercel
- Netlify
- Heroku
- AWS Amplify
- Any server with Node.js support

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
npm run dev       # Development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run build --host  # Build accessible over network
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
