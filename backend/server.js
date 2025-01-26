const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let items = [
  { id: uuidv4(), name: "Akshitha", dob: "2003-06-21" },
  { id: uuidv4(), name: "Akshay", dob: "2010-01-15" },
  { id: uuidv4(), name: "Kshitij", dob: "2005-01-26" },
  { id: uuidv4(), name: "Rohit", dob: "1998-02-14" },
  { id: uuidv4(), name: "Sneha", dob: "1997-04-11" },
  { id: uuidv4(), name: "Vishal", dob: "1995-08-23" },
  { id: uuidv4(), name: "Priya", dob: "2001-12-03" },
  { id: uuidv4(), name: "Neha", dob: "2004-07-09" },
  { id: uuidv4(), name: "Suresh", dob: "1996-11-05" },
  { id: uuidv4(), name: "Madhavi", dob: "1999-03-19" },
  { id: uuidv4(), name: "Nikhil", dob: "2002-09-28" },
  { id: uuidv4(), name: "Manoj", dob: "2000-06-12" },
  { id: uuidv4(), name: "Anjali", dob: "1998-10-20" },
  { id: uuidv4(), name: "Kavya", dob: "1997-05-17" },
  { id: uuidv4(), name: "Rajesh", dob: "1996-01-22" },
  { id: uuidv4(), name: "Sushma", dob: "2003-04-07" },
  { id: uuidv4(), name: "Siddharth", dob: "2004-11-09" },
  { id: uuidv4(), name: "Amit", dob: "1995-02-02" },
  { id: uuidv4(), name: "Tanvi", dob: "2001-07-15" },
  { id: uuidv4(), name: "Varun", dob: "2000-12-29" },
];

const users = [
  { id: 1, email: "user1@example.com", password: "password1" },
  { id: 2, email: "user2@example.com", password: "password2" },
];

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }
  users.push({ id: uuidv4(), email, password });
  return res.status(201).json({ message: "Sign-up successful" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    console.log("Login successful");
    return res
      .status(200)
      .json({ message: "Login successful", token: "mock-jwt-token" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

app.get("/items", (req, res) => {
  const updatedItems = items.map((item) => ({
    ...item,
    age: calculateAge(item.dob),
  }));
  res.json(updatedItems);
});

app.post("/items", (req, res) => {
  const { name, dob } = req.body;
  const newItem = { id: uuidv4(), name, dob, age: calculateAge(dob) };
  items.push(newItem);
  res.json(newItem);
});

app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, dob } = req.body;

  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const existingItem = items[itemIndex];

  const updatedItem = {
    ...existingItem,
    name: name || existingItem.name,
    dob: dob || existingItem.dob,
    age: dob ? calculateAge(dob) : existingItem.age,
  };

  items[itemIndex] = updatedItem;

  res.json(updatedItem);
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== id);
  res.json({ message: "Item deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
