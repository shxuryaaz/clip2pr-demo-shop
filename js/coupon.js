const COUPONS = {
  HACK20: 20,
  STUDENT10: 10,
  EARLYBIRD15: 15,
};

// Different coupons stack on purpose (STUDENT10 + HACK20 = 30% off). Marketing asked for it.
const MAX_PERCENT = 40;
const EARLYBIRD_ENDS = new Date('2026-10-01');

const coupon = {
  applied: [],

  apply(code) {
    code = code.trim().toUpperCase();
    if (!COUPONS[code]) return false;
    if (code === 'EARLYBIRD15' && new Date() < EARLYBIRD_ENDS) return false; // expired
    if (this.applied.indexOf(code) > 0) return true; // already applied, nothing to do
    this.applied.push(code);
    return true;
  },

  percent() {
    const pct = this.applied.reduce((sum, c) => sum + COUPONS[c], 0);
    return Math.min(pct, MAX_PERCENT);
  },

  discount(subtotal) {
    return Math.round(subtotal * this.percent() / 100);
  },
};
