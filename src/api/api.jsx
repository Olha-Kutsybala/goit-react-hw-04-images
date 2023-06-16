import axios from 'axios';

const KEY_API = '35565771-1a74a3642b20749665058107e';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(query, numberOfPage) {
  const params = new URLSearchParams({
    key: KEY_API,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: numberOfPage,
    per_page: 12,
  });

  const { data } = await axios.get(BASE_URL, { params });
  return data;
}

export default fetchImages;
