const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    UserName: String,
    Email: String,
    NumOfActions: Number,
  },
  { versionKey: false }
);
const User = mongoose.model("User", UserSchema, "Users");

const DepartmentSchema = mongoose.Schema(
  {
    Name: String,
    Manager: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  },
  { versionKey: false }
);
const Department = mongoose.model(
  "Department",
  DepartmentSchema,
  "Departments"
);

const EmployeeSchema = mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    StartWorkYear: Number,
    DepartmentID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  },
  { versionKey: false }
);
const Employee = mongoose.model("Employee", EmployeeSchema, "Employees");

const ShiftSchema = mongoose.Schema(
  {
    Date: Date,
    StartingHour: Number,
    EndingHour: Number,
    Employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { versionKey: false }
);
const Shift = mongoose.model("Shift", ShiftSchema, "Shifts");

module.exports = { User, Department, Employee, Shift };
