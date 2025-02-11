const {default: axios} = require('axios');
    
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',
});

const getMenuCategory = () => axiosClient.get('/categories?populate=*');
const getCategoryList = () => axiosClient.get('/categories?populate=*');
const getProductList = () => axiosClient.get('/products?populate=*');
const getProductsByCategory = (category) => axiosClient.get('http://localhost:1337/api/products?filters[categories][name][$in]='+category+"&populate=*")
const registerUSer = (username,email,password) => axiosClient.post('/auth/local/register',{
    username:username,
    email:email,
    password:password
});

export default {
    getMenuCategory,     
    getCategoryList,     
    getProductList, 
    getProductsByCategory, 
    registerUSer
};