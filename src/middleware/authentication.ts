import { signInWithEmail } from '@/api/authentication';
import router from '@/router';

export async function loginUserLoadSounds(email: string, password: string) {
    try {
        const user = await signInWithEmail(email, password);
        if (!user) {
            alert('Login failed. Check your credentials.');
            return false;
        }

        await router.push({ name: 'Home' });

        return true;
    } catch (error) {
        alert("Login failed due to unexpected error. " + error)
        return false;
    }
}
