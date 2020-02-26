'use strict'
const User = use('App/Models/User')
class UserController {
    
    async showAllUsers({}){
        const users = await User.all();
        return users;
    }

    async userDetails({params, response}){
        let id = params.id;
        const user = await User.find(id);
        const res = {
            name: user.name,
            email: user.email
        }
        return response.json(res);
    }

    async register({request, response}){
        const {name, email, password } = request.only([
            'name',
            'email', 
            'password'
        ])

        const user = await User.create({
            name,
            email,
            password
        })

        return response.send({ message: 'User has been created.', user})
    }

    async login({request, response, auth}){
        const {email, password} = request.only(['email', 'password']);
        const token = await auth.attempt(email, password)

        return response.json(token)
    }
}

module.exports = UserController
