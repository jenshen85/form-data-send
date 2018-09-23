import axios from 'axios';

axios.get('/index.html')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })