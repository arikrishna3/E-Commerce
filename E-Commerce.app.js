/* ═══════════════════════════════════════════════════════════════
   LUXE Fashion Store — app.js
   All product data, cart logic, UI interactions & rendering
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════
   DATA
   ════════════════════════════════════ */

const CATEGORIES = [
  {
    name:  "Women's Fashion",
    count: "4,200+ items",
    img:   "images/cat-women.jpg"
  },
  {
    name:  "Men's Style",
    count: "3,100+ items",
    img:   "images/cat-men.jpg"
  },
  {
    name:  "Accessories",
    count: "1,800+ items",
    img:   "images/cat-accessories.jpg"
  },
  {
    name:  "Footwear",
    count: "2,500+ items",
    img:   "images/cat-footwear.jpg"
  }
];

const PRODUCTS = [
  {
    id:       1,
    brand:    "Zara",
    name:     "Silk Wrap Dress",
    price:    3499,
    oldPrice: 5999,
    category: "women",
    tag:      "sale",
    rating:   5,
    reviews:  248,
    img:      "images/product-1.jpg",
    desc:     "Effortlessly elegant silk wrap dress in a flattering silhouette. Perfect for both day-to-night transitions.",
    sizes:    ["XS","S","M","L","XL"]
  },
  {
    id:       2,
    brand:    "H&M",
    name:     "Linen Blazer",
    price:    2799,
    category: "men",
    tag:      "new",
    rating:   4,
    reviews:  127,
    img:      "images/product-2.jpg",
    desc:     "Relaxed-fit linen blazer crafted from premium Irish linen. A wardrobe essential for the modern man.",
    sizes:    ["S","M","L","XL","XXL"]
  },
  {
    id:       3,
    brand:    "Mango",
    name:     "Floral Midi Skirt",
    price:    1999,
    oldPrice: 2999,
    category: "women",
    tag:      "sale",
    rating:   5,
    reviews:  312,
    img:      "images/product-3.jpg",
    desc:     "A dreamy floral midi skirt with a flowy silhouette. Made from sustainable viscose.",
    sizes:    ["XS","S","M","L","XL"]
  },
  {
    id:       4,
    brand:    "BOSS",
    name:     "Slim Chino Trousers",
    price:    4299,
    category: "men",
    tag:      "hot",
    rating:   4,
    reviews:  89,
    img:      "images/product-4.jpg",
    desc:     "Premium slim-cut chino trousers in stretch cotton. Tailored for the modern professional.",
    sizes:    ["28","30","32","34","36"]
  },
  {
    id:       5,
    brand:    "COS",
    name:     "Oversized Cotton Tee",
    price:    1299,
    category: "women",
    tag:      "new",
    rating:   4,
    reviews:  201,
    img:      "images/product-5.jpg",
    desc:     "An oversized cotton tee with a clean, minimal aesthetic. Ethically produced from GOTS-certified organic cotton.",
    sizes:    ["XS","S","M","L","XL","XXL"]
  },
  {
    id:       6,
    brand:    "Massimo Dutti",
    name:     "Leather Belt Bag",
    price:    3899,
    category: "accessories",
    tag:      "hot",
    rating:   5,
    reviews:  156,
    img:      "images/product-6.jpg",
    desc:     "Handcrafted full-grain leather belt bag. A contemporary take on a functional classic.",
    sizes:    ["One Size"]
  },
  {
    id:       7,
    brand:    "Nike",
    name:     "Air Max Sneakers",
    price:    8999,
    oldPrice: 10999,
    category: "footwear",
    tag:      "sale",
    rating:   5,
    reviews:  432,
    img:      "images/product-7.jpg",
    desc:     "Iconic Air Max cushioning in a sleek, modern profile. Engineered for all-day comfort.",
    sizes:    ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"]
  },
  {
    id:       8,
    brand:    "Arket",
    name:     "Cashmere Sweater",
    price:    6799,
    category: "women",
    tag:      "new",
    rating:   4,
    reviews:  73,
    img:      "images/product-8.jpg",
    desc:     "Ultra-soft Grade A cashmere sweater. An investment piece that only gets better with time.",
    sizes:    ["XS","S","M","L"]
  }
];

