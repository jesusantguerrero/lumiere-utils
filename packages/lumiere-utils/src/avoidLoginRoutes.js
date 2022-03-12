export const avoidLoginRoutes = (router, route, isAuthenticated, config) => {
  if (!route || !route.matched) {
    return
  } else if (isAuthenticated &&  route.matched.some(record => config.loginRoutes.includes(record.path))) {
    return router.push({ name: config.home });
  } else if (!isAuthenticated && route.matched[0].meta.requiresAuth !== false) {
    return router.push({ name: config.loginRoutes[0] });
  }
}