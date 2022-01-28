const fs = require("fs").promises;

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async save(item) {
    try {
      let contenido = await this.getAll();
      if (!contenido) contenido = [];
      contenido.push({ id: contenido.length + 1, ...item });
      await fs.writeFile(this.filePath, JSON.stringify(contenido, null, 2));
      return contenido.length;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      const contenido = await this.getAll();
      if (!contenido) return contenido;
      const findItem = contenido.find((item) => item.id === id);
      return findItem ? findItem : null;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.filePath, "utf-8"));
    } catch (error) {
      return null;
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.getAll();
      if (contenido) {
        const filter = contenido.filter((item) => item.id !== id);
        await fs.writeFile(this.filePath, JSON.stringify(filter, null, 2));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.filePath, "");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Contenedor;
