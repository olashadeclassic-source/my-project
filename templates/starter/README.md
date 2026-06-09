# PageTurner Pages — Starter Template

A polished, conversion-optimized landing page template for books. Part of the PageTurner Pages Starter tier ($99).

## What's Included

| File | Description |
|------|-------------|
| `index.html` | Complete book landing page with 9 sections |
| `style.css` | Mobile-first, responsive stylesheet |
| `script.js` | Interactive behaviors (nav, form, smooth scroll) |
| `images/book-cover.jpg` | Sample book cover mockup (replace with your own) |
| `images/author-photo.jpg` | Sample author portrait (replace with your own) |

## Sections

1. **Navigation** — Fixed top bar with smooth-scroll links
2. **Hero** — Book cover, title, tagline, star rating, CTA
3. **Synopsis** — Book blurb with pull quote
4. **Newsletter Signup** — Email capture for prequel chapter / lead magnet
5. **Reviews** — Three reader testimonial cards
6. **Author Bio** — Portrait, bio text, social links
7. **Formats/Pricing** — Ebook, paperback, audiobook cards
8. **FAQ** — Expandable accordion questions
9. **Buy Links** — Final CTA with retailer buttons
10. **Footer** — Links, social, legal, newsletter link

## How to Customize for a Client

All customizable sections are marked with `<!-- CUSTOMIZE: ... -->` comments in `index.html`.

1. **Replace images** — Swap `images/book-cover.jpg` and `images/author-photo.jpg` with the client's actual book cover and author photo.
2. **Update content** — Search for `CUSTOMIZE` in `index.html` and update: title, author name, synopsis, reviews, FAQ answers, prices, and buy links.
3. **Update URLs** — Set the newsletter form action URL, buy links for each retailer (Amazon, Kobo, Apple Books), and social media links.
4. **Update colors (optional)** — Change CSS custom properties in `style.css` to match the book's branding.

## Design Features

- **Mobile-first responsive** — Tested at 480px, 768px, and 1440px
- **Conversion optimized** — Clear CTAs, star ratings, social proof, scarcity badges
- **Accessibility** — ARIA labels, semantic HTML, keyboard navigation, focus-visible styles
- **Performance** — No build tools required, lightweight CSS/JS, lazy-loaded images
- **Print-friendly** — Navigation and newsletter hidden when printing
- **Reduced motion** — Respects `prefers-reduced-motion` for accessibility

## Tech Stack

- Pure HTML5, CSS3, and vanilla JavaScript
- Fonts: Cormorant Garamond (serif) + Inter (sans-serif) via Google Fonts
- No frameworks, no build tools, no dependencies

## Browser Support

- Chrome/Edge (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)