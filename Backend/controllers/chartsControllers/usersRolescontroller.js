const UserModel = require("../../models/Users");

const mongoose = require("mongoose");

const userRoles = async (req, res) => {
    try {
        const roleDistribution = await UserModel.aggregate([
          {
            $group: {
              _id: '$role', // Group by the user role
              count: { $sum: 1 } // Count the number of users in each role
            }
          },
          {
            $project: {
              _id: 0, // Exclude _id field from the result
              role: {
                $switch: {
                  branches: [
                    { case: { $eq: ['$_id', 0] }, then: "super admin" },
                    { case: { $eq: ['$_id', 1] }, then: "admin" },
                    { case: { $eq: ['$_id', 2] }, then: "user" }
                  ],
                  default: "unknown"
                }
              },
              count: 1 // Include count field
            }
          }
        ]);
        res.json(roleDistribution); // Send the role distribution as JSON response
      } catch (error) {
        console.error('Error fetching user role distribution:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
      }
}

module.exports = userRoles;
