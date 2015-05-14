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
    app.post("/post", mid.requiresLogin,  controllers.Adventure.adventurePost);
    app.post("/point", mid.requiresLogin,  controllers.Adventure.adventurePath);
    app.post("/start", mid.requiresLogin,  controllers.Adventure.adventureStart);
    app.get("/pastadventure", mid.requiresLogin, controllers.Adventure.pastAdventurePage);
    app.get("/map", mid.requiresLogin, controllers.Adventure.mapPage);
};

module.exports = router; 