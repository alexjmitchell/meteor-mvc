import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

FlowRouter.route("/recipes", {
  name: "index",
  action() {
    const RecipeController = require("../controllers/recipeController")();
    import recipe from "../views/recipe.html";
    BlazeLayout.render("recipeview", recipe);
  },
});
