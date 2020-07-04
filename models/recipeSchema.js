import SimpleSchema from "simpl-schema";
import { Mongo } from "meteor/mongo";

const Recipes = new Mongo.Collection("recipes");
const Schemas = {};

Schemas.Recipes = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200,
    optional: false,
  },
});

Recipes.attachSchema(Schemas.Recipes);

export { Recipes };
