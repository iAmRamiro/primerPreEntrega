import fs from "fs";
const path = "productsManager.json";

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getProducts(queryObject) {
    try {
      const exist = fs.existsSync(this.path);
      const { limit } = queryObject;
      if (exist) {
        const productFile = await fs.promises.readFile(this.path, "utf-8");
        const productData = JSON.parse(productFile);
        return limit ? productData.slice(0, limit) : productData;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(prod) {
    try {
      const products = await this.getProducts({});

      const existingProduct = products.find(
        (product) =>
          product.title === prod.title &&
          product.description === prod.description &&
          product.price === prod.price &&
          product.thumbnail === prod.thumbnail &&
          product.code === prod.code &&
          product.stock === prod.stock
      );

      if (existingProduct) {
        console.log("El producto ya existe.");
        return existingProduct;
      }

      if (
        !prod.title ||
        !prod.description ||
        !prod.price ||
        !prod.thumbnail ||
        !prod.code ||
        !prod.stock
      ) {
        return "All the fields are requiered. The product must contain: Title, Description, Price, Thumbnail, Code, Stock";
      }

      let id = !products.length ? 1 : products[products.length - 1].id + 1;
      const newProduct = { id, ...prod };
      products.push(newProduct);
      await fs.promises.writeFile(path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts({});
      const productFound = products.find((prod) => prod.id === id);
      return productFound;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getProducts({});
      const productIndex = products.findIndex((p) => p.id === id);
      productIndex === -1 && null;
      const updateProduct = { ...products[productIndex], ...obj };
      products.splice(productIndex, 1, updateProduct);
      await fs.promises.writeFile(path.JSON.stringify(products));
      return updateProduct;
    } catch (error) {
      throw new Error("product not found");
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts({});
      const product = products.find((prod) => prod.id === id);
      if (product) {
        const newArray = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      }
      return product;
    } catch (error) {
      return error;
    }
  }
}

const prod1 = {
  title: "Celular",
  description: "Celular Iphone",
  price: 2051,
  thumbnail: "url",
  code: 303,
  stock: 5,
};
const prod2 = {
  title: "Laptop",
  description: "Laptop Razer",
  price: 105000,
  thumbnail: "url",
  code: 654,
  stock: 3,
};

const prod3 = {
  title: "Mouse",
  description: "Mouse RedDragon",
  price: 264,
  thumbnail: "url",
  code: 652,
  stock: 10,
};

const prod4 = {
  title: "Teclado",
  description: "Teclado Logitech",
  price: 5131,
  thumbnail: "url",
  code: 841,
  stock: 3,
};

/* async function test() {
  const manager1 = new ProductManager(path);

  await manager1.addProduct(prod1);
  await manager1.addProduct(prod2);
  await manager1.addProduct(prod3);
  await manager1.addProduct(prod4);

  const productos = await manager1.getProducts();
  console.log(productos);
}

test(); */

export const manager = new ProductManager(path);
