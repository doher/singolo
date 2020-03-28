const MENU = document.querySelector('.navigation');
const PORTFOLIO = document.querySelector('.project-wrapper');
const TAG_MENU = document.querySelector('.tags');
const HEADER_HAMBURGER = document.querySelector('.header__hamburger');
const ASIDE_HAMBURGER = document.querySelector('.aside__hamburger');
const ASIDE = document.querySelector('.aside');
const ASIDE_OVERLAY = document.querySelector('.aside__overlay');
const ASIDE_MENU = document.querySelector('.aside__navigation');
const FORM = document.querySelector('.quote__form');

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

function onScroll() {
  activeItemByScroll('services');
  activeItemByScroll('portfolio');
  activeItemByScroll('about');
  activeItemByScroll('contact');
}

function activeItemByScroll(id) {
  const links = document.querySelectorAll('.navigation a');
  const currentPosition = window.scrollY;
  const offsetTop = document.querySelector('#' + id).offsetTop;
  const offsetHeight = document.querySelector('#' + id).offsetHeight;

  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  if (currentPosition === 0) {
    links.forEach(a => {
      a.classList.remove('active');

      if (a.getAttribute('href').substring(1) === '') {
        a.classList.add('active');
      }
    });
  } else if (window.scrollY >= scrollHeight - window.innerHeight) {
    links.forEach(a => {
      a.classList.remove('active');

      if (a.getAttribute('href').substring(1) === 'contact') {
        a.classList.add('active');
      }
    });
  } else if (offsetTop <= currentPosition && (offsetTop + offsetHeight) > currentPosition) {
    links.forEach(a => {
      a.classList.remove('active');

      if (a.getAttribute('href').substring(1) === id) {
        a.classList.add('active');
      }
    });
  }
}

document.addEventListener('scroll', onScroll);
document.addEventListener('click', (event) => {
  const element = event.target;

  if (element.classList.contains('navigation__link')) {
    selectItem(event, MENU, 'navigation__link');
    selectItem(event, ASIDE_MENU, 'navigation__link');
    HEADER_HAMBURGER.classList.toggle('rotated');
    ASIDE_HAMBURGER.classList.toggle('rotated');
    ASIDE.classList.remove('open');
    ASIDE_OVERLAY.classList.remove('open');
  } else if (element.classList.contains('project-image')) {
    selectItem(event, PORTFOLIO, 'project-image')
  } else if (element.classList.contains('tag_bordered')) {
    makeRandomImages(event);
    selectItem(event, TAG_MENU, 'tag_bordered');
  } else if (element.classList.contains('hamburger')) {
    HEADER_HAMBURGER.classList.toggle('rotated');
    ASIDE_HAMBURGER.classList.toggle('rotated');
    ASIDE.classList.toggle('open');
    ASIDE_OVERLAY.classList.toggle('open');
  }
});

// Modal Box

const modal = $.modal({
  title: 'The letter was sent',
  closable: false,
  width: '300px',
  footerButtons: [
    {
      text: 'Ok',
      handler() {
        modal.close();
      }
    }
  ]
});

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