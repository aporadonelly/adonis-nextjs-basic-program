'use strict'
const Jwt = use('Jwt');
const Hash = use('Hash');
const User = use('App/Models/User');


class AuthController {

    //to login
    async login({ request, response }) {
        const { email, password } = request.post();
    
        const user = await User.findOne(
          { email, deletedAt: null },
          "+password"
        ).lean();
    
        if (!user) {
          return response
            .status(422)
            .json({ message: "Invalid Username or Password" });
        }
    
        const isSame = await Hash.verify(password, user.password);
    
        if (!isSame) {
          return response
            .status(422)
            .json({ message: "Invalid Username or Password" });
        }
    
        const token = Jwt.generate({
          user: String(user._id)
        });
    
        return response.ok({ message: "Login Successful", data: token });
      }

      
    //to register user
    async register({request, response}){
        const {email, firstName, lastName, password} =  request.post();

        try{
            const user = await User.create({
                email,
                name: {firstName, lastName},
                password: await Hash.make(password)
            });

            return response.status(201).json({data: user, message: "Registration Successful."});
        }catch(err){
            return response.status(500).json(err);
        }
    }

    async user({ response, auth }) {
      return response.ok({ data: auth.user });
    }

    
    //to show all users
    async showAllUsers({}){
      const users = await User.find({})
      return users;
  }


  //to show user details based on id passed
  async userDetails({params, response}){
    let id = params._id;    
    try{
      const user = await User.find({_id: id});
      return response.json(user)
    }catch(err){
      return "No user found."
    } 
  }
  

  //to delete user
  async deleteUser({params, response}) {
    let id = params._id;  
    try{
      await User.deleteOne({_id: id})
    }catch(err) {
      throw err
    }
    return 'User Deleted.'
  }


//   //to Update user
  async updateUser({params,  request, response}){
    const {email, firstName, lastName} = request.all();
    User.findOneAndUpdate(
      {_id : params._id}, 
      {name: {firstName, lastName}, email: email}, (err, result) => {
        if(err) {
          return response.send(err)
        }else{
          console.log("User details updated.");
          return response.status(200).json(result)
        }
      }
    )
    return 'User Updated.'
  }
}

module.exports = AuthController