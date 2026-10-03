const PRODUCTS = [
  { id: 'tee', name: 'Hackdays Tee', emoji: '👕', price: 79900 },
  { id: 'hoodie', name: 'HackBase Hoodie', emoji: '🧥', price: 149900 },
  { id: 'stickers', name: 'Sticker Pack', emoji: '✨', price: 9900 },
];

const cart = {
  lines: {},

  add(id) {
    // qty || 0 because the first add has no line yet
    this.lines[id] = (this.lines[id] || 0) + 1;
  },

  subtotal() {
    let sum = 0;
    for (const id in this.lines) {
      const p = PRODUCTS.find(p => p.id == id); // loose compare on purpose, ids may come from data attributes
      sum += p.price * this.lines[id];
    }
    return sum;
  },
};
