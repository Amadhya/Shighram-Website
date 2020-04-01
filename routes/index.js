const routes = require('next-routes');
const Routes = routes();

const allRoutes=[
  ['login','/login','/login'],
  ['signup','/signup','/signup'],
  ['forgot_password','/forgot_password','/forgot_password'],
  ['reset_password','/reset_password/[uid]/[token]','/reset_password/[uid]'],
  ['slots_view', '/slots_view', '/slots_view'],
  ['settings', '/settings', '/settings'],
  ['payment', '/payment', '/payment'],
  ['pay_order', '/pay_order', '/pay_order'],
  ['payment_success','/payment_success','/payment_success']
];

for (let i = 0; i < allRoutes.length; i += 1) {
  Routes.add(...allRoutes[i]);
}

module.exports = Routes;