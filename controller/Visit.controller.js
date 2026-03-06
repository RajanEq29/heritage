const UserVisit = require("../Modal/visit.schema");


exports.createVisit = async (req, res) => {
  try {
    const { name, phone, email, message, visits, totalTimeSpent } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const newVisit = new UserVisit({
      name,
      phone,
      email,
      message,
      visits,
      totalTimeSpent,
    });

    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "Visit data saved successfully",
      data: newVisit,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



exports.getAllVisits = async (req, res) => {
  try {
    const data = await UserVisit.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching visits",
    });
  }
};




exports.getSingleVisit = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserVisit.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let totalVisits = user.visits.length;

    let mostVisitedPage = {};
    user.visits.forEach(v => {
      if (!mostVisitedPage[v.title]) {
        mostVisitedPage[v.title] = 0;
      }
      mostVisitedPage[v.title]++;
    });

    res.status(200).json({
      success: true,
      data: user,
      analytics: {
        totalVisits,
        mostVisitedPage,
        totalTimeSpent: user.totalTimeSpent
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
};



exports.addVisitToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const visit = req.body;

    const user = await UserVisit.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.visits.push(visit);

    // update total time
    user.totalTimeSpent += visit.duration || 0;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Visit added successfully",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding visit",
    });
  }
};



// ✅ 5. Delete User Visit
exports.deleteVisit = async (req, res) => {
  try {
    const { id } = req.params;

    await UserVisit.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting data",
    });
  }
};