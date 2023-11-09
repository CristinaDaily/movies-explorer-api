import { celebrate, Joi, Segments } from 'celebrate';

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
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
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
  validateUser, validateLoginData, validateUserUpdate, validateMovie, validateMovieId
};
