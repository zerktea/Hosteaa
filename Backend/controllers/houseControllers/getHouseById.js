const House = require("../../models/Houses");

exports.getHouseById = async (req, res) => {
    console.log("getHouseById controller");
    try {
        const houseId = req.params.id;
        const house = await House.findById(houseId).populate("owner", "name surename email profilePic");
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }
        res.json(house);
    } catch (error) {
        console.error("Error fetching house:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}