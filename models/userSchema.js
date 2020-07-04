import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Users = new Mongo.Collection("users");

const Schemas = {};

Schemas.Users = new SimpleSchema({
  username: {
    type: String,
    label: "Username",
    optional: false,
    max: 200,
    min: 6,
    unique: true,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email",
  },
  password: {
    type: String,
    label: "Password",
    min: 8,
  },
});

Users.attachSchema(Schemas.Users);

export { Users };
