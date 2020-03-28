// Carousel
const CAROUSEL = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel .carousel__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('carousel__item_active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('carousel__item_next', direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('carousel__item_next', direction);
    this.classList.add('carousel__item_active');
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function changeColor(currentItem) {
  if (items[currentItem].classList.contains('carousel__item_colored')) {
    CAROUSEL.classList.add('carousel_changed');
  } else {
    CAROUSEL.classList.remove('carousel_changed');
  }
}

document.querySelector('.carousel__control_left').addEventListener('click', function () {
  if (isEnabled) {
    previousItem(currentItem);
    changeColor(currentItem);
  }
});

document.querySelector('.carousel__control_right').addEventListener('click', function () {
  if (isEnabled) {
    nextItem(currentItem);
    changeColor(currentItem);
  }
});

const swipeDetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;
  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  }, false);

  surface.addEventListener('mouseup', function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if ((distX > 0)) {
          if (isEnabled) {
            previousItem(currentItem);
            changeColor(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
            changeColor(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  }, false);

  surface.addEventListener('touchstart', function (e) {
    if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
      if (e.target.classList.contains('left')) {
        if (isEnabled) {
          previousItem(currentItem);
          changeColor(currentItem);
        }
      } else {
        if (isEnabled) {
          nextItem(currentItem);
          changeColor(currentItem);
        }
      }
    }

    let touchObj = e.changedTouches[0];

    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  }, false);

  surface.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);

  surface.addEventListener('touchend', function (e) {
    let touchObj = e.changedTouches[0];

    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if ((distX > 0)) {
          if (isEnabled) {
            previousItem(currentItem);
            changeColor(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
            changeColor(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  }, false);
}

const el = document.querySelector('.carousel');

swipeDetect(el);