export const toBanglaNumber = (value) => {
  if (value === null || value === undefined) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return value.toString().replace(/\d/g, (digit) => banglaDigits[digit]);
};

export const toBanglaUnit = (unit) => {
  if (!unit) return '';
  const unitMap = {
    kg: 'কেজি',
    g: 'গ্রাম',
    gram: 'গ্রাম',
    liter: 'লিটার',
    ltr: 'লিটার',
    litre: 'লিটার',
    ml: 'মিলি',
    piece: 'পিস',
    pcs: 'পিস',
    pc: 'পিস',
    dozen: 'ডজন',
    hali: 'হালি',
    packet: 'প্যাকেট',
    pack: 'প্যাকেট',
    box: 'বক্স',
    bundle: 'আঁটি',
    ton: 'টন',
    mon: 'মণ'
  };

  // Match case-insensitively and trim spaces
  const normalized = unit.toString().toLowerCase().trim();
  return unitMap[normalized] || unit; // Falls back to original if not found
};