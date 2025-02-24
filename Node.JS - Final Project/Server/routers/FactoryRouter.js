const express = require("express");
const factoryService = require("../services/FactoryService");

const router = express.Router();

// Entry Point: http://localhost:3000/factory

// Get All Users
router.get("/Users", async (req, res) => {
  try {
    const filters = req.query;
    const users = await factoryService.getAllUsers(filters);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get Users By ID
router.get("/Users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await factoryService.getUserById(id);
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get All Department
router.get("/department", async (req, res) => {
  try {
    const department = await factoryService.getAllDepartments();
    res.send(department);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get Department By ID
router.get("/department/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await factoryService.getDepartmentById(id);
    res.send(department);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Add a new Department
router.post("/department", async (req, res) => {
  try {
    const objDep = req.body;
    const result = await factoryService.AddDepartment(objDep);
    res.status(201).send("New Department Add:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update Department
router.put("/department/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const objDep = req.body;
    const result = await factoryService.updateDepartment(id, objDep);
    res.send("Department Update:\n" + result);
  } catch (error) {
    res.status(502).send(error);
  }
});
// Delete a Department
router.delete("/department/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await factoryService.deleteDepartment(id);
    res.send("Department Delete:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get All Employee
router.get("/employee", async (req, res) => {
  try {
    const filters = req.query;
    const employee = await factoryService.getAllEmployees(filters);
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get Employee By ID
router.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await factoryService.getEmployeeById(id);
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Add a new Employee
router.post("/employee", async (req, res) => {
  try {
    const objemp = req.body;
    const result = await factoryService.AddEmployees(objemp);
    res.status(201).send("New Employee Add:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update Employee
router.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const objemp = req.body;
    const result = await factoryService.updateEmployee(id, objemp);
    res.send("Employee Update:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Delete an Employee
router.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await factoryService.deleteEmployee(id);
    res.send("Employee Delete:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get All Shifts
router.get("/shifts", async (req, res) => {
  try {
    const filters = req.query;
    const shifts = await factoryService.getAllShifts(filters);
    res.send(shifts);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get Shifts By ID
router.get("/shifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shifts = await factoryService.getShiftById(id);
    res.send(shifts);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Add a new Shifts
router.post("/shifts", async (req, res) => {
  try {
    const objshift = req.body;
    const result = await factoryService.AddShift(objshift);
    res.status(201).send("Shifts Add:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update Shifts
router.put("/shifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const objshift = req.body;
    const result = await factoryService.updateShift(id, objshift);
    res.send("Shifts Update:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Delete an Shifts
router.delete("/shifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await factoryService.deleteShift(id);
    res.send("Shifts Delete:\n" + result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
