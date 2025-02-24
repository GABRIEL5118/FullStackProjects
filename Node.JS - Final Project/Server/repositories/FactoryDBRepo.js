const { User, Department, Employee, Shift } = require("../models/FactoryModel");

const getAllUsers = () => User.find();
const getUserById = (id) => User.findById(id);

const getAllDepartments = () =>
  Department.find().populate("Manager", "FirstName LastName");

const getDepartmentById = (id) =>
  Department.findById(id).populate("Manager", "FirstName LastName");

const AddDepartment = (objDep) => {
  const department = new Department(objDep);
  return department.save();
};
const updateDepartment = (id, objDep) =>
  Department.findByIdAndUpdate(id, objDep, { new: true });

const deleteDepartment = (id) => Department.findByIdAndDelete(id);

const getAllEmployees = () => Employee.find();
const getEmployeeById = (id) => Employee.findById(id);
const AddEmployees = (objemp) => {
  const employee = new Employee(objemp);
  return employee.save();
};
const updateEmployee = (id, objemp) =>
  Employee.findByIdAndUpdate(id, objemp, { new: true });

const deleteEmployee = (id) => Employee.findByIdAndDelete(id);

const getAllShifts = () => Shift.find();

const getShiftById = (id) => Shift.findById(id);

const AddShift = (objshift) => {
  const shift = new Shift(objshift);
  return shift.save();
};

const updateShift = (id, shiftData) =>
  Shift.findByIdAndUpdate(id, shiftData, { new: true });

const deleteShift = (id) => Shift.findByIdAndDelete(id);

module.exports = {
  getAllUsers,
  getUserById,
  getAllDepartments,
  getDepartmentById,
  AddDepartment,
  updateDepartment,
  deleteDepartment,
  getAllEmployees,
  getEmployeeById,
  AddEmployees,
  updateEmployee,
  deleteEmployee,
  getAllShifts,
  getShiftById,
  AddShift,
  updateShift,
  deleteShift,
};
