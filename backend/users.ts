
export class User{
    constructor(public email:string,
                public name: string,
                private password:string
            ){

    }

    matches(another: User): boolean {
        return another !== undefined && 
        another.email === this.email && 
        another.password === this.password
    }
}

export const users: {[key:string]: User} = {
    "j@j.com": new User('j@j.com','juliana','j@j.com'),
    "a@a.com": new User('a@a.com','amanda','a@a.com')
}