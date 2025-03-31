import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import AdminDashboard from '@/pages/AdminDashboard.vue';
import TeacherDashboard from '@/pages/TeacherDashboard.vue';
import StudentDashboard from '@/pages/StudentDashboard.vue';
import StudentProfile from '@/pages/StudentProfile.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },
    { path: '/teacher-dashboard', component: TeacherDashboard, meta: { requiresAuth: true, role: 'teacher' } },
    { path: '/student-dashboard', component: StudentDashboard, meta: { requiresAuth: true, role: 'student' } },
    { path: '/student-profile', component: StudentProfile, meta: { requiresAuth: true, role: 'student' } },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Route guards
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('access_token'); // Check if the user is authenticated
    const userRole = localStorage.getItem('user_role'); // Get the user's role

    // If the route requires authentication and the user is not authenticated, redirect to login
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ path: '/' });
    }
    // If the route requires a specific role and the user's role does not match, redirect to login
    else if (to.meta.role && to.meta.role !== userRole) {
        next({ path: '/' });
    }
    // Otherwise, allow access
    else {
        next();
    }
});

export default router;