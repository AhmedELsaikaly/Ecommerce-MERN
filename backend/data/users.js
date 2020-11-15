import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John doe",
    email: "John@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jani doe",
    email: "Jani@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
