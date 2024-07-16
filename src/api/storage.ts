import { supabase } from './supabase';

export async function fetchSoundsFromSupabase() {
    try {
        const soundFolder = "sounds/"
        const { data: soundsList } = await supabase
            .storage
            .from('sounds')
            .list('sounds', {
                limit: 100
            });

        if (!soundsList) {
            console.error('No sounds list found.');
            return [];
        }

        const soundPaths = soundsList.map(file => soundFolder + file.name);
        const { data: signedURLs } = await supabase
            .storage
            .from('sounds')
            .createSignedUrls(soundPaths, 3600);

        const sounds = signedURLs.map(({ path, signedUrl }) => ({
            name: path?.split('/').pop(),
            url: signedUrl
        }));
        return sounds
    } catch (error) {
        console.error('Error fetching sounds from Supabase:', error);
        return []
    }
}

export async function downloadSoundFromSupabase(soundName) {
    try {
        const { data, error } = await supabase.storage.from('sounds').download(`sounds/${soundName}`);
        return data
    } catch (error) {
        console.error('Error downloading file:', error)
    }

}

export async function uploadFileToStorage(file, fileName) {
    const { data, error } = await supabase.storage.from('sounds').upload(`sounds/${fileName}`, file)
    if (error) {
        console.log("Ups, something went wrong")
    } else {
        console.log("Uploaded", data)
    }
}
