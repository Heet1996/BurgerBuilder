import axios from 'axios';
const instance=axios.create({
    baseURL:'https://react-burgerbuilder-a3bac.firebaseio.com/'
});

export default instance;