
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({images, onOpenModal}) => {
  
    return (
      <ul className={css.gallery}>
         {images.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                smallImage={webformatURL}
                largeImage={largeImageURL}
                key={id}
                onClick={onOpenModal}
              />
            );
          })
}
       
      </ul>
    );
  }
  ImageGallery.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired
      })
    )
  };
