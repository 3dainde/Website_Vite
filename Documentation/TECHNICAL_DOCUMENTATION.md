# Technical Documentation - AuthInteractive v1.2.4

## Architectural Overview

AuthInteractive is a complete web application built with React and Vite, designed as a modern e-commerce platform for digital products and creative services. The architecture features a decoupled frontend (GitHub Pages) and backend (Railway.app) with comprehensive security measures.

## Technology Stack

### Frontend
- **React 19** - Main UI framework with hooks
- **Vite 5.4** - Build tool and ultra-fast development server
- **React Router v7** - Routing and navigation management
- **TypeScript** - Type safety for critical components
- **CSS3** - Responsive styling with CSS variables

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe backend code
- **Nodemailer** - Email delivery via Gmail SMTP
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Backend Services
- **Gmail SMTP** - Contact form email delivery with automatic fallback
- **Firebase** - Authentication and database (Firestore)
- **Stripe** - Payment integration
- **myMemory Translation** - Automatic translation
- **IP Geolocation** - User location detection

### Deployment
- **GitHub Pages** - Frontend hosting
- **Railway.app** - Backend hosting (Node.js)

## Application Architecture

### 1. Routing System

```
/                    → Home (landing page)
/produits            → E-commerce catalog
/produit/:id         → Product details
/jeux                → Video games gallery (2 columns)
/developpement       → Developer resources
/contact             → Contact form (Formspree)
/login               → Authentication
/register            → Registration
/pricing             → Pricing page
/checkout            → Cart and checkout
/success             → Payment confirmation
/dashboard           → User dashboard
```

### 2. Translation System

#### How It Works
1. Automatic language detection via IP geolocation
2. Fallback to browser language if detection fails
3. Automatic translation via myMemory API
4. Translation preloading on startup
5. localStorage cache (24 hours)

#### Services
- `geolocation.service.ts` - IP detection + country/language mapping
- `translation.service.ts` - Dynamic content translation
- `TranslationContext.tsx` - Context API for global access

#### Usage
```jsx
import { useTranslation } from '../context/TranslationContext';

function Component() {
  const { lang, setLang, t, loading } = useTranslation();
  
  return <h1>{t.home.welcome}</h1>;
}
```

### 3. State Management

#### Context API
- **LanguageContext** - Language and translations
- **AuthContext** - Authenticated user and authentication
- **CartContext** - Shopping cart persistence
- **TranslationContext** - Complete translations

#### Persistence
- `localStorage` - Cart, language, user preferences
- `sessionStorage` - Temporary session data
- `Firebase` - Persistent user data (optional)

### 4. Main Components

#### Navigation
- `navbar` - Responsive navigation bar
- `hamburger` - Mobile menu with smart closing
- Closes on outside click via `useEffect` and `useRef`

#### Forms
- `Contact.jsx` - Contact form with Formspree
- Client-side validation
- State management (loading, success, error)

#### Pages
- React pages with modular CSS
- Lazy loading possible via React.lazy()
- Server-side rendering possible (future)

## Styling System

### CSS Architecture
- **App.css** - Global styles and main components (700+ lines)
- **Modular CSS files** - Domain-specific styles
  - `Auth.css` - Authentication pages
  - `Checkout.css` - Cart and payment
  - `Pricing.css` - Pricing page
  - `ProductDetail.css` - Product details
  - `Dashboard.css` - User dashboard

### Design System
```css
:root {
  --primary: #0096ff;      /* Primary blue */
  --secondary: #1e1e2e;    /* Dark background */
  --accent: #00d4ff;       /* Cyan accent */
  --text: #ffffff;         /* Primary text */
  --text-secondary: #b0b0b0; /* Secondary text */
  --bg-light: #2a2a3e;     /* Light background */
  --border: #404050;       /* Borders */
}
```

### Responsive Design
- Mobile-first approach
- Mobile breakpoint: 600px
- Flexible grid with CSS Grid
- Flexbox for components

## Contact Form System

### Architecture
- **Frontend**: React component with form validation
- **Backend**: Express.js API endpoint with security middleware
- **Email Service**: Gmail SMTP with automatic fallback

### Security Features
1. **Rate Limiting** - 5 requests per IP per 15 minutes
2. **Honeypot Protection** - Bot detection field
3. **Input Validation** - Email format and message length checks
4. **Input Sanitization** - XSS prevention via sanitizer
5. **Spam Detection** - Keyword filtering and pattern detection
6. **CORS Protection** - Cross-origin resource sharing control

### Email Flow
```
User Form Submission
    ↓
Frontend Validation
    ↓
Backend Endpoint (/api/send-contact)
    ↓
Security Checks (rate limit, honeypot, spam)
    ↓
Send to support@authinteractive.com
    ↓
Fallback to authinteractive@gmail.com (if primary fails)
    ↓
Success/Error Response
```

### Environment Variables Required
```env
GMAIL_USER=authinteractive@gmail.com
GMAIL_PASSWORD=your_app_password_here
NODE_ENV=production
PORT=3001
```

