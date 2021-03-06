var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({

    url: {
    type: String,
    required: true
  },
  // `datePublish` is required and of type String
  datePublish: {
    type: String,
    required: true
  },
    // `title` is required and of type String
  author: {
    type: String,
    required: true
  },
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `summary` is required and of type String
  body: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
