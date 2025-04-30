import axios from 'axios';
import { useAuthenticateStore } from '@/stores/authenticate';

export const apiUrl = axios.create({
    baseURL: 'http://35.196.79.227:8000', 
});
function authHeaders() {
    const authStore = useAuthenticateStore();
    const token = authStore.token;

    return {
        'Authorization': `Bearer ${token}`
    };
}

export async function login(credentials) {
    try {
        const response = await apiUrl.post('/login', credentials); 
        return response;
    }catch (error) {
        throw error;
    }
}

export async function ferify() {
    try {
        const response = await apiUrl.get('/verify-token', {
            headers: {...authHeaders()}
        }); 
        return response;
    }catch (error) {

    throw error;
    }
}
export async function renewToken() {
    try {
        const response = await apiUrl.post('/renew-token', null, {
            headers: {...authHeaders()}
        }); 
        
        return response;
    }catch (error) {
    throw error;
    }
}

export async function register(credentialsRegister) {
    try {
        const response = await apiUrl.post('/register', credentialsRegister); 
        return response;
    }catch (error) {
        throw error;
    }
}

export async function getCategories() {
    
    try{
        const response = await apiUrl.get(`/categories/user/10`);
        return response;
    }catch(error){
        throw error;

    }
}

export async function createProduct(productsinfo) {
    try {
        const response = await apiUrl.post('/products', productsinfo, { 
            headers: {
                ...authHeaders(),
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data; 
    }catch (error) {
        
        throw error;
    }
}

export async function createCategorie (categoryData) {
    try{
        if(categoryData.name != ""){
            const response = await apiUrl.post('/categories', categoryData,{
                headers: {
                    ...authHeaders(),
                    'Content-Type': 'multipart/form-data',
                }
                });
        return response;
    }else{

    }
    }catch(error){
        throw error;
    }
    
}


export async function editCategoryService (category_id, categoryData) {
    try{
        const response = await apiUrl.put(`/categories/${category_id}`, categoryData,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json' 
                }
                });
                
        return response;
        
    }catch(error){
        throw error;
    }
}

export async function deleteCategorieService(category_id) {
    try{
        const response = await apiUrl.delete(`/categories/${category_id}`,{
            headers: {
                ...authHeaders(),
                
            }
        })
    }catch(error){
        throw error;
    }
}

export async function getProductsService() {
    try{
        const response = await apiUrl.get(`/products/user/10`)
        return response
        
    }catch(error){
        throw error;
    }
}

export async function getProductsById(product_id) {
    try{
        const response = await apiUrl.get(`/products/${product_id}`)
        return response
        
    }catch(error){
        throw error;
    }
}

export async function getProductsServiceCategory(category_id) {
    try{
        const response = await apiUrl.get(`/products/category/${category_id}`,{
            headers: {
                ...authHeaders(),
            }
        })
        return response
    }catch(error){
        throw error;
    }
}

export async function getCategoryById(category_id) {
    try{
        const response = await apiUrl.get(`/categories/${category_id}`,{
            headers: {
                ...authHeaders(), 
                
            }
        })
        return response
    }catch(error){
        throw error;
    }
}

export async function addItemCart(item) {
    try{
        const response = await apiUrl.post('/cart/items', item,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json' 
            }
        })
        return response;
    }catch(error){
        throw error;
    }
    
}

