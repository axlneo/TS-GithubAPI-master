import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    token: string | undefined

    @Column()
    logged: boolean = false


    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
