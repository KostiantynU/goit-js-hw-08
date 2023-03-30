// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const refs = {
  galleryEl: document.querySelector('.gallery'),
};

const modalGallery = new SimpleLightbox('.gallery a');

const readyGalleryContent = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a></li>`;
  })
  .join('');

refs.galleryEl.innerHTML = readyGalleryContent;
refs.galleryEl.addEventListener('click', disableHrefAndShowModal);

function disableHrefAndShowModal(event) {
  event.preventDefault();
  console.log(modalGallery);
  modalGallery.show();
  const { source } = event.target.dataset;
  const { alt } = event.target;

  //   createModal(source, alt);
}

// function createModal(source, alt) {
//   console.log(modalGallery.on('show.simplelightbox'));
// }