const TESTIMONIALS = [
  {
    text:    "LUXE completely transformed my wardrobe. The quality of every piece I've ordered has been exceptional — exactly as described. Their packaging alone feels like a luxury experience.",
    name:    "Priya Sharma",
    loc:     "Mumbai",
    rating:  5,
    initial: "P"
  },
  {
    text:    "I've shopped on dozens of fashion sites, but LUXE stands apart. The curation is thoughtful, the prices are fair, and their customer service resolved my exchange in under an hour.",
    name:    "Rohan Mehta",
    loc:     "Delhi",
    rating:  5,
    initial: "R"
  },
  {
    text:    "As someone with a very specific style, I love how LUXE stocks pieces you won't find at every other store. The silk wrap dress was everything the photos promised and more.",
    name:    "Aarti Nair",
    loc:     "Bangalore",
    rating:  5,
    initial: "A"
  }
];

const FILTERS = ["All","Women","Men","Accessories","Footwear","New","Sale"];

const MARQUEE_ITEMS = [
  "Free Shipping Over ₹2,499",
  "New Arrivals Every Week",
  "100% Authentic Products",
  "Easy 30-Day Returns",
  "Pay Later Options Available",
  "Curated Luxury Fashion"
];

/* ════════════════════════════════════
   STATE
   ════════════════════════════════════ */

let cart         = JSON.parse(localStorage.getItem('luxe_cart') || '[]');
let activeFilter = 'all';
let modalProduct = null;
let selectedSize = null;
let toastTimer   = null;

/* ════════════════════════════════════
   INIT — runs after DOM ready
   ════════════════════════════════════ */

window.addEventListener('load', () => {
  // Hide loader after 1.2s
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1200);

  buildMarquee();
  buildCategories();
  buildFilters();
  buildProducts();
  buildTestimonials();
  updateCartUI();
});

window.addEventListener('scroll', () => {
  document.getElementById('navbar')
    .classList.toggle('scrolled', window.scrollY > 50);
});

/* ════════════════════════════════════
   MARQUEE
   ════════════════════════════════════ */

function buildMarquee() {
  const track = document.getElementById('marqueeTrack');
  // Duplicate items for seamless infinite loop
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
    .map(t => `<span class="marquee-item"><span class="marquee-dot">✦</span>${t}</span>`)
    .join('');
  track.innerHTML = items;
}

/* ════════════════════════════════════
   CATEGORIES
   ════════════════════════════════════ */

function buildCategories() {
  document.getElementById('categoriesGrid').innerHTML = CATEGORIES.map(c => `
    <div class="category-card" onclick="showToast('Browsing: ${c.name}')">
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <div class="category-overlay"></div>
      <div class="category-info">
        <div class="category-name">${c.name}</div>
        <div class="category-count">${c.count}</div>
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════
   FILTER TABS
   ════════════════════════════════════ */

function buildFilters() {
  document.getElementById('filterTabs').innerHTML = FILTERS.map(f => `
    <button
      class="filter-tab ${f === 'All' ? 'active' : ''}"
      onclick="filterProducts('${f.toLowerCase()}', this)">
      ${f}
    </button>
  `).join('');
}

function filterProducts(filter, btn) {
  activeFilter = filter;
  // Update active tab
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buildProducts();
}

/* ════════════════════════════════════
   PRODUCTS
   ════════════════════════════════════ */

function buildProducts(overrideList = null) {
  const list = overrideList
    ? overrideList
    : activeFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeFilter || p.tag === activeFilter);

  document.getElementById('productsGrid').innerHTML = list.length
    ? list.map(p => buildProductCard(p)).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--warm-gray)">
         <div style="font-size:2rem;margin-bottom:12px">🔍</div>
         <p style="font-size:1.1rem;font-weight:500">No products found</p>
         <p style="font-size:13px;margin-top:6px">Try a different filter or search term</p>
       </div>`;
}

function buildProductCard(p) {
  const stars = Array(5).fill(0).map((_, i) =>
    `<span class="star ${i < p.rating ? '' : 'empty'}">★</span>`
  ).join('');

  return `
    <div class="product-card" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">

        <div class="product-tags">
          ${p.tag ? `<span class="tag tag-${p.tag}">${p.tag}</span>` : ''}
        </div>

        <button
          class="wishlist-btn"
          onclick="event.stopPropagation(); toggleWishlist(this)"
          title="Add to Wishlist">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <div class="product-actions">
          <button class="product-action-btn" onclick="event.stopPropagation(); quickAddToCart(${p.id})">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            Quick Add
          </button>
          <button class="product-action-btn" onclick="event.stopPropagation(); openModal(${p.id})">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            View
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price ${p.oldPrice ? 'product-price-sale' : ''}">
            ₹${p.price.toLocaleString('en-IN')}
          </span>
          ${p.oldPrice
            ? `<span class="product-price-old">₹${p.oldPrice.toLocaleString('en-IN')}</span>`
            : ''}
        </div>
        <div class="product-stars">
          ${stars}
          <span class="product-reviews">(${p.reviews})</span>
        </div>
      </div>
    </div>`;
}

/* ════════════════════════════════════
   SEARCH
   ════════════════════════════════════ */

function handleSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) { buildProducts(); return; }
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.includes(q)
  );
  buildProducts(filtered);
}

