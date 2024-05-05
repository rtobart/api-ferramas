export const FILTERS = {
    CATEGORY: 'CATEGORY',
    NAME: 'NAME',
}
const filters = [FILTERS.CATEGORY, FILTERS.NAME]
export function validateCategoryFilter(name: string) {
    if (filters.includes(name.toUpperCase()) === false) return;
    return name.toUpperCase();
}
