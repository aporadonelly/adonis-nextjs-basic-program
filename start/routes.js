'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Env = use("Env");
const Config = use("Config");
const swaggerJSDoc = use('swagger-jsdoc');



Route.get('/api-specification', () => {
  return `
openapi: "3.0.0"
info:
  version: 1.0.0
  title: API Documentation
  license:
    name: MIT
servers:
  - url: ${Env.get('APP_URL')}
components:
  schemas:
    Article:
      type: object
      properties:
        title:
          type: string
        slug:
          type: string
        body:
          type: string
paths:
  /articles:
    get:
      tags:
        - Articles
      summary: List all articles
      operationId: listArticles
      responses:
        200:
          description: Article list
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  data:
                    type: array
                    items:
                      $ref: "#/components/schemas/Article"
    post:
      summary: Create an article
      operationId: createArticle
      tags:
        - Articles
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              required:
                - title
                - body
              properties:
                title:
                  type: string
                  default: Default Title
                body:
                  type: string
      responses:
        201:
          description: Article created
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Article"
`
})

Route.get('/api-specification', async () => {
  // https://swagger.io/docs/specification/about/
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: Config.get('app.name'),
      version: '1.0.0'
    },
    servers: [{ url: `/` }],
    basePath: '/',
    security: [{ bearerAuth: [] }],
    schemes: Env.get('NODE_ENV') === 'production' ? ['https'] : ['http'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  };

  const options = {
    definition: swaggerDefinition,
    apis: ['./start/**/**.js', './start/**/**.yaml']
  };

  return swaggerJSDoc(options);
});


Route.on('/').render('welcome')
const User = use('App/Models/User');


Route.post('/register', 'AuthController.register');
Route.post('/login', 'AuthController.login');


Route.group(() => {
  Route.get('/', 'AuthController.user').middleware('auth');
  Route.get('/show-all', 'AuthController.showAllUsers');
  Route.get('/:_id', 'AuthController.userDetails');
  Route.delete('/:_id', 'AuthController.deleteUser');
  Route.post('/:_id', 'AuthController.updateUser');
}).prefix('user')


Route.get('/api-documentation', ({ view }) => {
    return view.render('swagger', { specUrl: '/api-specification' })
  })