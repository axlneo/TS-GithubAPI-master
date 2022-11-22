import {FastifyInstance} from "fastify";

export default class HealthcheckController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api/healthcheck',
            this.healthcheck.bind(this))
    }

    async healthcheck(): Promise<any> {
        return {
            "name": "github-api",
            "version": "1.0",
            "time": (Date.now())
        }
    }

}

