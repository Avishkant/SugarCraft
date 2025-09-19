# Copilot Instructions for SugarCraft

## Project Overview
SugarCraft is a full-stack sweet shop management system with a modern, animated React + Vite frontend and a Node.js/Express/MongoDB backend. The UI is designed to be warm, playful, and highly usable, with scroll-snap storytelling and rich micro-interactions.

## Architecture & Key Files
- **Backend**: `src/` (Node.js, Express, MongoDB)
  - API routes: `src/routes/`
  - Controllers: `src/controllers/`
  - Models: `src/models/`
  - Middleware: `src/middleware/`
  - Utility: `src/utils/`
- **Frontend**: `client/src/` (React, Vite, Tailwind, Framer Motion)
  - Pages: `client/src/pages/`
  - Components: `client/src/components/`
  - Context: `client/src/context/`
  - Hooks: `client/src/hooks/`
  - Assets: `client/src/assets/`
  - Utils: `client/src/utils/`

## Developer Workflows
- **Backend**
  - Install: `npm install`
  - Run dev: `npm run dev` or VS Code task "Run backend with nodemon"
  - Test: `npm test` (Jest)
  - Env: `.env` in `config/` (see README)
- **Frontend**
  - Install: `npm install` in `client/`
  - Run dev: `npm run dev` in `client/`
  - Vite config: `client/vite.config.js`
  - ESLint config: `client/eslint.config.js`

## UI Design System
- **Colors**: See design tokens in user prompt (e.g., `--color-bg: #FFF9F6`, `--color-primary-600: #FF7A59`)
- **Typography**: Headings use Poppins/Montserrat, body uses Inter. Sizes: h1=48px, h2=32px, h3=24px, body=16px.
- **Spacing**: Use Tailwind spacing scale (4,8,12,16, etc.)
- **Radii**: Cards/components use rounded corners (2xl, 24px+)
- **Shadows**: Subtle layered shadows for elevation
- **Motion**: Framer Motion for entrance, hover, and confetti/fly-to-cart effects. Respect `prefers-reduced-motion`.

## Component Patterns & Accessibility
- **Navbar**: Sticky, glass blur, shadow on scroll, mobile hamburger
- **Hero**: Gradient overlay, staggered entrance, CTA buttons
- **Sweets Grid/Card**: Image, name, category, price, quantity, purchase button (disabled if out-of-stock)
- **Search/Filter**: Chips, slider, dropdown, mobile bottom sheet
- **Detail Modal**: Large image, details, animated add-to-cart
- **Admin Forms**: Inline validation, drag & drop images
- **Toasts**: Success/error/info, auto-dismiss, distinct icons/colors
- **Footer**: About, links, newsletter, social icons
- **Accessibility**: Use alt text, aria-labels, keyboard focus, respect reduced motion

## Integration & Data Flow
- **API**: Frontend communicates with backend via REST endpoints (see `src/routes/`)
- **Auth**: JWT-based, context in frontend (`client/src/context/AuthContext.jsx`)
- **State**: React context/hooks for auth, data fetching (`useFetch.js`)
- **Images**: Use Cloudinary for uploads (`src/utils/cloudinaryUpload.js`)

## Project-Specific Conventions
- Use Tailwind for layout, spacing, and color tokens
- Use Framer Motion for all interactive/animated UI elements
- Cards and modals use glassmorphism (blur, semi-transparent backgrounds)
- All major sections/pages are designed for scroll-snap vertical storytelling
- Admin features are separated in dashboard pages/components

## Example: Sweets Card
```jsx
<SweetCard
  name="Chocolate Truffle"
  category="Chocolate"
  price={120}
  quantity={10}
  image={reactLogo}
  onPurchase={...}
/>
```

---
**For new agents:**
- Always follow the design system and animation patterns described above
- Reference key files for examples of component structure and API usage
- Prefer updating existing patterns over introducing new ones unless required
- Ask for clarification if any workflow or pattern is unclear
- don't change any tailwind confihuration or vite configuration unless absolutely necessary beacuse after v4 of tailwind it will break the whole design system
