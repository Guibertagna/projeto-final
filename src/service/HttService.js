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
        console.log(credentials)
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

export async function ferify() {
    try {
        console.log(authHeaders())
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
        console.log(credentialsRegister)
        console.error('Erro ao fazer registro:', error);
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
        console.error('Erro ao criar categoria:', JSON.stringify(error.response?.data, null, 2));
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
        console.error('Erro ao EDITAR categoria:', JSON.stringify(error.response?.data, null, 2));
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
        console.log("erro ao deletar categoria")
        throw error;
    }
}

export async function getProductsService() {
    try{
        const response = await apiUrl.get(`/products/user/10`)
        return response
        
    }catch(error){
        console.log("erro a buscar produtos com id 1" + error)
        throw error;
    }
}

export async function getProductsById(product_id) {
    try{
        const response = await apiUrl.get(`/products/${product_id}`)
        return response
        
    }catch(error){
        console.log("erro a buscar produtos com id 1" + error)
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
        console.log("erro a buscar produtos com id 1" + error)
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
        console.log("erro ao deletar categoria")
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
        console.log('Categoria editada com sucesso ', response.data);
        return response;
    }catch(error){
        console.error(error)
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
        console.log(response.data)
        return response.data; 
    }catch(error){
        console.error("Erro ao criar o carrinho:", error);
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
        console.error("Erro ao criar o carrinho:", error);
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
        console.error("Erro ao obter o carrinho:", error);
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
        console.log("erro ao deletar produto da categoria" + error)
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
        console.log('Endereço cadastrado com sucesso!', response.data);
        return response;
    }catch(error){
        console.log("erro ao criar Endereço" + error)
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
        console.log("erro ao deletar categoria")
        throw error;
    }
}


export async function  sendOrders(order) {
    try{
        const reponse = await apiUrl.post('/orders', order,{
            headers:{
                ...authHeaders(),
                'Content-Type': 'application/json' 
            }
        })
        return reponse
    }catch(error){
        console.log(error)
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
        console.log("erro ao criar cupom" + error)
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
        console.log("erro ao obter cupom" + error)
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
        console.log("erro ao obter cupom" + error)
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
        console.error('Erro ao EDITAR coupons:'+ error);
        throw error;
    }
}
export async function editProduct (product_id, productsinfo) {
    try{
        console.log(productsinfo)
        console.log("Conteúdo do FormData:")
    for (let [key, value] of productsinfo.entries()) {
        console.log(`${key}:`, value)
    }
        const response = await apiUrl.put(`/products/${product_id}`, productsinfo,{
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json' 
                }
                });
                alert("produtos editado com sucesso!");
                console.log(response)
                console.log(productsinfo.data)
                return response;
        
    }catch(error){
        console.error('Erro ao EDITAR coupons:'+ error);
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
        console.log("erro ao deletar coupon" + error)   
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

        console.log(response)
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
        console.log("erro ao alte rardados" + error)   
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
        console.log("erro ao criar desconto" + error)
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
        console.log("erro ao obter cupom" + error)
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
        console.log("erro ao editar coupon" + error)   
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
        console.log("erro ao deletar coupon" + error)   
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
        console.error(error)
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
        console.error('Error ao pegar user', error)
        throw error;

    }
}
