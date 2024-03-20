import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ image, isOpen, onRequestClose }) {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onRequestClose();
    }
  };

  return (
    <div onClick={onRequestClose}>
      <Modal
        className={css.modalImgContainer}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        onKeyDown={handleKeyDown}
        contentLabel="Image Modal"
      >
        <div className={css.imageContainer}>
          <img src={image.urls.regular} alt={image.description} />
          <div className={css.imageMetadata}>
            <p>Author: {image.user.name}</p>
            <p>Likes: {image.likes}</p>
            <p>Description: {image.description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
