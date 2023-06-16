import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const rootModal = document.querySelector('#root_modal');

const Modal = ({ largeImageURL, alt, onClose }) => {
  useEffect(() => {
    const handleESC = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleESC);
    return () => {
      window.removeEventListener('keydown', handleESC);
    };
  }, [onClose]);

  const handleOverlay = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div onClick={handleOverlay} className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>,
    rootModal
  );
};
// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.keyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.keyDown);
//   }

//   handleESC = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlay = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImageURL, alt } = this.props;

//     return createPortal(
//       <div onClick={this.handleOverlay} className={css.overlay}>
//         <div className={css.modal}>
//           <img src={largeImageURL} alt={alt} />
//         </div>
//       </div>,
//       rootModal
//     );
//   }
// }

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
