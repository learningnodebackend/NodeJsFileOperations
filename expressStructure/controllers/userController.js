// Mock database (in-memory)
let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Keshav", email: "Keshav@test.com" }
  ];
  
  const createUser = (req, res) => {
    console.log("createUser API Called...")
    const { name, email } = req.body;
    const id = users.length + 1;
    const newUser = { id, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  };
  
  const getAllUsers = (req, res) => {
    console.log("getAllUsers API Called...")
    res.json(users);
  };
  
  const getUserById = (req, res) => {
    console.log("getUserById API Called...")
    let obj = {name : "dhaval"}
    let jsonFormatVar = JSON.stringify(obj)
    console.log(jsonFormatVar.name);
    const user = users.find((u) => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: "User not found" });
  };
  
  const updateUser = (req, res) => {
    console.log("updateUser API Called...")
    const { name, email } = req.body;
    const user = users.find((u) => u.id === parseInt(req.params.id));
  
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  };
  
  const deleteUser = (req, res) => {
    console.log("deleteUser API Called...")
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    res.json({ message: "User deleted" });
  };
  
  // Export functions at the end
  module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
  