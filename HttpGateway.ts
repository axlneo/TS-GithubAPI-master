import fastify, {FastifyInstance} from 'fastify'

export default class HttpGateway  {

    private readonly instance: FastifyInstance

    constructor() {
        this.instance = fastify({logger: true});
    }

    get router() {
        return this.instance
    }

    get port() {
        return 3000
    }

    async start() {
        await this.instance.listen(this.port, '127.0.0.1')
    }

}
