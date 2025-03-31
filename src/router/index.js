import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import AdminDashboard from '@/pages/AdminDashboard.vue';
import TeacherDashboard from '@/pages/TeacherDashboard.vue';
import StudentDashboard from '@/pages/StudentDashboard.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
    { path: '/teacher-dashboard', component: TeacherDashboard, meta: { requiresAuth: true, role: 'teacher' } },
    { path: '/student-dashboard', component: StudentDashboard, meta: { requiresAuth: true, role: 'student' } },
    { path: '/student-profile', component: StudentProfile}, 
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// Route guards
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ path: '/' });
    } else if (to.meta.role && to.meta.role !== userRole) {
        next({ path: '/' });
    } else {
        next();
    }
});

export default router;
