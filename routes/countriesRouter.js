const { Router } = require("express");
const { Country, Language, City } = require("../models");

const countriesRouter = Router();

countriesRouter.get("/", async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json({ countries });
  } catch (e) {
    console.log(e);
  }
});

countriesRouter.get("/:id", async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    res.json({ country });
  } catch (e) {
    console.log(e);
  }
});

countriesRouter.get("/:id/cities", async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    const cities = await country.getCities();
    res.json({ cities });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});
countriesRouter.get("/:id/languages", async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    const languages = await country.getLanguages();
    res.json({ languages });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

countriesRouter.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const country = await Country.create({
      name
    });
    res.json(country.dataValues);
  } catch (e) {
    console.log(e);
  }
});

countriesRouter.post("/:id/cities", async (req, res) => {
  try {
    const { name } = req.body;
    const countryId = req.params.id;
    const city = await City.create({
      name
    });
    await city.setCountry(countryId);
    res.json(city.dataValues);
  } catch (e) {
    console.log(e);
  }
});

module.exports = countriesRouter;
