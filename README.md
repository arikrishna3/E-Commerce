<div align="center">

# 🛍️ LUXE — Premium Fashion Store

**A sleek, fully interactive e-commerce front-end built with vanilla HTML, CSS & JavaScript.**

No frameworks. No build step. Just clean code and a luxury shopping experience.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](#-license)

</div>

---

## ✨ Overview

**LUXE** is a modern, responsive fashion e-commerce landing page demo featuring a gold-on-ivory editorial aesthetic, smooth animations, and a fully functional shopping cart — all powered by plain JavaScript with zero dependencies.

It's designed to showcase what's possible with vanilla web technologies: dynamic product rendering, live search, a slide-out cart, a quick-view modal, and persistent state via `localStorage`.

---

## 🎯 Features

| | |
|---|---|
| 🛒 **Shopping Cart** | Add, remove, and adjust quantities — persisted in `localStorage` |
| 🔍 **Live Search** | Instantly filter products by name, brand, or category as you type |
| 🏷️ **Category Filters** | Filter by Women, Men, Accessories, Footwear, New & Sale tags |
| 🖼️ **Quick-View Modal** | Product details, pricing, and size selection in a sleek overlay |
| 📏 **Size Selector** | Per-product size grids with active-state selection |
| ⭐ **Ratings & Reviews** | Star ratings and review counts on every product card |
| 💌 **Newsletter Signup** | Email validation with friendly toast feedback |
| 🎞️ **Infinite Marquee** | Seamless scrolling announcement strip |
| 🔔 **Toast Notifications** | Non-intrusive feedback for cart, wishlist & newsletter actions |
| 📱 **Fully Responsive** | Optimized layouts across desktop, tablet, and mobile |
| 🎨 **Premium UI** | Editorial typography (Playfair Display + Inter) with a gold accent palette |

---

## 🖥️ Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Flexbox/Grid layouts, smooth transitions
- **Vanilla JavaScript (ES6+)** — DOM rendering, state management, no frameworks
- **Google Fonts** — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Inter](https://fonts.google.com/specimen/Inter)

> No npm, no bundler, no build pipeline — just open `index.html` in a browser.

---

## 📁 Project Structure

```
luxe-fashion-store/
├── index.html        # Markup & page structure
├── style.css          # Theming, layout & responsive styles
├── app.js              # Product data, cart logic & UI rendering
└── images/             # Product, category & banner images
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/luxe-fashion-store.git
cd luxe-fashion-store
```

### 2. Add your images
Place the required images inside an `images/` folder at the project root:

```
images/
├── hero.jpg
├── sale-banner.jpg
├── cat-women.jpg
├── cat-men.jpg
├── cat-accessories.jpg
├── cat-footwear.jpg
└── product-1.jpg … product-8.jpg
```

### 3. Run it
Just open `index.html` in your browser — or serve it locally:

```bash
npx serve .
```

That's it. No installs, no build step. 🎉

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#0D0D0D` | Primary text |
| `--snow` | `#FAF9F7` | Background |
| `--gold` | `#C9A84C` | Accent / CTA |
| `--gold-light` | `#E8C97A` | Highlights |
| `--slate` | `#3A3A3A` | Secondary text |
| `--cream` | `#F2EDE5` | Section backgrounds |
| `--accent-red` | `#C0392B` | Sale tags |
| `--success` | `#27AE60` | Confirmations |

---

## 🧩 Customization

Everything is data-driven — update one file to change the entire storefront:

- **Products, prices & categories** → edit the `PRODUCTS` and `CATEGORIES` arrays in `app.js`
- **Testimonials** → edit the `TESTIMONIALS` array
- **Marquee text** → edit `MARQUEE_ITEMS`
- **Colors & fonts** → edit the CSS variables in `:root` inside `style.css`

```js
// app.js — add a new product in seconds
{
  id: 9,
  brand: "Your Brand",
  name: "Your Product",
  price: 2999,
  category: "women",
  tag: "new",
  rating: 5,
  reviews: 0,
  img: "images/product-9.jpg",
  desc: "Your product description.",
  sizes: ["S", "M", "L"]
}
```

---

## 🗺️ Roadmap

- [ ] Wishlist persistence with `localStorage`
- [ ] Product detail pages (deep linking)
- [ ] Multi-currency support
- [ ] Backend integration for real checkout
- [ ] Dark mode

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for learning, portfolios, or your own store.

---

<div align="center">

Made with ☕ and a love for clean front-end code.

**⭐ Star this repo if you found it useful!**

</div>
