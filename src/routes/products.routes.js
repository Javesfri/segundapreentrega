import { Router } from "express";
//import { ProductManager } from "../controllers/ProductManager.js"
import {ManagerProductMongoDB} from '../dao/MongoDB/models/Product.js'
const productManager=new ManagerProductMongoDB
const routerProduct = Router();

routerProduct.get("/", async (req, res) => {
  const category = req.query.category;
  const sort = req.query.sort;
  const ord= sort=="asc"?1:-1;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const products =await productManager.getPagProducts(category,ord,page,limit)
  console.log(await products)
  res.send(products);
});

routerProduct.get("/:pid", async (req, res) => {
  const productId = await productManager.getElementById(req.params.pid);
  res.send(productId);
});

routerProduct.post("/", async (req, res) => {
  const data = await getManagerProducts();
  const productManager = new data.ManagerProductMongoDB();
  console.log(await req.body);
  let newProduct = await productManager.addElements(req.body);
  res.send(newProduct);
});

routerProduct.delete("/:id", async (req, res) => {
  await productManager.deleteElement(req.params.id);
  res.send(await productManager.getElements());
});

routerProduct.put("/:id", async (req, res) => {
  let updateProduct = await productManager.updateElement(
    req.params.id,
    req.body
  );
  res.send(updateProduct);
});

export default routerProduct;
