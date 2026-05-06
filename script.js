document.addEventListener('DOMContentLoaded', () => {
  const brandItems = document.querySelectorAll('.brand-item');
  brandItems.forEach((item) => item.classList.add('no-selection'));

  if (window.innerWidth > 768) {
    brandItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        brandItems.forEach((other) => other.classList.remove('no-selection'));
      });
      item.addEventListener('mouseleave', () => {
        brandItems.forEach((other) => other.classList.add('no-selection'));
      });
    });
  }
});
