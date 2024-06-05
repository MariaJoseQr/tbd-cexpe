const home = (req, res) => {
  res.send("Welcome to the Home page");
};

const programs = (req, res) => {
  res.send("Programs page");
};

const workshops = (req, res) => {
  const { param } = req.params;

  if (!param || /^[a-zA-Z]+$/.test(param))
    res.send(`Workshops page with param: ${param}`);
  else res.status(400).send("Invalid parameter");
};

const advice = (req, res) => {
  const { param } = req.params;

  if (!param || /^[0-9]+$/.test(param))
    res.send(`Advice page with param: ${param}`);
  else res.status(400).send("Invalid parameter");
};

const contact = (req, res) => {
  res.send("Contact page");
};

module.exports = {
  home,
  programs,
  workshops,
  advice,
  contact,
};
