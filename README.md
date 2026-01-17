# AuthInteractive

A modern, full-featured e-commerce web application built with React, Vite, and Express.

## Overview

AuthInteractive is a complete platform for managing and selling digital products and creative services. The application features secure authentication, multi-language support, automated contact forms, and integrated payment processing.

## Features

- Modern React 19 architecture with Vite
- Multi-language support (6 languages)
- Secure contact form with Gmail SMTP backend
- Automatic spam and bot protection
- Product catalog and e-commerce functionality
- User authentication and dashboard
- Responsive design for all devices
- Type-safe with TypeScript
- Production-ready build pipeline

## Technology Stack

### Frontend
- React 19
- Vite 5.4
- React Router v7
- TypeScript
- CSS3

### Backend
- Express.js
- Nodemailer
- TypeScript

### Infrastructure
- GitHub Pages deployment
- Firebase integration (authentication, database)
- Stripe payment processing

## Quick Start

### Prerequisites
- Node.js v16+ (recommended v18+)
- npm or pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/3dainde/Website_Vite.git
cd Website_Vite
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Update `.env` with your credentials (Gmail SMTP, Firebase, etc.)

4. Start the development servers:

Terminal 1 - Backend:
```bash
npm run server:dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

The application will be available at `http://localhost:5174`

## Development

### Available Commands

```bash
npm run dev           # Start frontend development server
npm run server:dev    # Start backend development server
npm run build         # Create production build
npm run preview       # Preview production build locally
npm run deploy        # Build and deploy to GitHub Pages
```

### Project Structure

```
src/
├── pages/            # Application pages
├── context/          # Context API (auth, cart, translations)
├── services/         # Business logic and API calls
├── data/             # Static data and constants
├── styles/           # CSS files
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Email Service
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your_app_password
PORT=3001

# Firebase (optional)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...

# Stripe (optional)
VITE_STRIPE_PUBLISHABLE_KEY=...
```

### Security Notes

- Credentials in `.env` are protected by `.gitignore`
- Never commit sensitive files to version control
- Use Gmail App Passwords for SMTP authentication
- Store private keys server-side only

## Deployment

### GitHub Pages

```bash
npm run deploy
```

This command builds the application and deploys it to the `gh-pages` branch.

### Custom Domain

1. Add your domain to `public/CNAME`
2. Configure DNS records at your registrar
3. Enable HTTPS in repository settings

### Other Platforms

The project can be deployed to Vercel, Netlify, Heroku, AWS Amplify, or any Node.js-compatible server.

## Security

- Contact form includes rate limiting (5 requests per IP per 15 minutes)
- Bot protection via honeypot field
- Automatic spam detection
- Email validation
- Input sanitization
- CORS protection
- Sensitive credentials stored in `.env`

## Documentation

- Full installation guide: [Installation Guide](Documentation/GUIDE_INSTALLATION.md)
- Technical documentation: [Technical Documentation](Documentation/TECHNICAL_DOCUMENTATION.md)

## Troubleshooting

### Backend Not Connecting
- Ensure backend runs on port 3001: `npm run server:dev`
- Check frontend proxy configuration in `vite.config.ts`

### Emails Not Sending
- Verify Gmail 2FA is enabled
- Confirm app password (not Gmail password) in `.env`
- Check backend logs for errors

### Build Failures
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Verify TypeScript compilation: `npx tsc --noEmit`

## Support

For issues and questions:
- GitHub Issues: https://github.com/3dainde/Website_Vite/issues
- Email: support@authinteractive.com

## License

All rights reserved. AuthInteractive 2024-2026.

## Version

Current version: 1.2.2

Last updated: January 2026
