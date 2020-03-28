// Switch on/off phone display
function switchDisplay(event) {
  const element = event.target;

  if (element.className.includes('phone__button')) {
    element.previousElementSibling.classList.toggle('phone-display__image_active');
  }
}

CAROUSEL.addEventListener('click', (event) => switchDisplay(event));
CAROUSEL.addEventListener('touchend', (event) => switchDisplay(event));