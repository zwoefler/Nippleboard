import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SoundDetail from '../views/SoundDetail.vue';
import Login from '../views/Login.vue';
import Upload from '../views/Upload.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sound/:name',
        name: 'SoundDetail',
        component: SoundDetail,
        props: true
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload
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

