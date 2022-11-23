import "reflect-metadata"

import HttpGateway from "./HttpGateway";
import ExampleController from "./controllers/ExampleController";
import HealthcheckController from "./controllers/HealthcheckController";
import EasterEggController from "./controllers/EasterEggController";
import UserController from "./controllers/UserController";
import GithubController from "./controllers/GithubController";
import {DataSource} from "typeorm";
import {User} from "./entities/User";
import {AppDataSource} from "./app-data-source";





(async function main() {
    AppDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        })

    // Init Fastify router
    const http = new HttpGateway()

    // Controllers
    new ExampleController(http.router)
    new HealthcheckController(http.router)
    new EasterEggController(http.router)
    new UserController(http.router)
    new GithubController(http.router)

    // Fastify router start
    await http.start()



})()


