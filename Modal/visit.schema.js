const { default: mongoose } = require("mongoose");





const pageVisitSchema = new mongoose.Schema({
  pageId: {
    type: String, 
  },
  duration: {
    type: Number,
    default: 0,
  }
}, { _id: false });

const visitSchema = new mongoose.Schema({
  visitId: {
    type: String,
  },
  title: String,
  path: String,
  timestamp: Date,
  duration: {
    type: Number,
    default: 0,
  },
  pageVisits: {
    type: Map,
    of: Number, 
    default: {}
  }
}, { _id: false });

const userVisitSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,

  visits: [visitSchema], 

  totalTimeSpent: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("UserVisit", userVisitSchema);