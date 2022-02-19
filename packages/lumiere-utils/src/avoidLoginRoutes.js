export const avoidLoginRoutes = (route, isAuthenticated, config) => {
    if (isAuthenticated && route && route.matched.some(record => config.loginRoutes.includes(record.path))) {
      myRouter.push({ name: config.home });
    } else if (!isAuthenticated && route.matched && route.matched[0].meta.requiresAuth !== false) {
      myRouter.push({ name: config.loginRoutes[0] });
    }
    return
}