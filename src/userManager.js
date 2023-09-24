import fs from "fs";
const path = "usersManager.json";

class UsersManager {
  static async read() {
    try {
      const userFile = await fs.promises.readFile(path, "utf-8");
      return userFile;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(queryObject) {
    try {
      const exist = fs.existsSync(path);
      const { limit } = queryObject;
      if (exist) {
        const userFile = await UsersManager.read();
        const userData = JSON.parse(userFile);
        return limit ? userData.slice(0, limit) : userData;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async createUsers(user) {
    try {
      const users = await this.getUsers({});
      let id;
      if (!users.length) {
        id = 1;
      } else {
        id = users[users.length - 1].id + 1;
      }

      const newUser = { id, ...user };
      users.push(newUser);
      await fs.promises.writeFile(path, JSON.stringify(users));
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async getUsersById(id) {
    try {
      const users = await this.getUsers({});
      const userFound = users.find((u) => u.id === id);
      return userFound;
    } catch (error) {
      return error;
    }
  }

  async deleteUsers(id) {
    try {
      const users = await this.getUsers({});
      const user = users.find((u) => u.id === id);
      if (user) {
        const newArrayUsers = users.filter((u) => u.id !== id);
        await fs.promises.writeFile(path, JSON.stringify(newArrayUsers));
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id, obj) {
    try {
      const users = await this.getUsers({});
      const userIndex = users.findIndex((u) => u.id === id);
      userIndex === -1 && null;
      const updateUser = { ...users[userIndex], ...obj };
      updateUser.splice(userIndex, 1, updateUser);
      await fs.promises.writeFile(path.JSON.stringify(users));
      return updateUser;
    } catch (error) {
      return error;
    }
  }
}

const user1 = {
  nombre: "juan",
  edad: 24,
};

const user2 = {
  nombre: "Rodrigo",
  edad: 24,
};

const user3 = {
  nombre: "Rodrigo",
  edad: 24,
};

const user4 = {
  nombre: "Rodrigo",
  edad: 24,
};

/* async function test() {
  const manager1 = new UsersManager();
  await manager1.createUsers(user2);
  await manager1.createUsers(user1);
  await manager1.createUsers(user3);
  await manager1.createUsers(user4);
  const users = await manager1.getUsers();
  console.log(users);
}

test(); */

export const manager = new UsersManager();
