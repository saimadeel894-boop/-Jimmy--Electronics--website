

# Jimmy Africa E-Commerce Website — Phase 1 Frontend Plan

## Project Overview
Rebuild jimmyafrica.com as a premium, responsive e-commerce website using React + TypeScript + Tailwind. Phase 1 is frontend-only with mock JSON data. Backend (Supabase) will come in Phase 2.

---

## Brand & Design System
- **Colors**: Blue primary (#0033A0), yellow accent (#FFD700), white backgrounds, light blue accent areas
- **Typography**: Clean, modern sans-serif fonts
- **Style**: Premium, clean, spacious layout with bold product imagery
- **Fully responsive**: Mobile-first approach

---

## Pages to Build

### 1. Homepage
- **Announcement bar** — Shipping info banner (green/blue gradient)
- **Header** — Logo, search bar, location, account icon, cart icon
- **Navigation** — Home, Best Sellers, Parts & Accessories, Support, Deals, Blog + DHL delivery badge + WhatsApp chat link
- **Hero section** — Split layout with featured product (PW11 Pro Max) + secondary product card
- **Trust badges** — Award-winning technology banner
- **Category grid** — 6 product categories with images (Bed Vacuum, Stick Vacuum, Wet & Dry, Water Purifier, Hair Care, Kitchen)
- **Design awards section** — International awards showcase
- **Best sellers carousel** — Product cards with badges (New, Sale, Save %)
- **Video section** — "See JIMMY in Action"
- **Customer reviews** — Testimonials
- **Trust bar** — Free delivery, returns, 24/7 support, secure payments
- **Promo ticker** — Scrolling "Big Discounts" marquee
- **Footer** — Links, contact info, social media, payment icons

### 2. Shop / Shop All
- Category filters and sorting
- Product grid with cards (image, name, price, sale badge)
- Pagination

### 3. Product Detail Page
- Product image gallery
- Title, price (with sale/original price), description
- Specifications table
- Add to cart button with quantity selector
- Related products section
- Reviews section (mock data)

### 4. Category Pages
- Vacuum Cleaners, Kitchen Appliances, Hair Care, Water Purifiers, Parts & Accessories
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
- Product list with images, quantities, remove button
- Subtotal, shipping estimate, total
- Proceed to checkout button

### 9. Checkout Page (Mock)
- Shipping details form
- Payment method selection (visual only)
- Order summary sidebar
- Place order button (shows success toast)

### 10. My Account Page
- Login / Register forms (visual only, no auth yet)
- Account dashboard placeholder

---

## Mock Data Structure
- `products.json` — All products with id, name, slug, price, salePrice, images, category, description, specs, badges, reviews
- `categories.json` — Category names, slugs, images, descriptions
- `blog-posts.json` — Blog post titles, excerpts, content, dates, images
- `reviews.json` — Customer testimonials
- `faqs.json` — Support FAQ items

---

## Reusable Components
- `AnnouncementBar` — Top shipping banner
- `Header` — Logo, search, account, cart
- `Navigation` — Main nav with dropdowns
- `ProductCard` — Used across shop, homepage, deals
- `CategoryCard` — Category grid items
- `HeroSection` — Homepage hero
- `TrustBar` — Delivery, returns, support, payments
- `Footer` — Site-wide footer
- `CartDrawer` — Slide-out cart panel
- `PriceDisplay` — Handles original/sale price formatting
- `Badge` — New, Sale, Save % tags
- `SearchOverlay` — Full search modal with suggestions

---

## Week 1 Plan
1. **Day 1-2**: Design system setup (colors, typography, spacing) + Layout components (Header, Navigation, Footer, AnnouncementBar)
2. **Day 3**: Homepage hero section + category grid + trust badges
3. **Day 4**: Mock data setup + ProductCard component + Best Sellers section
4. **Day 5**: Shop page with product grid, filters, and category pages

---

## Month 1 Plan
- **Week 1**: Layout + Homepage + Shop pages
- **Week 2**: Product Detail page + Category pages + Deals page
- **Week 3**: Cart + Mock Checkout flow + My Account pages
- **Week 4**: Blog + Support pages + Polish, animations, responsive testing

