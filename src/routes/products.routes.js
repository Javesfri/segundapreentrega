import { Router } from "express";
//import { ProductManager } from "../controllers/ProductManager.js"
import { getManagerProducts}  from "../dao/daoManager.js";


const routerProduct = Router();








routerProduct.get('/',async (req,res)=>{
    const category= req.query.category ;
    const sort= req.query.sort ;
    const page= parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getManagerProducts();
    const productManager=new data.ManagerProductMongoDB
    try{
        let query={}
        if(category){
            query.category = category
        }
        let products =await productManager.model.paginate(query,{limit:limit,page:page,sort:sort});
        res.json(products)
    }catch(error){
        console.log(error)
    }
    

})


routerProduct.get('/:pid',async (req,res)=>{
    const pid=parseInt(req.params.pid);
    const productId =await productManager.getProductById(pid);
    res.send(productId)
    
    
})

routerProduct.post('/',async (req,res) =>{
    const data = await getManagerProducts();
    const productManager=new data.ManagerProductMongoDB
    console.log(await req.body)
    let newProduct=await productManager.addElements(req.body)
    res.send(newProduct)
})

routerProduct.delete('/:id',async (req,res) =>{
    const data = await getManagerProducts();
    const productManager=new data.ManagerProductMongoDB
    const pid= parseInt(req.params.id)
    console.log(req.params.id)
    await productManager.deleteElement(req.params.id)
    res.send(await productManager.getElements());
})

routerProduct.put('/:id',async (req,res) =>{
    const pid= parseInt(req.params.id)
    let updateProduct = await productManager.updateElement(req.params.id,req.body)
    res.send(updateProduct);
})

export default routerProduct;