/* ════════════════════════════════════
   WISHLIST
   ════════════════════════════════════ */

function toggleWishlist(btn) {
  btn.classList.toggle('active');
  showToast(
    btn.classList.contains('active')
      ? '❤️ Added to wishlist'
      : '🤍 Removed from wishlist'
  );
}

/* ════════════════════════════════════
   PRODUCT MODAL
   ════════════════════════════════════ */

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  modalProduct = p;
  selectedSize = null;

  document.getElementById('modalImg').src              = p.img;
  document.getElementById('modalBrand').textContent    = p.brand;
  document.getElementById('modalTitle').textContent    = p.name;
  document.getElementById('modalPrice').textContent    = '₹' + p.price.toLocaleString('en-IN');
  document.getElementById('modalOldPrice').textContent = p.oldPrice
    ? '₹' + p.oldPrice.toLocaleString('en-IN')
    : '';
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalSizes').innerHTML  = p.sizes.map(s =>
    `<button class="size-btn" onclick="selectSize(this,'${s}')">${s}</button>`
  ).join('');

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = size;
}

function closeModal(event) {
  if (event.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}

function addToCartFromModal() {
  if (!modalProduct) return;

  const needsSize = modalProduct.sizes[0] !== 'One Size';
  if (needsSize && !selectedSize) {
    showToast('⚠️ Please select a size first');
    return;
  }

  addToCart(modalProduct, selectedSize || modalProduct.sizes[0]);
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ════════════════════════════════════
   CART
   ════════════════════════════════════ */

function quickAddToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (p) addToCart(p, p.sizes[0]);
}

function addToCart(product, size) {
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, size, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`✅ ${product.name} added to bag`);
}

function removeFromCart(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
  updateCartUI();
}

function changeQty(id, size, delta) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id, size);
  else { saveCart(); updateCartUI(); }
}

function saveCart() {
  localStorage.setItem('luxe_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cartBadge').textContent = totalItems;
  document.getElementById('cartCount').textContent = totalItems;

  const itemsEl  = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>Your bag is empty</p>
        <span>Add items to get started</span>
      </div>`;
    footerEl.style.display = 'none';
    return;
  }

  itemsEl.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img class="cart-item-img" src="${i.img}" alt="${i.name}">
      <div class="cart-item-info">
        <div class="cart-item-brand">${i.brand}</div>
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-price">₹${(i.price * i.qty).toLocaleString('en-IN')}</div>
        <div style="font-size:11px;color:var(--warm-gray);margin-bottom:8px">Size: ${i.size}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${i.id},'${i.size}',-1)">−</button>
          <span class="qty-num">${i.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i.id},'${i.size}',1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i.id},'${i.size}')">×</button>
    </div>`
  ).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartSubtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('cartTotal').textContent    = '₹' + subtotal.toLocaleString('en-IN');
  footerEl.style.display = 'block';
}

function toggleCart() {
  const overlay  = document.getElementById('cartOverlay');
  const sidebar  = document.getElementById('cartSidebar');
  const isOpen   = sidebar.classList.contains('open');

  overlay.classList.toggle('open', !isOpen);
  sidebar.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function handleCheckout() {
  showToast('🛒 Redirecting to checkout…');
  setTimeout(() => toggleCart(), 800);
}

/* ════════════════════════════════════
   TESTIMONIALS
   ════════════════════════════════════ */

function buildTestimonials() {
  document.getElementById('testimonialsGrid').innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">
        ${'★'.repeat(t.rating).split('').map(() => '<span class="star">★</span>').join('')}
      </div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.initial}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-location">${t.loc}</div>
        </div>
      </div>
    </div>`
  ).join('');
}

/* ════════════════════════════════════
   NEWSLETTER
   ════════════════════════════════════ */

function handleNewsletter() {
  const el = document.getElementById('nlEmail');
  if (!el.value || !el.value.includes('@')) {
    showToast('⚠️ Please enter a valid email address');
    return;
  }
  showToast('🎉 Welcome! Check your inbox for a surprise.');
  el.value = '';
}

/* ════════════════════════════════════
   TOAST
   ════════════════════════════════════ */

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}
