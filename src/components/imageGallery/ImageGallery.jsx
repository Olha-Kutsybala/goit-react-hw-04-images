import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/imageGalleryItem';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.imageGallery}>
        {this.props.images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
