# Technical Documentation - AuthInteractive v1.2.1

## Architectural Overview

AuthInteractive is a complete web application built with React and Vite, designed as a modern e-commerce platform for digital products and creative services. The architecture follows modern React best practices with a clear separation of concerns.

## Technology Stack

### Frontend
- **React 19** - Main UI framework with hooks
- **Vite 5.4** - Build tool and ultra-fast development server
- **React Router v7** - Routing and navigation management
- **TypeScript** - Type safety for critical components
- **CSS3** - Responsive styling with CSS variables

### Backend Services
- **Firebase** - Authentication and database (Firestore)
- **Stripe** - Payment integration
- **Formspree** - Contact form management

### Third-Party Services
- **myMemory Translation** - Automatic translation
- **IP Geolocation** - User location detection

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

## Contact Form

### Formspree Integration
1. Sends directly to support@authinteractive.com
2. No backend required
3. Formspree handles emails and spam filtering

### Flow
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  });
  
  if (response.ok) {
    // Success - show message
  }
}
```

### Environment Variables
```env
VITE_FORMSPREE_ID=xreeejpo  # Formspree form ID
```

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

## Deployment

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

Deploys to `gh-pages` branch automatically.

### Custom Domain Configuration
1. `CNAME` file in `public/`
2. Configure registrar DNS
3. Automatic HTTPS via GitHub

## Security

### Best Practices
- Environment variables for sensitive keys
- `.env.local` never committed
- Client and server-side form validation (future)
- CORS for external APIs
- Content Security Policy (optional)

### Firebase Authentication
- To implement for secure sections
- Session tokens
- Automatic token refresh

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

**Version**: 1.2.1  
**Last Updated**: January 2026
