const { celebrate, Joi } = require("celebrate");
const { messages } = require("joi-translation-pt-br");

const schemaVagas = celebrate(
    {
        body: Joi.object().keys({
            localizacao: Joi.string().required().messages({
                "string.empty": "A localização é obrigatória"
            }),
            preco: Joi.number().required().messages({
                "string.empty": "O preço é obrigatório"
            }),
            tipo: Joi.string().required().messages({
                "string.empty": "O tipo de vaga é obrigatório"
            }),
            status: Joi.string().required().messages({
                "string.empty": "O status da vaga é obrigatório"
            })

        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);

const schemaVagasPut = celebrate(
    {
        body: Joi.object().keys({
            localizacao: Joi.string().required(),
            preco: Joi.number().required(),
            tipo: Joi.string().required(),
            status: Joi.string().required(),

        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);

module.exports = {schemaVagas, schemaVagasPut}