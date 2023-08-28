import { Component } from 'react'
import Api from './Api';
class Product extends Component {

    async productadd(e) {
        return Api.post('/api/product', e);
    }
    async productlist() {
        return Api.get('/api/product');
    }

    // async productstatus(id,e) {
    //     return Api.update(`/api/product/${id}`,e);
    // }


    async productupdate(id,e) {
        return Api.update(`/api/product/${id}`,e);
    }


    async productgetsingle(id){ 
        return Api.get(`/api/product/${id}`)
    }


    
    async productgetuser(id){ 
        return Api.get(`/api//productuser`)
    }

    async productdelete(id) {
        return Api.delete(`/api/product/${id}`);
    }

    async cartadd(e) {
        return Api.post('/api/cart', e);
    }

    render() {

        return (
            <div >
              <></>
            </div>
        )
}}

export default Product;