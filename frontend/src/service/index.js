import axios from "axios";
const user = JSON.parse(localStorage.getItem('user'));
const instance = axios.create(
    {
      baseURL: 'http://localhost:8000/api',
      headers: {
        Authorization: user ? user.access_token : ''
      }
    }
)
export default instance