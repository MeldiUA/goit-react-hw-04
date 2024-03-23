import { useEffect, useState } from 'react';

import { fetchPhotos } from '../api/searchPhotoApi';
import SearchBar from '../searchBar/SearchBar';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Loader from '../loader/Loader';
import ImageGallery from '../imageGallery/ImageGallery';
import ImageModal from '../imageModal/ImageModal';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgModal, setImgModal] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function getPhoto() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchPhotos(searchQuery, page);
        setPhotos(prevPhotos => {
          return [...prevPhotos, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getPhoto();
  }, [page, searchQuery]);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  const handleOpenModal = image => {
    setImgModal(image);
    setModalIsOpen(true);
  };

  const onRequestClose = () => {
    setModalIsOpen(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {<SearchBar onSearch={handleSearch} />}
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery
          items={photos}
          openModalImage={handleOpenModal}
        ></ImageGallery>
      )}
      {modalIsOpen && (
        <ImageModal
          image={imgModal}
          isOpen={modalIsOpen}
          onRequestClose={onRequestClose}
        ></ImageModal>
      )}
      {photos.length > 0 && !isLoading && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
      {isLoading && <Loader />}
    </div>
  );
}
