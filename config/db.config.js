const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/company-system'
).then(() => console.log('MongoDB connected successfully'))

module.exports = mongoose;