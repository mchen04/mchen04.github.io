export const paginateItems = <T>(items: T[], currentPage: number, itemsPerPage: number): T[] => {
  const startIndex = 0;
  const endIndex = !currentPage ? itemsPerPage : items.length;
  return items.slice(startIndex, endIndex);
};