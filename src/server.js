import Express from "express";

const app = Express();
app.use(Express.json());

app.listen(8080, () => {
  console.log("Escuchando puerto 8080");
});
