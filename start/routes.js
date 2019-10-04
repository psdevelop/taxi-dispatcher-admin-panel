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
const Route = use('Route')

//Route.on('/').render('welcome')
Route.get('/', 'SiteController.index')
Route.put('/contacts/:id', 'ContactController.update').middleware('auth')
Route.delete('/contacts/id', 'ContactController.destroy').middleware('auth')
Route.post('/contacts', 'ContactController.store').middleware('auth')
Route.get('/contacts', 'ContactController.index').middleware('auth')
Route.put('/drivers/:id', 'DriverController.update').middleware('auth')
Route.delete('/drivers/id', 'DriverController.destroy').middleware('auth')
Route.post('/drivers', 'DriverController.store').middleware('auth')
Route.get('/drivers', 'DriverController.index').middleware('auth')
Route.get('/drivers/:id', 'DriverController.edit').middleware('auth')
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
Route.post('/auth/logout', 'AuthController.logout')
