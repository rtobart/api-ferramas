export const FILTERS = {
    CATEGORY: 'CATEGORY',
    NAME: 'NAME',
    BRAND: 'BRAND',
    SKU: 'SKU'
}
const filters = [FILTERS.CATEGORY, FILTERS.NAME, FILTERS.BRAND, FILTERS.SKU]
export function validateCategoryFilter(name: string) {
    if (filters.includes(name.toUpperCase()) === false) return;
    return name.toUpperCase();
}
