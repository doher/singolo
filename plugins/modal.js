Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function noop() { }

function _createModalFooter(buttons = []) {

  if (buttons.length === 0) {
    return document.createElement('div');
  }

  const FOOTER = document.createElement('div');

  FOOTER.classList.add('modal__footer');

  buttons.forEach(button => {
    const BUTTON = document.createElement('button');

    BUTTON.textContent = button.text;
    BUTTON.classList.add('modal__button');
    BUTTON.classList.add(`modal__button${button.type || ''}`);
    BUTTON.onclick = button.handler || noop;

    FOOTER.append(BUTTON);
  });

  return FOOTER;
}

function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modalBox = document.createElement('div');

  modalBox.classList.add('modal-box');
  modalBox.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-close="true">
      <div class="modal__window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal__header">
          <span class="modal__title">${options.title || ''}</span>
          ${options.closable ? `<span class="modal__close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="modal__body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `);

  const footer = _createModalFooter(options.footerButtons);

  footer.appendAfter(modalBox.querySelector('[data-content]'));
  document.body.append(modalBox);

  return modalBox;
}

$.modal = (options) => {
  const ANIMATION_SPEED = 200;
  const MODAL = _createModal(options);

  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      !closing && MODAL.classList.add('open');
    },
    close() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }

      closing = true;
      MODAL.classList.remove('open');
      MODAL.classList.add('hide');

      setTimeout(() => {
        MODAL.classList.remove('hide');
        closing = false;

        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED);
    }
  };

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  MODAL.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      MODAL.removeEventListener('click', listener);
      MODAL.parentNode.removeChild(MODAL);
      destroyed = true;
    },
    setContent(html) {
      MODAL.querySelector('[data-content]').innerHTML = html;
    }
  });
};

// Aside Menu

const HAMBURGER = document.querySelector('.hamburger');
const ASIDE = document.querySelector('.aside');

HAMBURGER.addEventListener('click', () => {
  HAMBURGER.classList.toggle('rotated');
  ASIDE.classList.toggle('open');
});