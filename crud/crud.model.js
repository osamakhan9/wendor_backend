const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
});

module.exports = mongoose.model('CRUD', recordSchema);