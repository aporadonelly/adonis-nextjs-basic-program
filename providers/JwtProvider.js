"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

const jwt = require('jsonwebtoken');

class JwtProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton("Providers/Jwt", app => {
      const Config = app.use("Adonis/Src/Config");

      return {
        generate: (data) => {
          const secret = Config.get("app.appKey", "secret");

          const options = {
            jwtid: String(new Date().getTime()),
            expiresIn: "365d"
          };

          return jwt.sign(data, secret, options);
        },
        verify: token => {
          const secret = Config.get("app.appKey", "secret");

					try {
            const decodedToken = jwt.verify(token, secret);
            return decodedToken;
          } catch (error) {
            return false;
          }
        }
      };
    });

    this.app.alias("Providers/Jwt", "Jwt");
  }
}

module.exports = JwtProvider;