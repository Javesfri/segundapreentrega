import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import mongoose,{ Schema } from "mongoose";
import {ManagerProductMongoDB} from "./Product.js"

const managerProduct= new ManagerProductMongoDB
let model;
if(mongoose.models['cart']){
    model=mongoose.models['cart']
}
else{
    const Schema = new mongoose.Schema({
        products:{
            type: [
                {
                    product:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'products'
                    }
                    
                }
            ],
            default:[]
        }

    });
    model= mongoose.model('cart',Schema)
}


export class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(model)
        //Aqui irian los atributos propios de la clase
    }
    async addProduct(idCart,idProduct){
        if(managerProduct.getElementById(idProduct)){
            try{
                const cart=await this.model.findById(idCart)
                console.log(await cart)
                await cart.products.push({product:idProduct})
                cart.save()
                return true
            }catch(error){
                return error
            }
        }
        return("No se encontro El producto")
    }

    async deleteProduct(idCart,id){
        if(managerProduct.getElementById(id)){
            try{
                const cart=await this.model.findById(idCart)
                await cart.products.remove(id)
                cart.save()
                return cart
            }catch(error){
                console.log(error)
                return error
            }
        }
        return("No se encontro El producto")
    }

    async getProducts(idCart){
        try{
            const cart=this.model.findById(idCart)
            return await cart.populate('products.product')
        }catch(error){
            console.log(error)
            return (error)
        }
    }
    
    async deleteAllProducts(idCart){
        try{
            const cart=this.model.findById(idCart)
            cart.products=[]
        }catch(error){
            console.log(error)
            return error
        }
        
    }

    async createCart(){
        try{
            return await this.model.create({})
        }catch(error){
            console.log(error)
            return error
        }

    }

    //Aqui irian los metodos propios de la clase
}