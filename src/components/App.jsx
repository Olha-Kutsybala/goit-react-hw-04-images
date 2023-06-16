import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import fetchImages from 'api';
import Searchbar from './searchbar';
import ImageGallery from './imageGallery';
import css from './App.module.css';
import Button from './button';
import Loader from './loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    const showImages = async () => {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(query, page);

        if (!totalHits) {
          setStatus('idle');
          Notify.failure('Sorry, there are no such images. Please try again.');
          return;
        }
        const normalizedImages = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setStatus('resolved');
        setTotalHits(totalHits);
      } catch (error) {
        setStatus('rejected');
      }
    };
    showImages();
  }, [page, query]);

  const handleSearch = query => {
    if (!query) {
      Notify.failure('Field is empty');
      return;
    }
    setQuery();
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const onNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showButton = status === 'resolved' && images.length !== totalHits;
  return (
    <div className={css.App}>
      <Searchbar handleSearch={handleSearch} />
      {images.length > 0 && <ImageGallery images={images} />}
      {status === 'pending' && <Loader />}
      {showButton && <Button onClick={onNextPage} />}
    </div>
  );
};

// class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     status: 'idle',
//     totalHits: 0,
//   };

//   componentDidUpdate = async (_, prevState) => {
//     const { page, query } = this.state;
//     if (page !== prevState.page || query !== prevState.query) {
//       this.fetchImages();
//     }
//   };

//   handleSearch = query => {
//     if (!query) {
//       Notify.failure('Field is empty');
//       return;
//     }
//     this.setState({ query, images: [], page: 1, totalHits: 0 });
//   };

//   onNextPage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   fetchImages = async () => {
//     const { page, query } = this.state;
//     try {
//       this.setState({ status: 'pending' });
//       const { totalHits, hits } = await fetchImages(query, page);

//       if (!totalHits) {
//         this.setState({ status: 'idle' });
//         Notify.failure('Sorry, there are no such images. Please try again.');
//         return;
//       }

//       const normalizedImages = hits.map(
//         ({ id, tags, webformatURL, largeImageURL }) => ({
//           id,
//           tags,
//           webformatURL,
//           largeImageURL,
//         })
//       );

//       this.setState(prevState => ({
//         images: [...prevState.images, ...normalizedImages],
//         status: 'resolved',
//         totalHits,
//       }));
//     } catch (error) {
//       this.setState({ status: 'rejected' });
//     }
//   };

//   render() {
//     const { status, images, totalHits } = this.state;
//     const showButton = status === 'resolved' && images.length !== totalHits;
//     return (
//       <div className={css.App}>
//         <Searchbar handleSearch={this.handleSearch} />
//         {images.length > 0 && <ImageGallery images={images} />}
//         {status === 'pending' && <Loader />}
//         {showButton && <Button onClick={this.onNextPage} />}
//       </div>
//     );
//   }
// }

export default App;
