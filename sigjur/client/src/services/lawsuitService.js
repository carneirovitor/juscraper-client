
import axios from 'axios';

export default {
  get: async () => {
    var res = await axios.get(`/api/lawsuit/`);
    const lawsuit = res.data;
    return lawsuit;
  }
}