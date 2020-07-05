import { Template } from "meteor/templating";
import { Users } from "../../database/collections";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HTTP } from "meteor/http";
import SimpleSchema from "simpl-schema";

const UsersController = () => {
  return {
    loginFormHelper: Template.loginForm.helpers({
      pageTitle: "Login",
    }),
    registrationFormHelper: Template.registrationForm.helpers({
      pageTitle: "Register",
    }),
    registrationFormSubmit: Template.registrationForm.events({
      "submit .regForm"(event) {
        try {
          event.preventDefault();

          const target = event.target;
          const email = target.email.value.trim();
          const username = target.username.value.trim();
          let password = target.password.value.trim();

          const validationContext = Users.simpleSchema().newContext();

          const errorMessages = [];

          validationContext.validate({ email, username, password });

          if (validationContext.isValid()) {
            const registerUser = async () => {
              let user = Users.findOne({ username: username });
              if (user) {
                console.log("user already in system");
                return;
              }

              const salt = await bcrypt.genSalt(10);
              password = await bcrypt.hash(password, salt);

              user = Users.insert({
                email: email,
                username: username,
                password: password,
              });

              const payload = {
                user: {
                  id: user.id,
                },
              };

              jwt.sign(
                payload,
                "randomString",
                {
                  expiresIn: 10000,
                },
                (err, token) => {
                  if (err) throw err;
                  HTTP.call("POST", "http://localhost:3000", {
                    data: {
                      token: token,
                    },
                    statusCode: 200,
                  });
                }
              );
            };

            registerUser();

            target.email.value = "";
            target.username.value = "";
            target.password.value = "";
          } else {
            errorMessages.push(validationContext.validationErrors());

            errorMessages.forEach((errors) => {
              errors.forEach((message) => {
                console.log(message);
                switch (message.type) {
                  case "minString":
                    alert(`${message.name} needs to be at least 8 characters`);
                    break;
                  default:
                    console.log("something went wrong");
                    break;
                }
              });
            });
          }
        } catch (error) {
          console.log("error", error);
          throw error;
        }
      },
    }),
  };
};

module.exports = UsersController;
