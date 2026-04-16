// Products data
const products = [
{ icon: '🌾', name: 'Beras Premium', price: 'Rp 13.500', unit: 'per kg / min. 5 kg', badge: 'hot', badgeText: 'Laris', cat: 'beras' },
{ icon: '🍘', name: 'Beras Medium', price: 'Rp 11.000', unit: 'per kg', badge: '', cat: 'beras' },
{ icon: '🌾', name: 'Tepung Terigu', price: 'Rp 9.000', unit: 'per kg', badge: '', cat: 'beras' },
{ icon: '🛢️', name: 'Minyak Goreng', price: 'Rp 17.000', unit: 'per liter', badge: '', cat: 'minyak' },
{ icon: '🍬', name: 'Gula Pasir', price: 'Rp 14.000', unit: 'per kg', badge: 'new', badgeText: 'Baru', cat: 'minyak' },
{ icon: '🧂', name: 'Garam Dapur', price: 'Rp 3.000', unit: 'per bungkus 250g', badge: '', cat: 'minyak' },
{ icon: '🧄', name: 'Bawang Merah', price: 'Rp 35.000', unit: 'per kg', badge: '', cat: 'minyak' },
{ icon: '🧅', name: 'Bawang Putih', price: 'Rp 32.000', unit: 'per kg', badge: '', cat: 'minyak' },
{ icon: '🍜', name: 'Mi Instan (dus)', price: 'Rp 115.000', unit: '40 bungkus / dus', badge: 'promo', badgeText: 'Promo', cat: 'lainnya' },
{ icon: '🥚', name: 'Telur Ayam', price: 'Rp 27.000', unit: 'per kg', badge: 'hot', badgeText: 'Laris', cat: 'lainnya' },
{ icon: '☕', name: 'Kopi Sachet (box)', price: 'Rp 35.000', unit: '10 sachet / box', badge: '', cat: 'minuman' },
{ icon: '🧃', name: 'Teh Celup (box)', price: 'Rp 12.000', unit: '25 kantong / box', badge: '', cat: 'minuman' },
{ icon: '🥛', name: 'Susu UHT', price: 'Rp 6.500', unit: 'per kotak 200ml', badge: 'new', badgeText: 'Baru', cat: 'minuman' },
{ icon: '🍫', name: 'Milo Sachet (box)', price: 'Rp 42.000', unit: '10 sachet / box', badge: '', cat: 'minuman' },
{ icon: '🫙', name: 'Kecap Manis', price: 'Rp 9.500', unit: 'per botol 135ml', badge: '', cat: 'lainnya' },
{ icon: '🧼', name: 'Sabun Cuci Piring', price: 'Rp 8.000', unit: 'per botol 400ml', badge: '', cat: 'lainnya' },
{ icon: '🧴', name: 'Sunsilk', price: 'Rp 13.500', unit: 'per sachet 9ml', badge: '', cat: 'shampo' },
];

function renderProducts(filter)
{
const grid = document.getElementById('products-grid');
const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
grid.innerHTML = filtered.map(p => `
    <div class="product-card">
    ${p.badge ? `<div class="product-badge badge-${p.badge}">${p.badgeText}</div>` : ''}
    <span class="product-icon">${p.icon}</span>
    <div class="product-name">${p.name}</div>
    <div class="product-price">${p.price}</div>
    <div class="product-unit">${p.unit}</div>
    <button class="add-btn" onclick="addToCart('${p.name}', '${p.price}')">🛒 Keranjang</button>
    </div>
`).join('');
}

function filterProducts(cat, btn)
{
document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
renderProducts(cat);
}

function addToWA(name, price) {
const msg = encodeURIComponent(`Halo, saya ingin memesan *${name}* (${price}). Apakah stok tersedia?`);
window.open(`https://wa.me/6282325565813?text=${msg}`, '_blank');
}

function submitOrder()
{
window.open('https://wa.me/6282325565813?text=' + encodeURIComponent('Halo, saya ingin memesan dari Toko Berkah Mandiri.'), '_blank');
}

renderProducts('all');

// Countdown to 21:00
function updateCountdown() {
const now = new Date();
const end = new Date(now);
end.setHours(21, 0, 0, 0);
if (now > end) end.setDate(end.getDate() + 1);
const diff = end - now;
const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
const el = document.getElementById('countdown');
if (el) el.textContent = `${h}:${m}:${s}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
