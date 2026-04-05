import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
export function useAuth() {
    const authStore = useAuthStore();
    const router = useRouter();
    const login = (token) => {
        authStore.setToken(token);
        router.push('/');
    };
    const logout = () => {
        authStore.logout();
        router.push('/login');
    };
    return {
        isAuthenticated: authStore.isAuthenticated,
        token: authStore.token,
        user: authStore.decodeToken(),
        login,
        logout
    };
}
//# sourceMappingURL=useAuth.js.map