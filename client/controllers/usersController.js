import { Template } from "meteor/templating";
import { Users } from "../../database/collections";
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
          const password = target.password.value.trim();

          const validationContext = Users.simpleSchema().newContext();

          const errorMessages = [];

          validationContext.validate({ email, username, password });

          if (validationContext.isValid()) {
            Users.insert({
              email: email,
              username: username,
              password: password,
            });

            target.email.value = "";
            target.username.value = "";
            target.password.value = "";
          } else {
            errorMessages.push(validationContext.validationErrors());

            errorMessages.forEach((errors) => {
              errors.forEach((message) => {
                console.log(message);
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
