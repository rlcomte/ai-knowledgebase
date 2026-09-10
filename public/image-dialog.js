(function () {
  const imageSelector = 'main img';
  const enhancedClass = 'kb-expandable-image';
  let dialog;
  let dialogImage;
  let closeButton;
  let previousFocus;

  function isSvgImage(image) {
    const source = image.currentSrc || image.src || image.getAttribute('src');

    if (!source) {
      return false;
    }

    try {
      return new URL(source, window.location.href).pathname.endsWith('.svg');
    } catch {
      return source.split('?')[0].endsWith('.svg');
    }
  }

  function ensureDialog() {
    if (dialog) {
      return;
    }

    dialog = document.createElement('dialog');
    dialog.className = 'kb-image-dialog';
    dialog.setAttribute('aria-label', 'Expanded image');
    dialog.innerHTML = [
      '<div class="kb-image-dialog__frame">',
      '<button class="kb-image-dialog__close" type="button" aria-label="Close expanded image">X</button>',
      '<img class="kb-image-dialog__image" alt="" />',
      '</div>'
    ].join('');

    closeButton = dialog.querySelector('.kb-image-dialog__close');
    dialogImage = dialog.querySelector('.kb-image-dialog__image');

    closeButton.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.addEventListener('close', () => {
      dialogImage.removeAttribute('src');
      dialogImage.alt = '';

      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    });

    document.body.append(dialog);
  }

  function openDialog(image) {
    ensureDialog();

    previousFocus = document.activeElement;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt || '';
    dialog.showModal();
    closeButton.focus();
  }

  function enhanceImages(root) {
    root.querySelectorAll(imageSelector).forEach((image) => {
      if (!(image instanceof HTMLImageElement) || !isSvgImage(image) || image.classList.contains(enhancedClass)) {
        return;
      }

      image.classList.add(enhancedClass);
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', image.alt ? `Expand image: ${image.alt}` : 'Expand image');

      if (!image.hasAttribute('tabindex')) {
        image.tabIndex = 0;
      }
    });
  }

  document.addEventListener('click', (event) => {
    const image = event.target.closest(`img.${enhancedClass}`);

    if (image instanceof HTMLImageElement && isSvgImage(image)) {
      openDialog(image);
    }
  });

  document.addEventListener('keydown', (event) => {
    const image = event.target;

    if (!(image instanceof HTMLImageElement) || !image.classList.contains(enhancedClass)) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDialog(image);
    }
  });

  function init() {
    enhanceImages(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  document.addEventListener('astro:page-load', init);
})();
