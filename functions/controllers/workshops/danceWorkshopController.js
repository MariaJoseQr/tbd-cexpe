let danceWorkshops = [];

const getAllDances = (req, res) => {
  res.json(danceWorkshops);
};

const createDance = (req, res) => {
  const { name, details, date, time, time_end } = req.body;
  const id = danceWorkshops.length + 1;
  const newDance = { id, name, details, date, time, time_end };
  danceWorkshops.push(newDance);
  res.status(201).json(newDance);
};

const getDance = (req, res) => {
  const { id } = req.params;
  const dance = danceWorkshops.find((workshop) => workshop.id == id);
  if (dance) {
    res.json(dance);
  } else {
    res.status(404).json({ message: "Dance workshop not found" });
  }
};

const updateDance = (req, res) => {
  const { id } = req.params;
  const { name, details, date, time, time_end } = req.body;
  const danceIndex = danceWorkshops.findIndex((workshop) => workshop.id == id);
  if (danceIndex !== -1) {
    danceWorkshops[danceIndex] = { id, name, details, date, time, time_end };
    res.json(danceWorkshops[danceIndex]);
  } else {
    res.status(404).json({ message: "Dance workshop not found" });
  }
};

const deleteDance = (req, res) => {
  const { id } = req.params;
  const danceIndex = danceWorkshops.findIndex((workshop) => workshop.id == id);
  if (danceIndex !== -1) {
    const deletedDance = danceWorkshops.splice(danceIndex, 1);
    res.json(deletedDance[0]);
  } else {
    res.status(404).json({ message: "Dance workshop not found" });
  }
};

module.exports = {
  getAllDances,
  createDance,
  getDance,
  updateDance,
  deleteDance,
};
