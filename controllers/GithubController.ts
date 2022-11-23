import {FastifyInstance} from "fastify";
import httpErrors from 'http-errors'
import { Octokit } from "@octokit/rest";

export default class GithubController {

    private router: FastifyInstance


    constructor(router: FastifyInstance) {
        this.router = router


        router.get('/api/github/feed', async (request, reply) => {

            const octokit = new Octokit({
                auth: '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'
            })

            var result = await octokit.request('GET /events{?per_page,page}', {})

            reply.send(result)
        })

        router.get('/api/github/users/:actor_login', async (request:any, reply) => {

            const octokit = new Octokit({
                auth: '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'
            })

            var result = await octokit.request('GET /users/{username}', {
                username: request.params.actor_login
            })
            reply.send(result)
        })

    }
}


