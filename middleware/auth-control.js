export default function ({ store, redirect }) {
  if (!store.getters['AuthModule/isAuthenticated']) {
    redirect('/auth/auth?message=login')
  }
}