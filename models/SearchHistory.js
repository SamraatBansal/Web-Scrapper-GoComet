// Defining the Schema of The database and exporting the module

const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
    tag:{
        type: String
    },
    next:{
        type: String
    },
    cards:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CardContent'
    }]
}, {timestamps:true});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistory;