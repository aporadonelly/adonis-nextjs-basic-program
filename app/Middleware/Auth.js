"use strict";

const Jwt = use("Jwt");
const User = use("App/Models/User");

class Auth {
  async handle(ctx, next) {
    const { request, response } = ctx;

    let token;
    if ((token = request.header("authorization"))) {
      token = token.split(" ");
      token = token.length === 2 && token[1];
    }

    if (!token) {
      return response.unauthorized({ message: "No authorization token found" });
    }

    const data = Jwt.verify(token);
    if (!data) {
      return response.unauthorized({ message: "Provided token is not valid" });
    }

    const user = await User.findOne({
      _id: data.user,
      deletedAt: null
    }).populate("roles");

    if (!user) return response.unauthorized({ message: "User not found" });

    ctx.auth = { user, token };

    await next();
  }
}

module.exports = Auth;