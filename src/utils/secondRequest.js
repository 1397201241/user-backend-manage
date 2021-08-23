import axios from 'axios'

const instance = axios.create({
  // @ts-ignore
  timeout:'3000',
})

export default instance;
