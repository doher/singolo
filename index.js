const MENU = document.querySelector('.navigation');
const PORTFOLIO = document.querySelector('.project-wrapper');
const TAG_MENU = document.querySelector('.tags');

function randomFunction(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function makeRandomImages(event) {
  const element = event.target;

  if (element.className.includes('tag_bordered') && !element.className.includes('active')) {
    const imagesList = [...PORTFOLIO.querySelectorAll('.project-image')];
    let lengthList = imagesList.length;

    while (lengthList > 0) {
      let randomIndex = randomFunction(0, lengthList - 1);

      PORTFOLIO.append(imagesList[randomIndex]);
      imagesList.splice(randomIndex, 1);
      lengthList--;
    }
  }
}

function selectItem(event, block, classItem) {
  const element = event.target;

  if (element.className.includes(classItem)) {
    block.querySelectorAll('.' + classItem).forEach(el => el.classList.remove('active'));
    element.classList.add('active');
  }
}

MENU.addEventListener('click', (event) => selectItem(event, MENU, 'navigation__link'));
PORTFOLIO.addEventListener('click', (event) => selectItem(event, PORTFOLIO, 'project-image'));
TAG_MENU.addEventListener('click', (event) => {
  makeRandomImages(event);
  selectItem(event, TAG_MENU, 'tag_bordered');
});

// Carousel
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

document.querySelector('.carousel__control_left').addEventListener('click', function () {
  if (isEnabled) {
    const CAROUSEL = document.querySelector('.carousel');

    previousItem(currentItem);

    CAROUSEL.classList.toggle('carousel_changed');
  }
});

document.querySelector('.carousel__control_right').addEventListener('click', function () {
  if (isEnabled) {
    const CAROUSEL = document.querySelector('.carousel');

    nextItem(currentItem);

    CAROUSEL.classList.toggle('carousel_changed');
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
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
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
        }
      } else {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }
    var touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  }, false);

  surface.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);

  surface.addEventListener('touchend', function (e) {
    var touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if ((distX > 0)) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
    e.preventDefault();
  }, false);
}

var el = document.querySelector('.carousel');
swipeDetect(el);

// Switch on/off phone display
function switchDisplay(event) {
  const element = event.target;

  if (element.className.includes('phone__button')) {
    element.previousElementSibling.classList.toggle('phone-display__image_active');
  }
}

const CAROUSEL = document.querySelector('.carousel');

CAROUSEL.addEventListener('click', (event) => switchDisplay(event));

// Modal Box

const modal = $.modal({
  title: 'The letter was sent',
  closable: false,
  width: '40%',
  footerButtons: [
    {
      text: 'Ok',
      handler() {
        modal.close();
      }
    }
  ]
});

const FORM = document.querySelector('.quote__form');

FORM.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = FORM.querySelector('.input-name');
  const email = FORM.querySelector('.input-email');
  const subject = FORM.querySelector('.input-subject');
  const textarea = FORM.querySelector('.quote__textarea');
  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (name.value && (email.value).match(emailPattern)) {
    modal.setContent(`
        ${subject.value ? `<p>Subject: ${subject.value}</p>` : '<p>No subject</p>'}
        ${textarea.value ? `<p>Description: ${textarea.value}</p>` : '<p>No description</p`>'}
      `);
    modal.open();
    FORM.reset();
  }
});



