const { celebrate, Joi } = require("celebrate");
const { messages } = require("joi-translation-pt-br");

const schemaVeiculos = celebrate(
    {
        body: Joi.object().keys({
            placa: Joi.string().required().messages({
                "string.empty": "A placa é obrigatória",
            }),
            modelo: Joi.string().required().messages({
                "string.empty": "O modelo é obrigatório",
            }),
            cor: Joi.string().required().messages({
                "string.empty": "A cor é obrigatória",
            })
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);



const schemaVeiculosPut = celebrate(
    {
        body: Joi.object().keys({
            placa: Joi.string().required(),
            modelo: Joi.string().required(),
            cor: Joi.string().required(),
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);
module.exports = { schemaVeiculos, schemaVeiculosPut };