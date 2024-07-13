import { supabase } from './supabase';

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    return data
}
