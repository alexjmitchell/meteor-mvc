import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
const UsersController = require("../controllers/usersController")();

import usersPage from "../views/login.html";

FlowRouter.route("/login", {
  name: "Login",
  action() {
    UsersController.loginFormHelper;
    BlazeLayout.render("loginForm", usersPage);
  },
});

FlowRouter.route("/register", {
  name: "Register",
  action() {
    UsersController.registrationFormSubmit;
    BlazeLayout.render("registrationForm", usersPage);
  },
});
