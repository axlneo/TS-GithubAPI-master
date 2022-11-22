import {FastifyInstance} from "fastify";

export default class EasterEggController {

    private router: FastifyInstance

    constructor(router: FastifyInstance) {
        this.router = router

        router.get('/api/timemachine/logs/mcfly',
            this.easteregg.bind(this))
    }

    async easteregg(): Promise<any> {
        return [
            {
                "name": "My mom is in love with me",
                "version": "1.0",
                "time": -446723100
            },
            {
                "name": "I go to the future and my mom end up with the wrong guy",
                "version": "2.0",
                "time": 1445470140
            },
            {
                "name": "I go to the past and you will not believe what happens next",
                "version": "3.0",
                "time": -(Number.MAX_VALUE)
            }
        ]
    }

}

