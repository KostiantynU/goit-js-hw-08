import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const refs = {
  galleryEl: document.querySelector('.gallery'),
};

const readyGalleryContent = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a></li>`;
  })
  .join('');

refs.galleryEl.innerHTML = readyGalleryContent;
const modalGallery = new SimpleLightbox('.gallery a', {
  captionType: 'attr',
  captionsData: 'alt',
  captionDelay: 250,
});
