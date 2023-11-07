import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: {
      value: true,
      message: 'Name field is required',
    },
  },
  direction: {
    type: String,
    required: {
      value: true,
      message: 'Name field is required',
    },
  },
  duration: {
    type: Number,
    required: {
      value: true,
      message: 'Name field is required',
    },
  },
  year: {
    type: String,
    required: {
      value: true,
      message: 'Name field is required',
    },
  },
  description: {
    type: String,
    required: {
      value: true,
      message: 'Name field is required',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function validateImage(v) {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(:\d{1,5})?([/?#]\S*)?$/;
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid image link`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: function validateLink(v) {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(:\d{1,5})?([/?#]\S*)?$/;
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid trailler link`,
    },

  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: function validateImage(v) {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(:\d{1,5})?([/?#]\S*)?$/;
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid image link`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validator: function validateRussianLetters(value) {
      const ruLettersRegex = /^[а-яА-Я0-9\s\.,:;!?()]+$/;
      return ruLettersRegex.test(value);
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: function validateRussianLetters(value) {
        const enLettersRegex = /[a-zA-Z0-9\s\.,:;!?()]+/;
        return enLettersRegex.test(value);
      },
    },
  },
});

export default mongoose.model('movie', movieSchema);
