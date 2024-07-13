import { supabase } from './supabase';

export async function fetchSounds() {
    const { data, error } = await supabase
        .storage
        .from('sounds')
        .list('sounds', {
            limit: 10
        });

    if (error) {
        console.error('Error fetching sounds:', error);
        return [];
    }

    return { data };
}
