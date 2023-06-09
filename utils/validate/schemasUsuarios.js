const { celebrate, Joi } = require("celebrate");
const { messages } = require("joi-translation-pt-br");

const schemaUsuario = celebrate(
    {
        body: Joi.object().keys({
            nome: Joi.string().required().messages({
                "string.empty": "O nome é obrigatório",
            }),
            email: Joi.string().required().messages({
                "string.empty": "O e-mail é obrigatório",
            }),
            senha: Joi.string()
                .required()
                .min(8)
                .custom((value, helpers) => {
                    if (value.length < 8) {
                        return helpers.error("string.min", { limit: 8 });
                    }
                    if (!/[a-z]/.test(value)) {
                        return helpers.error("string.pattern.base", {
                            regex: "uma letra minúscula",
                        });
                    }
                    if (!/[A-Z]/.test(value)) {
                        return helpers.error("string.pattern.base", {
                            regex: "uma letra maiúscula",
                        });
                    }
                    if (!/[0-9]/.test(value)) {
                        return helpers.error("string.pattern.base", { regex: "um número" });
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                        return helpers.error("string.pattern.base", {
                            regex: "um caractere especial",
                        });
                    }
                    return value;
                })
                .messages({
                    "any.required": "A senha é obrigatória",
                    "string.empty": "A senha não pode ser vazia",
                    "string.min": "A senha deve ter no mínimo {#limit} caracteres",
                    "string.pattern.base": "A senha deve conter pelo menos {#regex}",
                })
                .error((errors) => {
                    return errors[0];
                }),
        }),
    },
    {
        abortEarly: false,
        messages: messages,
    }
);

const schemaUsuarioPut = celebrate({
    body: Joi.object().keys({
        nome: Joi.string(),
        email: Joi.string(),
        senha: Joi.string()
                .min(8)
                .custom((value, helpers) => {
                    if (value.length < 8) {
                        return helpers.error("string.min", { limit: 8 });
                    }
                    if (!/[a-z]/.test(value)) {
                        return helpers.error("string.pattern.base", {
                            regex: "uma letra minúscula",
                        });
                    }
                    if (!/[A-Z]/.test(value)) {
                        return helpers.error("string.pattern.base", {
                            regex: "uma letra maiúscula",
                        });
                    }
                    if (!/[0-9]/.test(value)) {
                        return helpers.error("string.pattern.base", { regex: "um número" });
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                        return helpers.error("string.pattern.base", {
                            regex: "um caractere especial",
                        });
                    }
                    return value;
                })
                .messages({
                    "any.required": "A senha é obrigatória",
                    "string.empty": "A senha não pode ser vazia",
                    "string.min": "A senha deve ter no mínimo {#limit} caracteres",
                    "string.pattern.base": "A senha deve conter pelo menos {#regex}",
                })
                .error((errors) => {
                    return errors[0];
                }),
    })
})

module.exports = { schemaUsuario, schemaUsuarioPut };
