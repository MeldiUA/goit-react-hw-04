import ImageCard from '../imageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ items, openModalImage }) {
  return (
    <ul className={css.imageList}>
      {items.map(item => (
        <li className={css.imageItem} key={item.id}>
          <ImageCard img={item} openModalImage={openModalImage}></ImageCard>
        </li>
      ))}
    </ul>
  );
}
