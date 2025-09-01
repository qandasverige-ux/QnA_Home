# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Q&A Data Analysis" - a data analysis consultancy service. The site showcases research case studies, services offered, and provides a contact form for potential clients.

## Architecture

**Static Web Application Structure:**
- `index.html` - Main HTML structure with single-page layout
- `script.js` - Client-side JavaScript for interactivity  
- `styles.css` - Complete CSS styling with responsive design and visual effects
- `images/` - Logo, service icons, and paper title page images
- `papers/` - PDF files of research papers

**Key Components:**
- Hero section with animated starry background and gradient effects
- About section with biomedical multi-omics focus and EU research positioning
- Service filtering system (omics, clinical, machine learning, visualization)
- Paper showcase section with styled "Read Full Paper" buttons
- Pricing section with discovery call banner and two-column layout (Hourly Consulting & Project Packages)
- Contact form with client-side validation, honeypot protection, and calendar integration
- Footer with Stockholm location and timezone information
- Smooth scrolling navigation with active section highlighting
- Intersection Observer animations for progressive content reveal

## Development Commands

This is a static website with no build process. To develop locally:

**Local Development:**
- Open `index.html` directly in browser, or
- Use any static web server (e.g., `python -m http.server` or `live-server`)

**No package manager** - Pure HTML/CSS/JavaScript implementation

## Code Architecture Notes

**JavaScript Architecture:**
- Single `script.js` file with modular event listeners
- DOM manipulation using vanilla JavaScript (no frameworks)
- Services matrix filtering with skeleton loading states
- Form handling with validation and dual-mode (contact/calendar)
- Intersection Observer API for scroll-triggered animations
- Smooth scrolling navigation with active section detection

**CSS Architecture:**
- Mobile-first responsive design with comprehensive breakpoints
- Advanced visual effects: animated starry background with shooting stars
- CSS Grid and Flexbox layouts throughout
- Component-based styling with consistent design tokens
- Complex keyframe animations for background effects and UI interactions
- Dark theme with multi-layer gradient backgrounds and backdrop filters

**Visual Effects System:**
- `body::before` - Animated starry background with 15+ stars using radial gradients
- `body::after` - Shooting star/meteor effects with timed linear gradients
- Multiple animation layers with proper z-index stacking (background effects z-index: 2-3, content z-index: 5+)
- Smooth transitions and hover states throughout

**Content Management:**
- About section highlights biomedical multi-omics expertise and EU research collaboration
- Pricing structure with clear value propositions and trust indicators
- Paper showcases hardcoded in HTML with external PDF links
- Service cards use data-category attributes for filtering
- Form submission simulated (no backend) with calendly integration option

## Key Features to Maintain

**Core Functionality:**
- About section positioning as biomedical multi-omics specialists with EU research focus
- Pricing section with discovery call CTA and conversion-optimized layout
- Services matrix filtering with empty states and skeleton loading
- Paper showcase hover effects and uniform button sizing
- Form validation with dual-mode switching (contact vs calendar) and honeypot protection
- Footer trust signals with Stockholm location and timezone
- Smooth scrolling navigation with visual feedback

**Visual Effects:**
- Starry night background with twinkling animations
- Shooting star effects that periodically streak across the screen
- Gradient background shifts and all hover/interaction animations
- Responsive design that maintains effects across screen sizes

**Performance Considerations:**
- All animations use CSS transforms and opacity for optimal performance
- Visual effects are applied via pseudo-elements to avoid layout impact
- Intersection Observer used efficiently for scroll-based animations

## Recent Updates (2025)

**UX and Conversion Improvements:**
- Added concise About section focusing on biomedical multi-omics integration and EU research collaboration
- Implemented comprehensive pricing section with discovery call banner and two-column layout
- Enhanced contact form with honeypot spam protection and free consultation messaging
- Added footer trust elements with Stockholm location and timezone information
- Optimized pricing strategy with proper anchoring, value propositions, and conversion-focused CTAs
- Used target.svg icon consistently throughout pricing section (avoid emoji usage)

**Technical Implementation:**
- CSS variables maintained for consistent theming across new sections
- Responsive grid layouts for pricing cards (auto-fit, minmax(350px, 1fr))
- Backdrop filters and gradient effects integrated seamlessly with existing design
- Navigation updated to include pricing section link
- Relative path structure maintained (/QnA_Home/) for GitHub Pages compatibility

**Content Strategy:**
- Professional business language with satisfaction guarantees and invoicing terms
- Multi-currency pricing display (SEK/EUR/USD) for international accessibility  
- Trust indicators and social proof elements integrated into pricing structure
- Clear value propositions for each service tier with specific deliverables

**Working note**
- Always ask me question before any action if you are unclear.
- When updating pricing section, use target.svg icon not emoji
- Maintain existing visual effects and animation system integrity