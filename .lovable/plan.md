
# Jimmy Africa E-Commerce Website — Phase 1 Frontend Execution & Management Plan

## Project Overview
Rebuild jimmyafrica.com as a premium, responsive e-commerce website using React + TypeScript + Tailwind CSS + shadcn/ui. Phase 1 is frontend-only with mock JSON data. Backend (Supabase) will come in Phase 2.

**Project type**: Long-term monthly salary project — not a rushed delivery.

---

## Role Definition
Act as: **Senior Frontend Architect + UI System Designer + Project Planner**
- Structure the project to scale
- Define component hierarchy and props
- Ensure reusability across pages
- Provide daily completion summaries + next day plans

---

## Brand & Design System
- **Primary**: Blue (#0033A0) — HSL: 220 100% 31%
- **Accent/Yellow**: #FFD700 — HSL: 51 100% 50%
- **White backgrounds**, light blue accent areas
- **Typography**: Clean, modern sans-serif
- **Style**: Premium, clean, spacious, bold product imagery
- **Fully responsive**: Mobile-first approach

---

## Execution Strategy — Build in Layers

Each layer must be **complete and polished** before moving to the next.

| Layer | Focus | Target |
|-------|-------|--------|
| 1 | Layout system (Header, Nav, Footer, AnnouncementBar) | Week 1 |
| 2 | Homepage (all sections) | Week 1-2 |
| 3 | Shop system (grid, filters, categories) | Week 2 |
| 4 | Product detail page | Week 2 |
| 5 | Cart & checkout UI | Week 3 |
| 6 | Blog & support pages | Week 4 |
| 7 | Polish, animations, responsive testing | Week 4 |

---

## Pages to Build

### 1. Homepage
- Announcement bar — Shipping info banner
- Header — Logo, search bar, location, account icon, cart icon
- Navigation — Home, Best Sellers, Parts & Accessories, Support, Deals, Blog
- Hero section — Split layout with featured product
- Trust badges — Award-winning technology banner
- Category grid — 6 product categories with images
- Design awards section
- Best sellers carousel with badges (New, Sale, Save %)
- Video section — "See JIMMY in Action"
- Customer reviews / Testimonials
- Trust bar — Free delivery, returns, 24/7 support, secure payments
- Promo ticker — Scrolling marquee
- Footer — Links, contact info, social media, payment icons

### 2. Shop / Shop All
- Category filters and sorting
- Product grid with cards
- Pagination

### 3. Product Detail Page
- Image gallery
- Title, price (sale/original), description
- Specifications table
- Add to cart with quantity selector
- Related products
- Reviews section (mock)

### 4. Category Pages
- Vacuum Cleaners, Kitchen, Hair Care, Water Purifiers, Parts & Accessories
- Filtered product grid per category

### 5. Deals Page
- Products on sale with discount badges

### 6. Blog
- Blog listing with post cards
- Individual blog post page

### 7. Support
- FAQ accordion
- Contact form
- Warranty info

### 8. Cart Page
- Product list with images, quantities, remove
- Subtotal, shipping estimate, total
- Proceed to checkout

### 9. Checkout Page (Mock)
- Shipping details form
- Payment method selection (visual)
- Order summary sidebar
- Place order → success toast

### 10. My Account Page
- Login / Register forms (visual only)
- Account dashboard placeholder

---

## Mock Data Structure
- `src/data/products.json` — All products
- `src/data/categories.json` — Category info
- `src/data/blog-posts.json` — Blog content
- `src/data/reviews.json` — Testimonials
- `src/data/faqs.json` — FAQ items

---

## Reusable Components
- `AnnouncementBar`, `Header`, `Navigation`, `Footer`
- `ProductCard`, `CategoryCard`, `HeroSection`, `TrustBar`
- `CartDrawer`, `PriceDisplay`, `SearchOverlay`
- shadcn `Badge` with custom variants (New, Sale, Save %)

---

## Weekly Plan

### Week 1 — Layout + Homepage
- Design system setup (colors, typography, spacing in index.css + tailwind.config)
- Layout components: AnnouncementBar, Header, Navigation, Footer
- Homepage: Hero, category grid, trust badges, best sellers, trust bar, promo ticker
- **Focus**: Pixel-perfect spacing and responsiveness

### Week 2 — Shop + Product Detail
- Mock data files
- ProductCard component
- Shop page with grid, filters, sorting
- Category pages
- Product detail page with gallery, specs, reviews
- **Focus**: Refine UI quality

### Week 3 — Cart + Checkout + Deals
- Cart context/state (React context + localStorage)
- Cart page with full functionality
- CartDrawer (slide-out panel)
- Checkout page (mock flow)
- Deals page
- **Focus**: Animations and micro-interactions

### Week 4 — Blog + Support + Polish
- Blog listing + individual post pages
- Support page (FAQ accordion, contact form, warranty)
- My Account page (visual)
- Cross-device responsive testing
- Performance optimization
- **Focus**: Final polish, consistency check

---

## Project Management

### Daily Output
- What was completed
- Code architecture summary
- Reusability check
- What we build tomorrow

### Weekly Demo Milestones
- Week 1: Full layout + homepage demo
- Week 2: Browse products end-to-end
- Week 3: Add to cart → checkout flow
- Week 4: Complete site walkthrough

### Quality Strategy
- Never rush — improve quality instead of finishing early
- Premium UI = client sees value = project continues
- Refactoring windows at end of Week 2 and Week 4

### Risk Areas
- Responsive breakpoints across all pages
- Product image consistency (using placeholders for now)
- Cart state persistence across pages
- Performance with large product grids
