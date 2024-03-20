import css from './ImageCard.module.css';

export default function ImageCard({ img, openModalImage }) {
  const handleClickImg = () => {
    openModalImage(img);
  };
  return (
    <div className={css.imageContainer}>
      <img
        src={img.urls.small}
        alt={img.alt_description}
        onClick={handleClickImg}
      />
    </div>
  );
}
