import mongoose from 'mongoose';
import validator from 'validator';

const { isURL } = validator;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: {
      value: true,
      message: 'Country field is required',
    },
  },
  director: {
    type: String,
    required: {
      value: true,
      message: 'Director field is required',
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
        return isURL(v);
      },
      message: (props) => `${props.value} is not a valid image link`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: function validateLink(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} is not a valid trailler link`,
    },

  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: function validateImage(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} is not a valid image link`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validator: function validateRussianLetters(value) {
      const ruLettersRegex = /^["«»а-яА-Яa-zA-Z0-9\s.,:;!?&()]+$/;
      return ruLettersRegex.test(value);
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: function validateRussianLetters(value) {
        const enLettersRegex = /[a-zA-Z0-9\s.,:;!?()]+/;
        return enLettersRegex.test(value);
      },
    },
  },
});

export default mongoose.model('movie', movieSchema);
