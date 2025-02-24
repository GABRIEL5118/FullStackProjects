const factoryRepo = require("../repositories/FactoryDBRepo");

const getAllUsers = (filters) => {
  return factoryRepo.getAllUsers(filters);
};
const getUserById = (id) => {
  return factoryRepo.getUserById(id);
};
const getAllDepartments = (filters) => {
  return factoryRepo.getAllDepartments(filters);
};
const getDepartmentById = (id) => {
  return factoryRepo.getDepartmentById(id);
};
const AddDepartment = (objDep) => {
  return factoryRepo.AddDepartment(objDep);
};
const updateDepartment = (id, objDep) => {
  return factoryRepo.updateDepartment(id, objDep);
};
const deleteDepartment = (id) => {
  return factoryRepo.deleteDepartment(id);
};
const getAllEmployees = (filters) => {
  return factoryRepo.getAllEmployees(filters);
};
const getEmployeeById = (id) => {
  return factoryRepo.getEmployeeById(id);
};
const AddEmployees = (objemp) => {
  return factoryRepo.AddEmployees(objemp);
};
const updateEmployee = (id, objemp) => {
  return factoryRepo.updateEmployee(id, objemp);
};
const deleteEmployee = (id) => {
  return factoryRepo.deleteEmployee(id);
};
const getAllShifts = (filters) => {
  return factoryRepo.getAllShifts(filters);
};
const getShiftById = (id) => {
  return factoryRepo.getShiftById(id);
};
const AddShift = (objshift) => {
  return factoryRepo.AddShift(objshift);
};
const updateShift = (id, objemp) => {
  return factoryRepo.updateShift(id, objemp);
};
const deleteShift = (id) => {
  return factoryRepo.deleteShift(id);
};

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
