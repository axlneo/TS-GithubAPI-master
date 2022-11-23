import {FastifyInstance} from "fastify";
import httpErrors from 'http-errors'
import {User} from "../entities/User";
import {AppDataSource} from "../app-data-source";
export default class UserController {

    private router: FastifyInstance

    connectedUser;
    users: Promise<User[]>;

/*    users = [
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

    ]*/

    constructor(router: FastifyInstance) {
        this.router = router
        const userRepository = AppDataSource.getRepository(User);
        this.users = userRepository.find();

        // Register routes to handle users
        router.get('/api/users', async (request, reply) => {
            var result = userRepository.find({
                select: ['username']
            });
            result.then(values => {  reply.send(values) })

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

                const newUser = new User(request.query.username, request.query.password);
                newUser.token = (Math.random() + 1).toString(36).substring(2);

                userRepository.save(newUser);
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
                const found = userRepository.findOne({
                    where: {
                        username: request.query.username,
                        password: request.query.password
                    },
                    select: ['username']
                });

                if(found !== undefined){
                    let newToken = (Math.random() + 1).toString(36).substring(2)
                    found.then(user => {
                        if((undefined !== user) && (user !== null)){
                           user.token = newToken;
                            // @ts-ignore
                            this.connectedUser = userRepository.update(user.id, user );
                        }

                    })


                    reply.send({
                        username:  this.connectedUser.username,
                        token:  this.connectedUser.token
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


