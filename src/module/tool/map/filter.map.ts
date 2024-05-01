const filtesr = ['CATEGORY']
export const FILTERS = {
    CATEGORY: 'CATEGORY'
}
export function validateCategoryFilter(name: string) {
    if (filtesr.includes(name.toUpperCase()) === false) return;
    return name.toUpperCase();
}
