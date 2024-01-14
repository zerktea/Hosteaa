const House = require("../../models/Houses");

exports.createHouse = async (req, res) => {
  console.log("Create House Controller");

 
  try {
    const newHouse = new House({
      ...req.body,
      pictures: req.files.map((file) => file.path.replace(/\\/g, "/")),
    })

    await newHouse.save()
    res.json({ message: "House created successfully", house: newHouse });
  } catch (error) {
    console.error("Error creating house:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
