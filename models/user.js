const mongoose = ('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   id: { type: String }
})
module.exports=mongoose.model("UserPostMessage", userSchema);