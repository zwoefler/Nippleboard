import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SoundDetail from '../views/SoundDetail.vue';
import Login from '../views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sound/:id',
        name: 'SoundDetail',
        component: SoundDetail,
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;

