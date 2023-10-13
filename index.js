const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      houseOwned: true,
      houseBuilt: true,
    },
  });
  res.json(allUsers);
});

app.post("/users", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: { id },
    include: {
      houseOwned: true,
      houseBuilt: true,
    },
  });
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updateUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });
  res.json(updateUser);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deleteUser = await prisma.user.delete({ where: { id } });
  res.json(deleteUser);
});

app.get("/houses", async (req, res) => {
  const allHouses = await prisma.house.findMany({
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouses);
});

app.post("/house", async (req, res) => {
  const newHouse = await prisma.house.create({ data: req.body });
  res.json(newHouse);
});

app.get("/house", async (req, res) => {
  const { address } = req.body;
  const allHouses = await prisma.house.findUnique({
    where: {
      address,
    },
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouses);
});

app.listen(5000, () => console.log(`Server running on port ${5000}`));
