import { supabase } from './supabase';

export async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@test.de',
        password: 'test',
    })
    return { data }
}
