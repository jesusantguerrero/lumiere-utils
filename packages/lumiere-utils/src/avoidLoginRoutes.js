export const avoidLoginRoutes = (route, isAuthenticated, config) => {
  if (isAuthenticated && route && route.matched.some(record => config.loginRoutes.includes(record.path))) {
    return myRouter.push({ name: config.home });
  } else if (!isAuthenticated && route.matched && route.matched[0].meta.requiresAuth !== false) {
    return myRouter.push({ name: config.loginRoutes[0] });
  }
}