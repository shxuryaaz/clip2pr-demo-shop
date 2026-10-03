const $ = id => document.getElementById(id);

function render() {
  const items = Object.entries(cart.lines);
  $('cart-items').innerHTML = items.length
    ? items.map(([id, qty]) => {
        const p = PRODUCTS.find(p => p.id === id);
        return `<li><span>${p.name} × ${qty}</span><span>${rupees(p.price * qty)}</span></li>`;
      }).join('')
    : '<li class="empty">Nothing here yet</li>';

  const sub = cart.subtotal();
  const off = coupon.discount(sub);
  $('subtotal').textContent = rupees(sub);
  $('discount').textContent = off ? '−' + rupees(off) : '₹0';
  $('total').textContent = rupees(sub - off);
  $('pay').disabled = sub === 0;
  $('receipt').textContent = '';
}

$('products').innerHTML = PRODUCTS.map(p => `
  <div class="product">
    <div class="emoji">${p.emoji}</div>
    <h3>${p.name}</h3>
    <p class="price">${rupees(p.price)}</p>
    <button data-id="${p.id}">Add to cart</button>
  </div>`).join('');

$('products').addEventListener('click', e => {
  const id = e.target.dataset.id;
  if (!id) return;
  cart.add(id);
  render();
});

$('coupon-form').addEventListener('submit', e => {
  e.preventDefault();
  const ok = coupon.apply($('coupon').value);
  $('coupon-msg').textContent = ok ? 'Coupon applied' : 'Invalid code';
  render();
});

// TODO: double clicks? Pay is disabled right after the first click, so we're fine.
$('pay').addEventListener('click', () => {
  $('pay').disabled = true;
  const sub = cart.subtotal();
  $('receipt').textContent = 'Paid ' + rupees(sub - coupon.discount(sub)) + '. Thanks!';
});

render();
