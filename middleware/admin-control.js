export default ({ route, store, redirect }) => {
  if (!store.state.AuthModule.isAuthenticated && route.path === '/admin') {
    redirect('/auth')
  }
}
