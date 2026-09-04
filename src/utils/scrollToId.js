export const scrollToId = (event, id) => {
  const target = document.getElementById(id);
  if (!target) return;
  if (event) event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
