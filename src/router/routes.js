const routes = [
  {
    path: '/',
    component: () => import('pages/Login/Login.vue')
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('pages/Home.vue'),
    props: { loginPath: '' }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
