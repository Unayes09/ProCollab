const mongoose = require('mongoose');

const talkSchema = new mongoose.Schema({
    name: {
        type: String
    },
    talk: {
        type: String
    }
})

const channelSchema = new mongoose.Schema({
    channel_holder: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    talks: [talkSchema]
});

const channel = mongoose.model('channel', channelSchema);

module.exports = channel;