### Rate Limiting
- **Limit**: 5 requests
- **Window**: 15 minutes
- **Storage**: In-memory (resets on restart)
- **Identifier**: Client IP address

### Spam Detection
- URL detection (blocks messages with URLs)
- Keyword filtering (common spam words)
- Message length validation
- Honeypot field verification

## Video Games Page

### Layout
- 2-column grid on desktop
- 1 column on mobile
- Centered with max-width 900px
- Cards harmonized with contact form

### Structure
```jsx
const games = [
  { id: 1, title: 'Title', genre: 'Genre', status: 'In Development' },
  { id: 2, title: 'Title', genre: 'Genre', status: 'In Development' }
];
```

## Dynamic Footer

- Automatic year via `new Date().getFullYear()`
- Social links (Facebook, YouTube, Instagram, Twitter)
- Language selector
- Auto-updates every year

## Performance

### Optimizations
- Code splitting with React Router
- Tree shaking via ES modules
- Minified CSS in production
- Minified and uglified JavaScript
- Gzip compression

### Metrics
- Build time: ~1.5s
- Bundle size: ~300KB (gzipped ~90KB)
- Lazy loading pages available

## Deployment Architecture

### Frontend (GitHub Pages)
- Deployed automatically via `npm run deploy`
- Uses `gh-pages` npm package
- Accessible at `https://authinteractive.com`
- Static hosting with custom domain (CNAME)

### Backend (Railway.app)
- Node.js Express server
- URL: `https://websitevite-production.up.railway.app`
- Auto-deploys on GitHub push
- Environment variables managed in Railway dashboard
- 500 hours/month free tier included

### Frontend-Backend Communication
```
Frontend (GitHub Pages)
    ↓
VITE_API_URL: https://websitevite-production.up.railway.app
    ↓
Backend API: /api/send-contact
    ↓
Response to Frontend
```

During development:
- Frontend: `http://localhost:5173` (or 5174)
- Backend: `http://localhost:3001`
- Vite proxy: `/api` → `http://localhost:3001`

## Security

### Best Practices
- Environment variables for sensitive keys in `.env`
- `.env` never committed (protected by `.gitignore`)
- `.env.example` provided for safe distribution
- Client and server-side form validation
- CORS protection for API endpoints
- Rate limiting on contact endpoint
- Input sanitization for XSS prevention

### Rate Limiting Strategy
- Uses IP-based tracking
- In-memory storage for performance
- 5 requests per 15-minute window
- Resets on server restart (consider Redis for production)

### Email Security
- Gmail 2FA with App Passwords (not regular password)
- Credentials never exposed in frontend code
- Fallback mechanism ensures reliability
- SMTP encryption (TLS)

### CORS Configuration
- Allows requests from GitHub Pages domain
- Restricted API endpoints
- Credentials handling for cross-origin requests

### Environment Protection
For production deployment:
1. Set sensitive variables in Railway dashboard
2. Use strong Gmail App Passwords
3. Enable 2FA on Gmail account
4. Monitor email logs for suspicious activity
5. Keep dependencies updated (`npm audit fix`)

### Firebase Authentication
- Secure user sessions
- Token-based authentication
- Automatic session management

## Future Security Enhancements
- Redis for distributed rate limiting
- JWT tokens for API authentication
- Content Security Policy (CSP) headers
- API key rotation strategy
- CAPTCHA integration
- Enhanced logging and monitoring

## Extensibility

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Add translations in `translations.js`
4. Add CSS if needed

### Adding a New Language
1. Add configuration in `geolocation.service.ts`
2. Add translations in `translations.js`
3. Test with different browsers

### Adding Firebase Service
1. Initialize in `firebaseConfig.js`
2. Create service in `services/firebase.service.ts`
3. Use via custom hook

## Debugging

### Tools
- React DevTools (browser extension)
- Vite DevTools
- Browser DevTools (F12)

### Development Mode
```bash
npm run dev
```
Hot module replacement activated automatically.

### Useful Logs
- `console.log('Language detected:', lang)`
- `console.log('Loading translations...')`
- `console.log('Message sent')`

## Maintenance

### Update Dependencies
```bash
npm outdated          # See outdated packages
npm update            # Update packages
npm audit fix         # Fix vulnerabilities
```

### Versioning
Follow Semantic Versioning:
- v1.2.1 (MAJOR.MINOR.PATCH)
- GitHub tags for each release

## Future Integrations

- Complete Firebase authentication
- Integrated Stripe payments
- CDN for images/assets
- Service Worker (PWA)
- Analytics (Google Analytics)
- Email marketing (Mailchimp)

## Support and Contact

- Repository: https://github.com/3dainde/Website_Vite
- Issues: Use GitHub Issues
- Documentation: `/Documentation/`

---

**Version**: 1.2.4  
**Last Updated**: January 2026  
**Backend**: Railway.app (websitevite-production.up.railway.app)  
**Frontend**: GitHub Pages (authinteractive.com)  
**Status**: Production Ready
