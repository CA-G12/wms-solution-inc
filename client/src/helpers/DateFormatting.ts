export const formatDate = (date: Date | null): string => {
  const _date = new Date(
    date?.toLocaleString('en-US') || new Date().toLocaleDateString()
  );
  return _date.toLocaleDateString();
};
