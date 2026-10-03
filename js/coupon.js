const COUPONS = {
  HACK20: 20,
  STUDENT10: 10,
};

const coupon = {
  percent: 0,

  apply(code) {
    const pct = COUPONS[code.trim().toUpperCase()];
    if (!pct) return false;
    this.percent += pct;
    return true;
  },

  discount(subtotal) {
    return Math.round(subtotal * this.percent / 100);
  },
};
