// One to bajazillion
// With thousands of documents, it's more efficient to store a
// reference to the parent in the child document.
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// Parent schema
const userSchema = new Schema({
    username: String,
    age: Number
})

// Child schema
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     const user = new User({ username: 'chickenfan99', age: 61 });
//     const tweet1 = new Tweet({ text: 'omg I love my chicken family', likes: 0 });
//     user.save();
//     tweet1.user = user;
//     tweet1.save();
// }
// makeTweets();

// const makeTweets = async () => {
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock bock my chickens make noises', likes: 1239 });
//     tweet2.user = user;
//     tweet2.save();
// }
// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}
findTweet();