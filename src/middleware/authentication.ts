import { useSoundsStore } from '@/stores/sounds';
import { signInWithEmail } from '@/api/authentication';
import router from '@/router';

export async function loginUserLoadSounds(email: string, password: string) {
    const soundsStore = useSoundsStore();

    try {
        const user = await signInWithEmail(email, password);
        if (!user) {
            alert('Login failed. Check your credentials.');
            return false;
        }

        await router.push({ name: 'Home' });
        await soundsStore.loadSounds();

        return true;
    } catch (error) {
        alert("Login failed due to unexpected error. " + error)
        return false;
    }
}
