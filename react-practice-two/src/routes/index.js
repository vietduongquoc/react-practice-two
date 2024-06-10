import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
// Public routers
const publicRoutes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }