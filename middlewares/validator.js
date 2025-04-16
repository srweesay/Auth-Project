const Joi = require("joi")


exports.signupSchema = Joi.object({
    email:Joi.string().
             min(6).
             max(60).
             required().
             email({
                tlds:{allow:['com','net']}

            }),
    password:Joi.string().
                 required().
                 pattern(new RegExp("^(?=.*[a-z])(?=.*\d).{6,}$"))
})

exports.sigininSchema = Joi.object({
    email:Joi.string().
              min(6).
              max(60).
              required().
              email({
                tlds:{allow:["com", "net"]}
              }),
    password:Joi.string().
              required().
              pattern(new RegExp("^(?=.*[a-z])(?=.*\d).{6,}$"))
})
