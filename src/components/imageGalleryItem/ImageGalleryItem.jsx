import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const onOpenModal = () => {
    // this.setState(({ showModal }) => ({ showModal: !showModal }));
    setShowModal(!showModal);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={onOpenModal}
        className={css.imageGalleryItem_image}
      />
      {showModal && (
        <Modal onClose={onOpenModal} largeImageURL={largeImageURL} alt={tags} />
      )}
    </li>
  );
};

// class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   onOpenModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   render() {
//     const { webformatURL, largeImageURL, tags } = this.props;
//     return (
//       <li className={css.imageGalleryItem}>
//         <img
//           src={webformatURL}
//           alt={tags}
//           onClick={this.onOpenModal}
//           className={css.imageGalleryItem_image}
//         />
//         {this.state.showModal && (
//           <Modal
//             onClose={this.onOpenModal}
//             largeImageURL={largeImageURL}
//             alt={tags}
//           />
//         )}
//       </li>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
