import { URL } from "./url";
import axios from 'axios';
let token=localStorage.getItem('token')

export function registerUser(body){
    return axios.post(`${URL}user/register`,body);
}

export function loginUser(body){
    return axios.post(`${URL}user/login`, body);
}
export function sendmail(data){
    return axios.post(`${URL}user/contact`,data)
}
export function getproducts(){
    return axios.get(`${URL}user/getproducts`)
}
export function getUser(email){
    return axios.get(`${URL}user/getprofile/${email}`)
}
export function getItem1(id){
    return axios.get(`${URL}user/getItems/${id}`)
}
export function updateprofile(data,email){
    return axios.put(`${URL}user/updateprofile/${email}`,data)
}
export function addtorate(data,id){
    return axios.put(`${URL}user/addrate/${id}`,data)
}
export function updatepassword(data){
    return axios.post(`${URL}user/changepassword`,data)
}
export function addaddress(data,email){
    return axios.put(`${URL}user/addaddress/${email}`,data)
}
export function addToCart(body){
    return axios.post(`${URL}user/addtocart`,body)
}
export function getCart(email){
    return axios.get(`${URL}user/getcart/${email}`)
}
export function getOrder(email){
    return axios.get(`${URL}user/getorder/${email}`)
}
export function incrementproduct(data){
    return axios.put(`${URL}user/incrementquantity`, data)
}
export function decrementproduct(data){
    return axios.put(`${URL}user/decrementquantity`, data)
}
export function deleteOrder(id){
    return axios.delete(`${URL}user/deleteorder/${id}`,{
        headers:{"Authorization":`Bearer ${token}`}})
}
export function search_by_Products(key){
    return axios.get(`${URL}user/search/${key}`)
}
export function getOrder_Details(){
    
}
