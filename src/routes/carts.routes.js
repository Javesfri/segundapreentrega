import { Router } from "express";
//import { CartManager } from "../controllers/CartManager.js";
import { getManagerProducts,getManagerCart}  from "../dao/daoManager.js";
import {ManagerCartMongoDB} from '../dao/MongoDB/models/Cart.js'


const routerCart = Router();
const cartManager=new ManagerCartMongoDB



routerCart.post('/', async (req,res)=>{
    const newCart = await cartManager.createCart()
    res.send(newCart)
})

routerCart.get('/:cid', async (req,res)=>{
    const products=await cartManager.getProducts(req.params.cid)
    res.send(products)

})

routerCart.post('/:cid/products/:pid',async (req,res)=>{
    const addProductToCart=await cartManager.addProduct(req.params.cid,req.params.pid)
    res.send(addProductToCart)

})




routerCart.delete('/:cid/product/:pid',async (req,res)=>{
    const deleteProductOfCart=await cartManager.deleteProduct(req.params.cid,req.params.pid);
    res.send(deleteProductOfCart);
})

routerCart.delete('/:cid', async(req,res) =>{
    const deleteAllProducts= await cartManager.deleteAllProducts(req.params.cid);
    res.send(deleteAllProducts);
})

routerCart.put('/:cid/products/:pid', async (req,res)=>{
    const updateProduct= await cartManager.updateProduct()
})

export default routerCart