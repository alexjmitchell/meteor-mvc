import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

import main from "../views/main.html";

FlowRouter.route("/", {
  name: "root",
  action() {
    // Render a template using Blaze

    BlazeLayout.render("test", main);

    // Can be used with BlazeLayout,
    // and ReactLayout for React-based apps
  },
});