export async function createCart() { 
    try{
        const response = await apiUrl.post('/cart',null,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response.data; 
    }catch(error){
        throw error;
    }
    
}

export async function getItemsCart() {  
    try{
        const response = await apiUrl.get('/cart/items',{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response.data; 
    }catch(error){
        throw error;
    }
    
}
export async function getAllCart() {  
    try{
        const response = await apiUrl.get('/cart',{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response.data; 
    }catch(error){
        throw error;
    }
    
}
export async function deleteProductcart(product_id) {
    try{
        const response = await apiUrl.delete('/cart/items',{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json'
            },
            data: product_id
        })
        return response
    }catch(error){
        throw error;
    }
}

export async function addAddresses(address) {
    try{
        const response = await apiUrl.post('/addresses', address,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json' 
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}
export async function getAllAddresses() {
    try{
        const response = await apiUrl.get('addresses',{
            headers: {
                ...authHeaders(),
            }
        })
        return response
    }catch(error){
        throw error;
    }
}


export async function  sendOrders(order) {
    try{
        const response = await apiUrl.post('/orders', order,{
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json' 
            }
        })
     
        return response
    }catch(error){
        throw error;
    }
    
}
export async function createCoupom(coupon) {
    try{
        const response = await apiUrl.post('/coupons', coupon, {
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}
export async function getAllCoupons() {
    try{
        const response = await apiUrl.get('/coupons', {
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}
export async function getAllCouponByid(coupon_id) {
    try{
        const response = await apiUrl.get(`/coupons/${coupon_id}`, {
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}
export async function editCoupon (coupon_id, couponData) {
    try{
        const response = await apiUrl.put(`/coupons/${coupon_id}`, couponData,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json' 
                }
                });
        return response;
        
    }catch(error){
        throw error;
    }
}
export async function editProduct (product_id, productsinfo) {
    try{
        const response = await apiUrl.put(`/products/${product_id}`, productsinfo,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json' 
                }
                });
                return response;
        
    }catch(error){
        throw error;
    }
}

 export async function deleteCouponService(coupon_id) {
    try{
        const response = await apiUrl.delete(`/coupons/${coupon_id}`,{
            headers: {
                ...authHeaders(),   
            }
        })
 
        return response
    }catch(error){
    
        throw error;
    }
}

export async function deleteProductService(product_id) {

        const response = await apiUrl.delete(`/products/${product_id}`,{
            headers: {
                ...authHeaders(),   
            },
            validateStatus: (status) => true // sempre resolve, nunca lança erro
        })

        return response
    
}

export async function editUser(userData) {
    try{
        const response = await apiUrl.put('/users/me',userData,{
            headers: {
                ...authHeaders(),   
                'Content-Type': 'application/json'
            }
        })
        alert("Emaileditado com sucesso"+ response.data)
        return response
    }catch(error){
        throw error;
       
    }
}
export async function createDiscounts(discount) {
    try{
        const response = await apiUrl.post('/discounts', discount, {
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response;
    }catch(error){
        throw error;

    }
}
export async function getAllDiscounts() {
    try{
        const response = await apiUrl.get('/discounts', {
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json'
            }
        })
        return response;
    }catch(error){
        throw error;
    }
}


export async function editDiscountsService(discounts, discount_id) {
    try{
        const response = await apiUrl.put(`/discounts/${discount_id}`,discounts, {
            headers: {
                ...authHeaders(),   
                'Content-Type': 'application/json' 
            }
        })
        return response
    }catch(error){
        throw error;
    }
}
export async function deleteDiscountsService(id) {
    try{
        const response = await apiUrl.delete(`/discounts/${id}`,{
            headers: {
                ...authHeaders(),   
            }
        })
        
        return response
    }catch(error){
        throw error;

    }
}
export async function  uploadImage(img) {
    try{
        const response = await apiUrl.put('/users/image',img,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'multipart/form-data',
            }
        })
    }catch(error){
        throw error;
     
    }
    
}
export async function getUser() {
    
    try{

        const response = await apiUrl.get(`/users/me`, {
            headers:{
                ...authHeaders(),
            }
        });
        
        return response;
    }catch(error){
        throw error;

    }
}
export async function getOrdersService() {
    try{

        const response = await apiUrl.get(`/orders/`, {
            headers:{
                ...authHeaders(),
            }
        });
        
        return response;
    }catch(error){
        throw error;

    }
}
export async function getOrdersServiceAll() {
    try{

        const response = await apiUrl.get(`/orders/all/`, {
            headers:{
                ...authHeaders(),
            }
        });
        
        return response;
    }catch(error){
        throw error;

    }
}
export async function  uploadImageProducts(id, img) {
    try{

        const response = await apiUrl.put(`/products/${id}`,img,{
            headers: {
                ...authHeaders(),
                "Content-Type": 'multipart/form-data',
            }
        })
        return response
    }catch(error){
        throw error;
     
    }
    
}

export async function editAddressService(address_id, address) {
    try{
        const response = await apiUrl.put(`/addresses/${address_id.value}`,address.value, {
            headers: {
                ...authHeaders(),   
                'Content-Type': 'application/json' 
            }
        })
        return response
    }catch(error){
        throw error;
    }
}
export async function editStockProduct(product_id, stock) {
    try{
        const response = await apiUrl.put(`/products/${product_id}/stock`,stock, {
            headers: {
                ...authHeaders(),   
            }
        })
        return response
    }catch(error){
        throw error;
    }
}
export async function EditsStatus(orders_id, status) {
    try{
        const response = await apiUrl.put(`/orders/${orders_id}`,status, {
            headers: {
                ...authHeaders(),   
            }
        })
        return response
    }catch(error){
        throw error;
    }
}

export async function cancelOrder(order_id) {
    try{
        const response = await apiUrl.delete(`/orders/${order_id}`, {
            headers: {
                ...authHeaders(),   
            }
        })
        return response
    }catch(error){
        throw error;
    }
}

export async function deleteAddres(addrres_is) {
    try{
        const response = await apiUrl.delete(`/orders/${addrres_is}`, {
            headers: {
                ...authHeaders(),   
            }
        })
        return response
    }catch(error){
        throw error;
    }
}

export async function registerModerator(credentialsModerator) {
    try {
        
        const response = await apiUrl.post('/users/create-moderator', credentialsModerator.value,{
            headers: {
                ...authHeaders(),   
            }
        }); 
        return response;
    }catch (error) {
        throw error;
    }
}

