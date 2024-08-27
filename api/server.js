/* // IMPORTS AT THE TOP
const express = require("express");
const Dog = require("./dog-model");

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// ENDPOINTS

// [GET]    /             (Hello World endpoint)
server.get("/hello-world", (req, res) => {
  res.status(200).json({ message: "hello, world" });
});

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get("/api/dogs", async (req, res) => {
  try {
    const dogs = await Dog.findAll();
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ message: `Something horrible: ${err.message}` });
  }
});

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get("/api/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const dog = await Dog.findById(id); // Use findById instead of findAll
    res.status(200).json(dog);
    console.log("the dog", dog);
    if (!dog) {
      res.status(404).json({ message: `no dog with id ${id}` });
    } else {
      res.status(200).json(dog);
    }
  } catch (err) {
    res.status(500).json({ message: `Error fetching dog: ${err.message}` });
  }
});

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post("/api/dogs", async (req, res) => {
  try {
    const { name, weight } = req.body;
    if (!name || !weight) {
      res.status(422).json({
        message: "dogs need name and weight",
      });
    } else {
      const createdDog = await Dog.create({ name, weight });
      res.status(201).json({
        message: "Dog created successfully",
        data: createdDog,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error creating dog: ${err.message}`,
    });
  }
});
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put("/api/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, weight } = req.body;

    // Check if the necessary fields are provided
    if (!name || !weight) {
      return res.status(422).json({
        // Added return to prevent further execution
        message: "Dogs need a name and weight",
      });
    }

    // Attempt to update the dog
    const updatedDog = await Dog.update(id, { name, weight });

    if (!updatedDog) {
      return res.status(404).json({
        message: `Dog with id ${id} not found`,
      });
    }

    // If the update is successful, return the updated dog data
    res.status(200).json({
      message: "Dog was updated successfully",
      data: updatedDog,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({
      message: `Error updating dog: ${err.message}`,
    });
  }
});

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete("/api/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDog = await Dog.delete(id);
    console.log(stuff);
    if (!deletedDog) {
      res.status(404).json({
        message: `Dog with id ${id} not found`,
      });
    } else {
      res.json({
        message: `Error updating dog: ${err.message}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error updating dog: ${err.message}`,
    });
  }
});

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server; */
// IMPORTS AT THE TOP
const express = require("express");
const Dog = require("./dog-model");

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// ENDPOINTS

// [GET]    /             (Hello World endpoint)
server.get("/hello-world", (req, res) => {
  res.status(200).json({ message: "hello, world" });
});

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get("/api/dogs", async (req, res) => {
  try {
    const dogs = await Dog.findAll();
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ message: `Something horrible: ${err.message}` });
  }
});

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get("/api/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await Dog.findById(id);

    if (!dog) {
      res.status(404).json({ message: `No dog with id ${id}` });
    } else {
      res.status(200).json(dog); // Only send the response once
    }
  } catch (err) {
    res.status(500).json({ message: `Error fetching dog: ${err.message}` });
  }
});

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post("/api/dogs", async (req, res) => {
  try {
    const { name, weight } = req.body;
    if (!name || !weight) {
      res.status(422).json({
        message: "dogs need name and weight",
      });
    } else {
      const createdDog = await Dog.create({ name, weight });
      res.status(201).json({
        message: "Dog created successfully",
        data: createdDog,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error creating dog: ${err.message}`,
    });
  }
});

// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put("/api/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, weight } = req.body;

    // Check if the necessary fields are provided
    if (!name || !weight) {
      return res.status(422).json({
        // Added return to prevent further execution
        message: "Dogs need a name and weight",
      });
    }

    // Attempt to update the dog
    const updatedDog = await Dog.update(id, { name, weight });

    if (!updatedDog) {
      return res.status(404).json({
        message: `Dog with id ${id} not found`,
      });
    }

    // If the update is successful, return the updated dog data
    res.status(200).json({
      message: "Dog was updated successfully",
      data: updatedDog,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({
      message: `Error updating dog: ${err.message}`,
    });
  }
});

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete("/api/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDog = await Dog.delete(id);

    if (!deletedDog) {
      res.status(404).json({
        message: `Dog with id ${id} not found`,
      });
    } else {
      res.json({
        message: `Dog with id ${id} was successfully deleted`, // Corrected success message
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error deleting dog: ${err.message}`,
    });
  }
});

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;
