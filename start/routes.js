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
Route.put('/companies/:id', 'CompanyController.update').middleware('auth')
Route.delete('/companies/id', 'CompanyController.destroy').middleware('auth')
Route.post('/companies', 'CompanyController.store').middleware('auth')
Route.get('/companies', 'CompanyController.index').middleware('auth')
Route.get('/companies/:id', 'CompanyController.edit').middleware('auth')
Route.put('/phones/:id', 'PhonesDictionaryController.update').middleware('auth')
Route.delete('/phones/id', 'PhonesDictionaryController.destroy').middleware('auth')
Route.post('/phones', 'PhonesDictionaryController.store').middleware('auth')
Route.get('/phones', 'PhonesDictionaryController.index').middleware('auth')
Route.get('/phones/:id', 'PhonesDictionaryController.edit').middleware('auth')
Route.put('/sectors/:id', 'SectorController.update').middleware('auth')
Route.delete('/sectors/id', 'SectorController.destroy').middleware('auth')
Route.post('/sectors', 'SectorController.store').middleware('auth')
Route.get('/sectors', 'SectorController.index').middleware('auth')
Route.get('/sectors/:id', 'SectorController.edit').middleware('auth')
Route.put('/abonents/:id', 'AbonentController.update').middleware('auth')
Route.delete('/abonents/id', 'AbonentController.destroy').middleware('auth')
Route.post('/abonents', 'AbonentController.store').middleware('auth')
Route.get('/abonents', 'AbonentController.index').middleware('auth')
Route.get('/abonents/:id', 'AbonentController.edit').middleware('auth')
Route.put('/districts/:id', 'DistrictController.update').middleware('auth')
Route.delete('/districts/id', 'DistrictController.destroy').middleware('auth')
Route.post('/districts', 'DistrictController.store').middleware('auth')
Route.get('/districts', 'DistrictController.index').middleware('auth')
Route.get('/districts/:id', 'DistrictController.edit').middleware('auth')

Route.put('/ordertariffs/:id', 'OrderTariffController.update').middleware('auth')
Route.delete('/ordertariffs/id', 'OrderTariffController.destroy').middleware('auth')
Route.post('/ordertariffs', 'OrderTariffController.store').middleware('auth')
Route.get('/ordertariffs', 'OrderTariffController.index').middleware('auth')
Route.get('/ordertariffs/:id', 'OrderTariffController.edit').middleware('auth')

Route.put('/orderoptions/:id', 'OrderOptionController.update').middleware('auth')
Route.delete('/orderoptions/id', 'OrderOptionController.destroy').middleware('auth')
Route.post('/orderoptions', 'OrderOptionController.store').middleware('auth')
Route.get('/orderoptions', 'OrderOptionController.index').middleware('auth')
Route.get('/orderoptions/:id', 'OrderOptionController.edit').middleware('auth')

Route.put('/pricepolicies/:id', 'PricePolicyController.update').middleware('auth')
Route.delete('/pricepolicies/id', 'PricePolicyController.destroy').middleware('auth')
Route.post('/pricepolicies', 'PricePolicyController.store').middleware('auth')
Route.get('/pricepolicies', 'PricePolicyController.index').middleware('auth')
Route.get('/pricepolicies/:id', 'PricePolicyController.edit').middleware('auth')

Route.put('/arealines/:id', 'AreaLineController.update').middleware('auth')
Route.delete('/arealines/id', 'AreaLineController.destroy').middleware('auth')
Route.post('/arealines', 'AreaLineController.store').middleware('auth')
Route.get('/arealines', 'AreaLineController.index').middleware('auth')
Route.get('/arealines/:id', 'AreaLineController.edit').middleware('auth')

Route.put('/settings/:id', 'SettingController.update').middleware('auth')
Route.get('/settings/:id', 'SettingController.edit').middleware('auth')
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')
Route.post('/auth/logout', 'AuthController.logout')
