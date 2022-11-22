import {FastifyInstance} from "fastify";

export default class ExampleController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api',
            this.sayHello.bind(this))
    }

    async sayHello(): Promise<string> {
        return 'Hello, friend'
    }

}

