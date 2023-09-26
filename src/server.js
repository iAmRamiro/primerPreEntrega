import Express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";

const app = Express();
app.use(Express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});
