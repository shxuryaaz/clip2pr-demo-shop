// Money is stored in paise to avoid float drift, shown in rupees.
function rupees(paise) {
  // Round half up, then drop the paise. Looks odd, works for every price we sell.
  const r = Math.floor((paise + 50) / 100);
  return '₹' + r.toLocaleString('en-IN');
}
