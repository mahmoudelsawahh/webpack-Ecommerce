import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email : { type: String, require: true, index:true, unique:true, sparse:true},
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});
const User = mongoose.model('User', userSchema);
export default User;
