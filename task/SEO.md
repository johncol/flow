Here are the SEO best practices that actually matter for a React app using the latest React Router (v6+). I’ll be blunt up front: **a purely client-rendered SPA will never be “best-in-class” SEO** compared to SSR/SSG. You can still get *good enough* for many sites, but if organic search is important, you should strongly consider SSR/SSG.

## 1) Decide: SPA SEO vs SSR/SSG (the big lever)

**If SEO is a priority:** use SSR/SSG (commonly: Remix, Next.js, or your own SSR setup). You’ll get:

* Fully rendered HTML per route (better indexing, faster first content)
* Predictable metadata per URL
* Better performance metrics (often helps rankings indirectly)

**If you stay SPA:** Google can index it, but:

* Other crawlers/social bots may not execute JS reliably
* Indexing can be slower and more fragile
* Metadata needs extra care

## 2) Use real URLs + correct HTTP status codes

With React Router, make sure every important page is a **unique canonical URL** and that your server:

* Returns **200** for real pages
* Returns **404** for missing routes (not a 200 with a “not found” React view)
* Returns **301** for permanent redirects

**Key point:** React Router handles routing *in the browser*. Your server/CDN must also be configured to:

* Serve `index.html` for app routes **but**
* Still return proper status codes for 404/redirect cases (this is where SPAs often fail)

If you can’t do that, SSR is the fix.

## 3) Per-route `<title>`, meta description, canonical, robots

You need metadata that updates **on navigation**, and you need it to be **correct on first load**.

### SPA approach (client-only)

Use a head manager like `react-helmet-async` and set per-route tags:

* `<title>`
* `<meta name="description">`
* `<link rel="canonical">`
* `<meta name="robots">` for noindex pages

This helps, but note: some bots won’t see these changes unless they run JS.

### SSR/Remix-style approach

Prefer server-rendered meta per route. If you’re using Remix (which is “React Router with SSR”), you get proper route-based `meta` on the server, which is the gold standard.

## 4) Prevent duplicate content

Common React Router pitfalls:

* Both `/path` and `/path/` accessible
* Query params creating duplicates (`?ref=...`)
* Same content on multiple routes

Fixes:

* Pick a single canonical format (trailing slash or not) and **301** the other
* Use `<link rel="canonical" href="...">`
* Avoid indexing parameter variants unless intentional

## 5) Make internal linking crawlable

Bots follow links. Make sure:

* Use `<Link to="/somewhere">` for internal navigation
* Don’t hide important links behind buttons with JS handlers only
* Avoid requiring user interaction to reveal essential navigation

Also: ensure your pages are reachable via links (not only via search input/autocomplete).

## 6) Render meaningful content without relying on JS-only effects

Even if crawlers execute JS, “late” content can be missed or deprioritized.

* Avoid “blank shell → fetch everything → render” for key landing pages
* If SPA: consider pre-rendering critical routes (build-time HTML snapshots) or SSR

## 7) Structured data (Schema.org) when it matters

If you have products/articles/events/etc., add JSON-LD:

* Product, Article, BreadcrumbList, FAQ (when legit), Organization, etc.
  This can enable rich results. Put it on the route that represents the entity.

## 8) Performance is SEO (indirectly, but real)

Things that help rankings through UX/core web vitals:

* Code-split by route (`lazy()` + `Suspense`)
* Prefetch data/assets for likely next routes (careful with over-prefetching)
* Optimize images (proper sizes, modern formats, lazy loading)
* Avoid huge JS bundles; keep hydration/render costs low

## 9) Sitemap + robots.txt (non-negotiable)

* Generate a **sitemap.xml** with all indexable URLs (and keep it updated)
* `robots.txt` should allow crawling of public routes and reference your sitemap

This is especially important for SPAs, because discovery via links can be weaker.

## 10) Social previews: Open Graph + Twitter cards

These often **do not execute JS**, so SPA-only meta updates can fail.

* If you care about link previews, SSR or dynamic rendering is the reliable way
* Otherwise, accept that previews may be wrong/inconsistent

## 11) Internationalization / hreflang (if applicable)

If you serve multiple locales:

* Use distinct URLs per locale (`/en/...`, `/fr/...`)
* Add `hreflang` tags (best with SSR)

## 12) Don’t index junk

Explicitly **noindex**:

* Account pages, dashboards
* Search results pages (usually)
* Filter/sort combinations that explode URL count
* Staging environments (block via auth and/or robots)

---

# Practical “best” setups (choose one)

### Best overall: SSR with React Router (Remix)

* Proper HTML + meta on first response
* Correct status codes
* Great for SEO-heavy sites

### Good compromise: Pre-render marketing routes + SPA app

* Pre-render `/`, `/pricing`, `/blog/...`
* SPA for authenticated app pages
  This is common and works well.

### Acceptable: Pure SPA + Helmet + strong server config

* Works if SEO is “nice to have”
* Still do sitemap, canonicals, perf, and correct 404/redirect handling
