// Shopping Cart System
let cart = [];

// Inisialisasi keranjang dari localStorage
function initCart() {
  const savedCart = localStorage.getItem('berkah_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}

// Tambah produk ke keranjang
function addToCart(productName, productPrice) {
  // Parse harga dari format "Rp X.XXX"
  const price = parseInt(productPrice.replace(/[^\d]/g, ''));

  // Cek apakah produk sudah ada di keranjang
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: Date.now(),
      name: productName,
      price: price,
      quantity: 1
    });
  }

  saveCart();
  updateCartDisplay();
  showNotification(productName + ' ditambahkan ke keranjang!', 'success');
}

// Update keseluruhan tampilan keranjang
function updateCartDisplay() {
  updateCartCount();
  updateCartItems();
  updateCartSummary();
}

// Update jumlah item di cart badge
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

// Update tampilan item di keranjang dengan animasi smooth
function updateCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="cart-empty"><span class="cart-empty-icon">🛒</span><p>Keranjang belanja kosong</p></div>';
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item" style="animation: slideInItem 0.3s ease-out ${index * 0.08}s both;">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>Rp ${formatCurrency(item.price)}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" onclick="increaseQty(${index})">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
    </div>
  `).join('');
}

// Inject animasi CSS untuk cart items
const cartAnimStyle = document.createElement('style');
cartAnimStyle.textContent = `
  @keyframes slideInItem {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .cart-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    gap: 12px;
    padding: 40px 20px;
  }
  .cart-empty-icon {
    font-size: 56px;
    opacity: 0.4;
  }
  .cart-empty p {
    font-size: 16px;
    color: #888;
    font-weight: 500;
  }
  .cart-item {
    animation: slideInItem 0.3s ease-out both;
    background: #fafafa;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 12px;
    transition: all 0.2s ease;
  }
  .cart-item:hover {
    background: #f0f0f0;
    transform: translateX(-2px);
  }
  .qty-value {
    font-weight: 600;
    min-width: 28px;
    text-align: center;
    display: inline-block;
  }
  .remove-btn {
    background: #ffebee;
    color: #e53935;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s ease;
  }
  .remove-btn:hover {
    background: #e53935;
    color: white;
  }
`;
document.head.appendChild(cartAnimStyle);

// Update ringkasan harga
function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.02);
  const total = subtotal + tax;

  document.getElementById('subtotal').textContent = 'Rp ' + formatCurrency(subtotal);
  document.getElementById('tax').textContent = 'Rp ' + formatCurrency(tax);
  document.getElementById('total').textContent = 'Rp ' + formatCurrency(total);
}

// Format currency (tanpa Rp, hanya angka)
function formatCurrency(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Tambah kuantitas item
function increaseQty(index) {
  cart[index].quantity++;
  saveCart();
  updateCartDisplay();
}

// Kurangi kuantitas item
function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    removeFromCart(index);
    return;
  }
  saveCart();
  updateCartDisplay();
}

// Hapus produk dari keranjang
function removeFromCart(index) {
  const removedItem = cart[index].name;
  cart.splice(index, 1);
  saveCart();
  updateCartDisplay();
  showNotification(removedItem + ' dihapus dari keranjang', 'info');
}

// Toggle keranjang sidebar dengan animasi smooth
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');

  // Animasi smooth dengan delay kecil untuk efek lebih halus
  if (sidebar.classList.contains('active')) {
    // Tutup - langsung tutup tanpa delay
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  } else {
    // Buka - tambahkan class animate terlebih dahulu
    sidebar.classList.add('active');
    overlay.classList.add('active');
    // Focus pada container keranjang untuk accessibility
    setTimeout(() => {
      document.getElementById('cart-items')?.focus();
    }, 300);
  }
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Keranjang Anda kosong!');
    return;
  }

  // Ambil data customer dari form
  const custName = document.getElementById('cust-name')?.value || '-';
  const custPhone = document.getElementById('cust-phone')?.value || '-';
  const custAddress = document.getElementById('cust-address')?.value || '-';
  const custOrderType = document.getElementById('cust-ordertype')?.value || '-';
  const custQty = document.getElementById('cust-qty')?.value || '-';
  const custNotes = document.getElementById('cust-notes')?.value || '-';

  // Buat ringkasan pesanan
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  let orderSummary = '*🛒 RINGKASAN PESANAN*' + '\n';
  orderSummary += '═════════════════════════' + '\n\n';

  // Data customer
  orderSummary += '👤 *DATA PELANGGAN*' + '\n';
  orderSummary += '────────────────────────' + '\n';
  orderSummary += 'Nama Lengkap     : ' + custName + '\n';
  orderSummary += 'No. WhatsApp   : ' + custPhone + '\n';
  orderSummary += 'Alamat Pengiriman: ' + custAddress + '\n';
  orderSummary += 'Jenis Pesanan  : ' + custOrderType + '\n';
  orderSummary += 'Jumlah        : ' + custQty + '\n';
  orderSummary += 'Catatan       : ' + custNotes + '\n\n';
  orderSummary += '═════════════════════════' + '\n\n';

  orderSummary += '📦 *DAFTAR PESANAN*' + '\n';
  orderSummary += '────────────────────────' + '\n';

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    orderSummary += '✓ ' + item.name + '\n';
    orderSummary += '  Rp ' + formatCurrency(item.price) + ' x ' + item.quantity + ' = Rp ' + formatCurrency(itemTotal) + '\n';
  });

  orderSummary += '\n═════════════════════════' + '\n';
  orderSummary += 'Subtotal    : Rp ' + formatCurrency(subtotal) + '\n';
  orderSummary += 'Pajak (10%): Rp ' + formatCurrency(tax) + '\n';
  orderSummary += '*TOTAL     : Rp ' + formatCurrency(total) + '*\n\n';
  orderSummary += '═════════════════════════' + '\n';
  orderSummary += '📍 *Metode Pembayaran*:' + '\n';
  orderSummary += '• Tunai (Ambil di toko)' + '\n';
  orderSummary += '• QRIS' + '\n';
  orderSummary += '• Transfer Bank' + '\n';
  orderSummary += '• Cicilan (khusus belanja >= Rp 500.000)' + '\n\n';
  orderSummary += '📦 *Pengiriman*:' + '\n';
  orderSummary += '• Ambil di toko (gratis)' + '\n';
  orderSummary += '• Antar ke rumah (+Rp 3.000/km)';

  // Kirim ke WhatsApp
  const phone = '6282325565813';
  const text = encodeURIComponent(orderSummary);
  window.open('https://wa.me/' + phone + '?text=' + text, '_blank');

  // Clear cart setelah checkout
  cart = [];
  saveCart();
  updateCartDisplay();
  toggleCart();
  showNotification('Pesanan dikirim ke WhatsApp!', 'success');
}

// Simpan keranjang ke localStorage
function saveCart() {
  localStorage.setItem('berkah_cart', JSON.stringify(cart));
}

// Tampilkan notifikasi
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = 'notification notification-' + type;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animasi tampil
  setTimeout(() => notification.classList.add('show'), 10);

  // Hilang otomatis setelah 3 detik
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initCart);
