# Dandy Dog Grooming Parlour — website

Single-page draft site for Dandy Dog Grooming Parlour, Guernsey. Plain HTML + Tailwind CSS v3 (compiled and committed) + a small vanilla JS file. No frameworks, no CDNs, all paths relative.

```
index.html              the whole page, sections split by big comment banners
thanks.html             shown after the booking form is sent
404.html                not-found page (uses <base href="/dandy-dog-grooming-parlour/">, change at go-live)
assets/css/styles.css   compiled Tailwind (npm run build)
assets/js/main.js       header, mobile menu, coat explorer tabs, groom sequence, lightbox, form validation
assets/fonts/           Gluten + Atkinson Hyperlegible Next (woff2) with their OFL licences
images/brand/           logo redrawn as SVG (full logo + wordmark)
images/work/            photos, each as name.webp (large) + name-sm.webp
images/                 favicons, og-image.jpg (share card), site.webmanifest
src/input.css           Tailwind source, @font-face, components and keyframes
tailwind.config.js      brand colours (named by role, with where each came from) and fonts
_shots/                 desktop + mobile screenshots for the team (not published)
_fb-pack/               the Facebook source pack (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| ink | `#0e1a20` | Text, the scottie, dark groom section (logo's black scottie, tinted) |
| action | `#076d99` | Every Call / Book button and link (logo script cyan, darkened for contrast) |
| splash | `#08acea` | Water drops, the drop full stop on headings, illustration fills (logo script cyan) |
| highlight | `#d4dc2a` | Puppy band, sticker, the watering can (logo's lime can) |
| accent | `#e2332b` | The scottie's tongue only (logo) |
| surface | `#f2fafb` | Page ground (logo's pale aqua, washed out) |

Fonts: **Gluten Variable** (display, slant axis pushed on the hero) and **Atkinson Hyperlegible Next Variable** (body). Self-hosted from @fontsource, OFL.

Logo: the Facebook logo was 274px, so it was traced to a clean SVG with the same lettering, colours and layout (`images/brand/dandy-dog-logo.svg`); the header uses the "Dandy Dog" wordmark part of it.

## Editing

- **Text:** edit `index.html` directly.
- **Colours / fonts:** `tailwind.config.js`, then `npm install && npm run build`.
- **Add a work photo:** save `name.webp` (~1200px) and `name-sm.webp` (~600px) in `images/work/`, then copy one `<a class="g-item …">` block in the *Recent grooms* section and change the paths, alt text and `data-caption`.
- **Coat explorer:** each coat is a `role="tab"` button plus a matching `role="tabpanel"` (ids `t-…` / `p-…`). Change the photo, copy and tick list inside the panel; the "Book a …" button's `data-pick` must match an option in the form's service list.
- **Groom sequence:** the four steps are `[data-step]` list items; the scottie drawing's state for each step is set in `src/input.css` (search `groom-stage`).
- No before/after slider, testimonials or FAQ: the pack had no before/after pairs, one written review and no Q&A.

## Going live — checklist

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg)
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap the GitHub Pages URL for the real domain everywhere: canonical, og tags, JSON-LD, sitemap, `_next`, and the `<base>` in 404.html
- [ ] Switch the form from the team's email to the client's and activate FormSubmit
- [ ] Confirm phone (01481 256999) and email (simon.com@mac.com); add the parlour's address and opening hours (not in the pack)
- [ ] Get Neve and Simon to sign off the services wording: the pack only says "pet groomer" and "first bath free", so the coat types and what's included were written from their photos and need checking
- [ ] Confirm the spelling "Neve" (their own poster) vs "Nieve" (a review)
- [ ] Assumptions / left out: the 96% / 17-review rating and follower counts (never shown), the November grooming demonstration post and the Christmas Pet Dog Show poster at Earlswood Garden Centre (dated events, left out; the demonstrations are mentioned in general terms), the "full groom worth £50" raffle value (not used as a price)
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

Source: built from the Facebook pack in `_fb-pack/` (not published on the live site).
