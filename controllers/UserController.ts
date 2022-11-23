import {FastifyInstance} from "fastify";
import httpErrors from 'http-errors'

export default class UserController {

    private router: FastifyInstance

    connectedUser;

    users = [
        {   id: 0,
            username: 'Axel',
            password: 'P@55w0rd',
            logged: false,
            token: 'secret'
        },
        {   id: 1,
            username: 'Fred',
            password: 'P@55w0rd',
            logged: false,
            token: 'secret'
        },
        {   id: 2,
            username: 'Olivia',
            password: 'P@55w0rd',
            logged: false,
            token: 'secret'
        }

    ]

    constructor(router: FastifyInstance) {
        this.router = router

        // Register routes to handle users
        router.get('/api/users', async (request, reply) => {
            var result = this.users.map( user => ({ username: user.username}))
            reply.send(result)
        })

        router.route({
            method: 'POST',
            url: '/api/users/register',
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                    }
                }
            },
            handler: async (request: any, reply) => {
                const newUserId = this.users.length
                const newUser = {
                    id: newUserId,
                    username: request.query.username,
                    password: request.query.password,
                    logged: false,
                    token: (Math.random() + 1).toString(36).substring(2)
                }
                this.users.push(newUser)
                reply.send({
                    username: newUser.username,
                    token: newUser.token
                })
            }
        })

        router.route({
            method: 'POST',
            url: '/api/users/login',
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                    }
                }
            },
            handler: async (request: any, reply) => {
                const found = this.users.find((user) =>{
                    return (user.username === request.query.username &&
                        user.password === request.query.password)

                })

                if(found !== undefined){
                    let newToken = (Math.random() + 1).toString(36).substring(2)
                    found.token = newToken //update user set in DB
                    found.logged = true  //update user set in DB
                    this.connectedUser = found
                    reply.send({
                        username: found.username,
                        token: newToken
                    })
                }

                reply.send(httpErrors.Unauthorized('no match for Password or Username'))
            }
        })

        router.route({
            method: 'POST',
            url: '/api/users/me',
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string'
                        },
                    }
                }
            },
            handler: async (request: any, reply) => {

                if(this.connectedUser.token === request.query.token){
                    reply.send({
                        username: this.connectedUser.username
                    })
                }

                reply.send(httpErrors.Unauthorized('bad token'))
            }
        })
    }



}


