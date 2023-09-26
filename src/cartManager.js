import fs from "fs";

class cartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    const exist = fs.existsSync(this.path);

    try {
      if (exist) {
        const cartsFile = await fs.promises.readFile(this.path, "utf-8");
        const cartsData = JSON.parse(cartsFile);
        return cartsData;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async createCart() {
    const carts = await this.getCarts();
    const idCart = !carts.length ? 1 : carts[carts.length - 1].idCart + 1;

    const newCart = { idCart, products: [] };
    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return idCart;
  }

  async addToCart(cartId, product) {
    const { id, title } = product;

    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.idCart === cartId);

      if (!cart) {
        throw new Error(`Cart with ID ${cartId} not found.`);
      }

      const product = cart.products.find((prod) => prod.id === id);

      if (product) {
        product.quantity += 1;
      } else {
        cart.products.push({ id, title, quantity: 1 });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cartFound = carts.find((cart) => cart.idcart === cartId);
      return cartFound;
    } catch (error) {
      throw error;
    }
  }
}

export default cartManager;
