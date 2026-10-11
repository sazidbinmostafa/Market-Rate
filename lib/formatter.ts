export const toBanglaNumber = (num: number | string): string => {
  if (num === undefined || num === null) return "";
  
  const banglaDigits: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  
  return num.toString().replace(/[0-9]/g, (digit) => banglaDigits[digit]);
};

export const unitToBanglaMap: Record<string, string> = {
  kg: 'কেজি',
  litre: 'লিটার',
  dozen: 'ডজন',
  piece: 'পিস',
};

export function toBanglaUnit(unit: string): string {
  if (!unit) return '';
  const normalizedUnit = unit.toLowerCase().trim();
  return unitToBanglaMap[normalizedUnit] || unit;
}