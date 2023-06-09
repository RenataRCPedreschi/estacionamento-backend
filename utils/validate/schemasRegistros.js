const { celebrate, Joi } = require("celebrate");
const { messages } = require("joi-translation-pt-br");


schemasRegistros = celebrate(
    {
        body: Joi.object().keys({
            data_inicio: Joi.date().iso().required().messages({
                "string.empty": "A data inicial é obrigatória"
            }),
            data_fim: Joi.date().iso().required().messages({
                "string.empty": "A data final é obrigatória"
            })
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);


schemasRegistrosPut = celebrate(
    {
        body: Joi.object().keys({
            data_inicio: Joi.date().iso().required().messages({
                "string.empty": "A data inicial é obrigatória"
            }),
            data_fim: Joi.date().iso().required().messages({
                "string.empty": "A data final é obrigatória"
            })
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);

module.exports = { schemasRegistros, schemasRegistrosPut };