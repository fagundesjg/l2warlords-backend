"use strict";

const Route = use("Route");

Route.get("/accounts", "AccountController.index");
Route.post("/accounts", "AccountController.store");
Route.get("/accounts/show/:login", "AccountController.show");
Route.put("/accounts", "AccountController.update");
Route.get("/grandbosses", "GrandbossDatumController.index");
Route.get("/characters/:filter", "CharacterController.index");
