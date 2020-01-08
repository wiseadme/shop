export default ({ route, store, redirect }) => {
  if (!store.state.AuthModule.isAuthenticated && route.path === '/admin') {
    redirect('/auth')
  }
  if (store.state.AuthModule.user && store.state.AuthModule.user.role !== 'admin' && route.path === '/admin') {
    redirect('/')
  }
}
