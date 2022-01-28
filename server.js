const express = require("express");
const Contenedor = require("./clase");
const app = express();
const path = require("path");

const filePath = path.join(__dirname, "productos.txt");

const contenedor = new Contenedor(filePath);

app.get("/", (req, res) => {
  res.send({
    status: "El servidor esta bien!",
    url_1: "/productos: En esta url obtienes todos los productos",
    url_2: "/productosRandom: En esta url obtienes un producto al azar",
  });
});

app.get("/productos", async (req, res) => {
  res.send(JSON.stringify(await contenedor.getAll()));
});

app.get("/productoRandom", async (req, res) => {
  res.send(JSON.stringify(await generarRandom()));
});

const generarRandom = async () => {
  const max = await contenedor.getAll();
  const producto = await getRandomInt(1, max[max.length - 1].id);
  if (!producto) return await generarRandom();
  return producto;
};

const getRandomInt = async (min, max) => {
  const indice = Math.floor(Math.random() * max) + min;
  console.log(indice);
  return await contenedor.getById(indice);
};

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: ${PORT}`);
});

server.on("error", (err) => {
  console.log(`Error: ${err}`);
});
