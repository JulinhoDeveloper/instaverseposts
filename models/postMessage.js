const { Schema, model } = require('mongoose');


const postSchema = Schema({
   title: String,
   message: String,
   name: String,
   creator: String,
   tags: [String],
   selectedFile: String,
   likes: {
      type: [String],
      default: []
   },
   createdAt: {
      type: Date,
      default: new Date()
   }
})
module.exports= model("PostMessage", postSchema);