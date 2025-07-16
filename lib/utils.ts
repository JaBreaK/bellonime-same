export const triggerRipple = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const target = e.currentTarget;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  target.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
};
