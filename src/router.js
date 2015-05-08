var controllers = require('./controllers'); 
var mid = require('./middleware');

var router = function(app) {

    app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage); 
    app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login); 
    app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
    app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get("/logout", mid.requiresLogin, controllers.Account.logout);
    app.get("/maker", mid.requiresLogin, controllers.Locator.makerPage);
    app.post("/maker", mid.requiresLogin,  controllers.Locator.make);
    app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.get("/profile", mid.requiresLogin, controllers.Adventure.profilePage);
    app.get("/adventure", mid.requiresLogin, controllers.Adventure.adventurePage);
    app.post("/adventure", mid.requiresLogin,  controllers.Adventure.adventurePost);
    app.get("/pastadventure", mid.requiresLogin, controllers.Adventure.pastAdventurePage);
};

module.exports = router; 