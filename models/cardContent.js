// Defining the Schema of The database and exporting the module

const mongoose = require('mongoose');

const cardContentSchema = new mongoose.Schema({
    title:{
        type: String
    },
    contentPreview:{
        type: String
    },
    clapCount:{
        type: String
    },
    voterCount:{
        type: String
    },
    responseCount:{
        type: String
    },
    creatorName:{
        type: String
    },
    readingTime:{
        type: String
    },
    firstPublishedAt:{
        type: String
    },
    imageId:{
        type: String
    },
    postId:{
        type: String
    },
    mediumUrl:{
        type: String
    }
});

const CardContent = mongoose.model('CardContent', cardContentSchema);

module.exports = CardContent;