import { Component } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { fetchImagesWithQuery } from './helpers/api';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { notificationOptions } from './Notification/Notification';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    isError: false,
    images: [],
    page: 1,
    isShowModal: false,
    isButtonLoad: false,
    largeImage: '',
    id: '',
  };
  cancelTokenSource = axios.CancelToken.source();

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery || page !==prevState.page) {
      this.setState({ isLoading: true, });
      this.fetchImages(searchQuery, page);
    };

    if (searchQuery !== prevState.searchQuery) {
      this.setState({
        images: [],
        isButtonLoad: false,
      });
    };
  }

  componentWillUnmount() {
    this.cancelTokenSource.cancel('Component is being unmounted');
  }

  fetchImages = async (searchQuery, page) => {
    this.setState({ isLoading: true });

    try {
      const newImages = await fetchImagesWithQuery(searchQuery, page);

      if (newImages.length === 0) {
        this.setState({
          isButtonLoad: false,
        })
        return toast.info(
          'No images found. Please try another search query',
          notificationOptions
        );
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        isButtonLoad: true,
      }))
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  fetchMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (largeImage, id) => {
    this.setState(prevState => ({
      isShowModal: !prevState.isShowModal,
      largeImage,
      id,
    }));
  };

  handleSearchQuery = searchQuery => {
    if (searchQuery === '') {
      this.setState({
        images: [],
        isButtonLoad: false,
      });
      return toast.warn('Please enter search query', notificationOptions);
    }
    this.setState({ searchQuery, page: 1 });
  };

  render() {
    const { images, isLoading, isShowModal, isButtonLoad, largeImage, id } =
      this.state;
    const { handleSearchQuery, fetchMoreImages, toggleModal } = this;
    return (
      <div className={css.container}>
        <Searchbar onChange={handleSearchQuery} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onOpenModal={toggleModal} />
        {isButtonLoad && <Button loadMore={fetchMoreImages} />}
        <ToastContainer />
        {isShowModal && 
          <Modal largeImage={largeImage} id={id} onClose={toggleModal} />
        }
      </div>
    );
  }
}
