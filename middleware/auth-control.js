export default function ({ store, redirect }) {
  if (!store.state.AuthModule.isAuthenticated) {
    redirect('/auth/auth?message=login')
  }
}