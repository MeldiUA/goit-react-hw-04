import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import axios from 'axios';

import './App.css';
import { fetchPhotos } from './components/api/searchPhotoApi';
import SearchBar from './components/searchBar/SearchBar';
import ErrorMessage from './components/errorMessage/ErrorMessage';
import Loader from './components/loader/Loader';
import ImageList from './components/imageList/ImageList';
import ImageModal from './components/imageModal/ImageModal';

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgModal, setImgModal] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage(prevPage => prevPage + 1);
      }
    }, 200);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  return (
    <div>
      {<SearchBar onSearch={handleSearch} />}
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageList items={photos} openModalImage={handleOpenModal}></ImageList>
      )}
      {modalIsOpen && (
        <ImageModal
          image={imgModal}
          isOpen={modalIsOpen}
          onRequestClose={onRequestClose}
        ></ImageModal>
      )}
      {isLoading && <Loader />}
    </div>
  );
}
