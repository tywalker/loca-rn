import axios from 'axios';

export const fetchExample = () => {
  axios('https://jsonplaceholder.typicode.com/posts/1')
    .then( res => console.warn(res));
}
