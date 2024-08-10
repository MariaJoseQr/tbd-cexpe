const { Program } = require("../models/program");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Program.findById(id);

    if (!doc) return res.status(404).send({ error: "Program not found." });

    res.send({ doc });
  } catch (err) {
    console.error("Error fetching program: ", err);
    res.status(500).send({ error: "An error occurred while retrieving data." });
  }
};

exports.get = async (req, res) => {
  try {
    const docs = await Program.find({});
    if (docs.length === 0) console.log("No programs found.");
    else console.log(`Found ${docs.length} programs.`);

    res.send({ docs });
  } catch (err) {
    console.error("Error fetching programs: ", err);
    res.status(500).send({ error: "An error occurred while retrieving data." });
  }
};

exports.post = async (req, res) => {
  try {
    const { name, topic, image, categoryId } = req.body;

    const newProgram = new Program({ name, topic, image, categoryId });
    const savedProgram = await newProgram.save();

    res.status(201).json(savedProgram);
  } catch (error) {
    console.error("Error creating program: ", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
};

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    const updatedProgram = await Program.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    if (!updatedProgram) {
      return res.status(404).json({ error: "Programa no encontrado" });
    }

    res.json(updatedProgram);
  } catch (error) {
    console.error("Error al actualizar el programa:", error.message);
    res.status(500).json({ error: "Hubo un error al actualizar el programa" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProgram = await Program.findByIdAndDelete(id);

    if (!deletedProgram) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the program" });
  }
};
