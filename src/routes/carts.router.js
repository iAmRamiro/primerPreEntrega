import { Router } from "express";
import cartManager from "../cartManager.js";

const router = Router();
const path = "carts.json";
const cart = new cartManager(path);

router.post("/", async (req, res) => {
  try {
    const cartData = await cart.createCart();
    res.status(201).json({ message: "Cart created", cartData });
  } catch (error) {
    throw error;
  }
});

router.get("/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartFound = await cart.getCartById(+cartId);

    if (!cartFound) {
      return res
        .status(404)
        .json({ message: "Cart not found with the id provided" });
    }

    res.status(200).json({ message: "Cart", cartFound });
  } catch (error) {
    res.status(400).json({ message: "there was an unexpected error", error });
  }
});

router.post("/:cartId/products", async (req, res) => {
  const { cartId } = req.params;
  console.log("params", req.params);
  console.log("body", req.body);

  try {
    const cartData = await cart.addToCart(+cartId, req.body);

    if (!cartData) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Product added to cart", cartData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
