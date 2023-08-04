import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({id, smallImage, largeImage, onClick}) => {
  return(<li className={css.galleryItem} key={id}>
    <img src={smallImage} alt={id} className={css.galleryImage} onClick={()=>onClick(largeImage, id)}/>
  </li>)  
}

ImageGalleryItem.propTypes = {
smallImage:PropTypes.string.isRequired,
largeImage:PropTypes.string.isRequired,
onClick: PropTypes.func.isRequired,
}