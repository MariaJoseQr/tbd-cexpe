const { Program } = require("../models/program");

exports.getData = async (req, res) => {
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
