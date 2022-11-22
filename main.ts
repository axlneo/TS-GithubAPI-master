import HttpGateway from "./HttpGateway";
import ExampleController from "./controllers/ExampleController";
import HealthcheckController from "./controllers/HealthcheckController";
import EasterEggController from "./controllers/EasterEggController";
import UserController from "./controllers/UserController";

(async function main() {
    // Init Fastify router
    const http = new HttpGateway()

    // Controllers
    new ExampleController(http.router)
    new HealthcheckController(http.router)
    new EasterEggController(http.router)
    new UserController(http.router)

    // Fastify router start
    await http.start()
})()
