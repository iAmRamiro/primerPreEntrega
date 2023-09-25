import { Router } from "express";
import { manager } from "../productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts(req.query);
    res.status(200).json({ message: "products", products });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const productFound = await manager.getProductById(+idProduct);

    if (!productFound) {
      return res
        .status(400)
        .json({ message: "Product not found with the id provided" });
    }

    res.status(200).json({ message: "Product Found", productFound });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
  } = req.body;

  console.log("body", req.body);

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({
      message: "some data is missing",
      structure: "title,description,code,price,stock,category",
    });
  }
  try {
    const products = await manager.addProduct(req.body);
    res.status(200).json({ message: "product added", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const productUpdated = await manager.updateProduct(+idProduct, req.body);

    if (!productUpdated) {
      return res
        .status(404)
        .json({ message: "Product not found with the id provided" });
    }

    res.status(200).json({ message: "Product updated", productUpdated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const productFound = await manager.deleteProduct(+idProduct);

    if (!productFound) {
      return res
        .status(400)
        .json({ message: "Product not found with the id provided" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
