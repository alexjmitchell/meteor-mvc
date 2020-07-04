import { Template } from "meteor/templating";
import { Recipes } from "../../database/collections";

const RecipeController = () => {
  return Template.recipeview.helpers({
    text: "text from recipeview helper",
    recipes() {
      return Recipes.find({});
    },
  });
};

module.exports = RecipeController;
