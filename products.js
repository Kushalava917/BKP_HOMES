const products = [
  { id: 1, name: "The Obsidian Sectional", category: "sofas", price: "₹1,45,000", image: "./images/product_sofa.png", desc: "A masterpiece of modern design with deep seating." },
  { id: 2, name: "Executive Leather Recliner", category: "sofas", price: "₹65,000", image: "./images/product_recliner.png", desc: "Premium grade leather with ergonomic luxury." },
  { id: 3, name: "Marble Dining Ensemble", category: "dining", price: "₹2,10,000", image: "./images/dining_set.png", desc: "Grand dining table combined with elegant walnut chairs." },
  { id: 4, name: "Classic Tufted King Bed", category: "bedroom", price: "₹1,15,000", image: "./images/bedroom_set.png", desc: "Upholstered king bed bringing regal elegance to the bedroom." },
  { id: 5, name: "Minimalist Media Cabinet", category: "bedroom", price: "₹45,000", image: "./images/product_cabinet.png", desc: "A sleek wooden console cabinet with soft-close drawers." },
  { id: 6, name: "Velvet Tufted Lounge", category: "sofas", price: "₹85,000", image: "./images/product_lounge.png", desc: "Luxurious velvet upholstery over a solid oak frame." },
  { id: 7, name: "Modern Round Table", category: "dining", price: "₹95,000", image: "./images/product_round_table.png", desc: "A compact marble and walnut dining table for intimate settings." },
  { id: 8, name: "Sand Accent Dresser", category: "bedroom", price: "₹55,000", image: "./images/product_dresser.png", desc: "Elegant bedroom storage crafted from pure hardwood." },
  { id: 9, name: "Bespoke Walnut Credenza", category: "dining", price: "₹72,000", image: "./images/product_credenza.png", desc: "Handcrafted dining storage perfect for premium cutlery." },
  { id: 10, name: "Emerald Velvet Sofa", category: "sofas", price: "₹1,10,000", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", desc: "Striking emerald velvet fabric paired with brass stiletto legs." },
  { id: 11, name: "Nordic Accent Chair", category: "sofas", price: "₹35,000", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", desc: "A beautiful amalgamation of bentwood and ergonomic fabric seating." },
  { id: 12, name: "Oak Bedside Table", category: "bedroom", price: "₹28,000", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80", desc: "Minimalist oak bedside table featuring soft-glide drawer systems." }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  const buttons = document.querySelectorAll('#filter-buttons .btn');

  function renderProducts(filter) {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach((product, index) => {
      const delay = index * 0.1;
      const card = document.createElement('div');
      
      // Fixed CSS here: using Flexbox on the card forcing it to height:100% and extending the text area so all grids match!
      card.innerHTML = `
        <div class="fade-up" style="display:flex; flex-direction:column; height: 100%; animation: fadeUp 0.6s ease forwards; opacity:0; transform:translateY(20px); animation-delay: ${delay}s; border: 1px solid var(--border-color); border-radius: 4px; overflow:hidden; background: var(--bg-secondary); cursor: pointer; transition: transform var(--transition-fast);">
          <div style="height: 250px; flex-shrink: 0; overflow: hidden;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"/>
          </div>
          <div style="padding: 1.5rem; display:flex; flex-direction:column; flex-grow:1;">
            <h3 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 0.5rem;">${product.name}</h3>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 1.5rem; flex-grow:1;">${product.desc}</p>
            <p style="color: var(--accent-color); font-size: 0.875rem; text-transform:uppercase; letter-spacing:0.05em; font-weight: bold; margin:0;">${product.price}</p>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    if (!document.getElementById('fade-up-keyframes')) {
      const style = document.createElement('style');
      style.id = 'fade-up-keyframes';
      style.innerHTML = `
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Initial render
  setTimeout(() => renderProducts('all'), 100);

  // Filtering logic
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      buttons.forEach(b => {
        b.classList.remove('btn-primary');
      });
      btn.classList.add('btn-primary');
      
      const filter = btn.getAttribute('data-filter');
      renderProducts(filter);
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
     const matchingBtn = document.querySelector(`button[data-filter="${categoryParam}"]`);
     if (matchingBtn) matchingBtn.click();
  }
});
