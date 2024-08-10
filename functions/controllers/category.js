const { Category } = require("../models/category");

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Category.findById(id);

    if (!doc) return res.status(404).send({ error: "Category not found." });

    res.send({ doc });
  } catch (err) {
    console.error("Error fetching category: ", err);
    res.status(500).send({ error: "An error occurred while retrieving data." });
  }
};

exports.get = async (req, res) => {
  try {
    const docs = await Category.find({});
    if (docs.length === 0) console.log("No categories found.");
    else console.log(`Found ${docs.length} categories.`);

    res.send({ docs });
  } catch (err) {
    console.error("Error fetching categories: ", err);
    res.status(500).send({ error: "An error occurred while retrieving data." });
  }
};

exports.post = async (req, res) => {
  try {
    const { name, active } = req.body;

    const newCategory = new Category({ name, active });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category: ", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
};

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error.message);
    res.status(500).json({ error: "Hubo un error al actualizar la categoría" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the category" });
  }
};
