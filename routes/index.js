const routes = require('next-routes');
const Routes = routes();

const allRoutes=[
  ['login','/login','/login'],
  ['signup','/signup','/signup'],
  ['slots_view', '/slots_view', '/slots_view'],
  ['profile', '/profile/:id', '/profile'],
  ['settings', '/settings', '/settings'],
  ['payment', '/payment', '/payment'],
  ['payment_success','/payment_success','/payment_success']
];

for (let i = 0; i < allRoutes.length; i += 1) {
  Routes.add(...allRoutes[i]);
}

module.exports = Routes;