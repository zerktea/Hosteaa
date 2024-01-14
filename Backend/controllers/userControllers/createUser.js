const userModel = require("../../models/Users");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {console.log('User Controller');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
const newUser = new userModel({
    name: req.body.name,
    surename: req.body.surename, 
    role: 2,
    email: req.body.email,
    password: hashedPassword,

  });
if (!emailRegex.test(req.body.email)) {
  return res.status(400).json({ error: 'Invalid email format' });
}
  newUser
    .save()
    .then((savedUser) => {
      console.log(savedUser);
      res.send("Successfully inserted user into the collection.");
    })
    .catch((error) => {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
        // Duplicate key error for the email field
        res.status(400).json({ error: 'Email address is already in use' });
      } else {
        // Other error, handle accordingly
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


}