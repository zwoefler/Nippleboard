import { supabase } from './supabase';

export async function fetchSounds(): Promise<string[]> {
    const { data, error } = await supabase.storage.from('sounds').list();

    if (error) {
        console.error('Error fetching sounds:', error);
        return [];
    }

    return data.map((file) => file.name);
}
