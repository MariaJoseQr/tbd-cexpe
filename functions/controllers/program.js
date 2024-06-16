const { Program } = require("../models/program");

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
    const { name, topic } = req.body;

    const newProgram = new Program({ name, topic });
    const savedProgram = await newProgram.save();

    res.status(201).json(savedProgram);
  } catch (error) {
    console.error("Error creating program: ", error);
    res.status(500).json({ error: "An error occurred while saving data." });
  }
};
