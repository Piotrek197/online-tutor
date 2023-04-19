// const fs = require("fs").promises;
// const path = require("path");
// const jsondata = require("../model/employees.json");
const Tutor = require("../model/Tutor");

const getAllTutors = async (req, res) => {
  const employees = await Tutor.find();
  if (!employees) return res.status(204).json({ message: "No employees found" });
  res.json(employees);
};

const createNewTutor = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname)
    return res.status(400).send("Firstname and lastname are required");

  const result = await Tutor.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  console.log("employee created", result);

  res.status(201).send(result);
};

const updateTutor = async (req, res) => {
  if (!req?.body?.id) return res.status(400).send("id is required");

  const employee = await Tutor.findOne({ _id: req.body.id });

  if (!employee) return res.status(204).send("No employee found");

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  try {
    await employee.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteTutor = async (req, res) => {
  if (!req?.body?.id) return res.status(400).send("id is required");

  const deleteResult = await Tutor.findOneAndDelete({ _id: req.body.id });
  if (!deleteResult) return res.status(500);
  res.status(200).send("Tutor deleted");
};

const getTutor = async (req, res) => {
  if (!req?.params?.id) return res.status(400).send("id is required");

  const employee = await Tutor.findOne({ _id: req.params.id });
  if (!employee) return res.status(204).send("Tutor with given id not found.");
  res.status(200).send(employee);
};

module.exports = {
  getAllTutors,
  createNewTutor,
  updateTutor,
  deleteTutor,
  getTutor
};
