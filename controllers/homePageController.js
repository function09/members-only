const displayMessages = (req, res, next) => {
  res.render("homePage", { title: "Homepage" });
};

export default displayMessages;
