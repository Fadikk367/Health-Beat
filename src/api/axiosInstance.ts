import axios from 'axios';

const baseURL = 'http://healthbeatserverv2-env.eba-xhqnqefn.eu-central-1.elasticbeanstalk.com/';
const instance = axios.create({ baseURL });

export default instance;