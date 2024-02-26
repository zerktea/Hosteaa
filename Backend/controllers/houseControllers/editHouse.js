const House = require("../../models/Houses");

exports.editHouse = async (req, res) => {
    console.log("Edit House Controller");
    console.log(req.body);
    console.log(req.params.id);
    try {
        const house = await House.findById(req.params.id);

        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }

        const updatedHouse = await House.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedHouse);
    } catch (error) {
        console.error("Error editing house:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.disableHouse = async (req, res) => {
    try {
        const house = await House.findById(req.params.id);
        
        // Check if the house exists
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }
        
        // Update the house's disabled field to true
        house.disabled = true;
         // Save the updated house document
        await house.save();

        // Send a response indicating success
        res.status(200).json({ message: 'House disabled successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error disabling house:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

