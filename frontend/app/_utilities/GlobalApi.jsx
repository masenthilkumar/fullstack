import { Item } from '@radix-ui/react-dropdown-menu';

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

const SignIn = (email,password) => axiosClient.post('/auth/local',{
    identifier:email,
    password:password
});

const addToCart = (data,jwt) => axiosClient.post('/user-carts',data,{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer`+jwt
      }
    
});

//const getCartItems=(userid,jwt) => axiosClient.get('user-carts?filters[userid][$eq]='+userid+'&populate=*',{
const getCartItems=(userid,jwt) => axiosClient.get('user-carts?filters[userid][$eq]='+userid+'&[populate][products][populate][image][fields][0]=url',{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer`+jwt
      }
}).then(resp=>{
   // return resp.data.data
   const data = resp.data.data;

   // Extract required fields
   const cartItemList = data.map((item) => ({
       id: item.products?.id,
       name: item.products?.name,
       price: item.products?.sellingprice, // Fetching selling price
       imageUrl: item.products?.image?.url // Fetching image URL
   }));

   console.log("Extracted Cart Items:", cartItemList);
   return cartItemList;
}).catch(error => {
   console.error("Error fetching cart items:", error);
   return [];
});


export default {
    getMenuCategory,     
    getCategoryList,     
    getProductList, 
    getProductsByCategory, 
    registerUSer,
    SignIn,
    addToCart,
    getCartItems
};