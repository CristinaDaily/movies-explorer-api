import mongoose from 'mongoose';
import { isEmail } from 'validator';
// import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: {
        value: true,
        message: 'Email field is required',
      },
      validate: {
        validator: function validateEmail(v) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: true,
    },
    password: {
      type: String,
      required: {
        value: true,
        message: 'Password is required',
      },
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: {
        value: true,
        message: 'Name field is required',
      },
    },
  },
  { versionKey: false },
);

export default mongoose.model('user', userSchema);
