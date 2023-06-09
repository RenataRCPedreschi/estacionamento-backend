const { celebrate, Joi } = require("celebrate");
const { messages } = require("joi-translation-pt-br");

const schemaAvaliacoes = celebrate(
    {
        body: Joi.object().keys({
            comentario: Joi.string(),
            nota: Joi.number().required().messages({
                "string.empty": "É obrigatório atribuir uma nota"
            }),

        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);

const schemaAvaliacoesPut = celebrate(
    {
        body: Joi.object().keys({
            comentario: Joi.string(),
            nota: Joi.number(),

        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);

module.exports = {schemaAvaliacoes, schemaAvaliacoesPut}