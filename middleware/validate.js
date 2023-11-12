import { celebrate, Joi, Segments } from 'celebrate';

const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}(:\d{1,5})?([/?#]\S*)?$/;

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    name: Joi.string().min(2).max(30).optional(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegex).required(),
    trailerLink: Joi.string().regex(urlRegex).required(),
    thumbnail: Joi.string().regex(urlRegex).required(),
    owner: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(/^[а-яА-Я0-9\s.,:;!?()]+$/),
    nameEN: Joi.string().required().regex(/[a-zA-Z0-9\s.,:;!?()]+/),
  }),
});

const validateMovieId = celebrate({
  body: Joi.object().keys({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24).required(),
    }),
  }),
});

export {
  validateUser, validateLoginData, validateUserUpdate, validateMovie, validateMovieId,
};
