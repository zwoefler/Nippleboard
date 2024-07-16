import { supabase } from './supabase';

interface Sound {
    name: string;
    url: string;
}

export async function fetchSoundsFromSupabase(): Promise<Sound[]> {
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
        const { data: signedURLs, error: urlsError } = await supabase
            .storage
            .from('sounds')
            .createSignedUrls(soundPaths, 3600);

        if (urlsError) {
            console.error('Error getting signed URLs:', urlsError);
            return [];
        }

        const sounds = signedURLs.map(({ path, signedUrl }) => ({
            name: path?.split('/').pop() || "Unnamed Sound",
            url: signedUrl
        }));
        return sounds
    } catch (error) {
        console.error('Error fetching sounds from Supabase:', error);
        return []
    }
}

export async function downloadSoundFromSupabase(soundName: string) {
    try {
        const { data, error } = await supabase.storage.from('sounds').download(`sounds/${soundName}`);
        if (error) {
            console.error("ERROR downloading sound: ", error);
            return null;
        }
        return data
    } catch (error) {
        console.error('Error downloading file:', error)
    }

}


export async function uploadFileToStorage(file: File, fileName: string) {
    const { data, error } = await supabase.storage.from('sounds').upload(`sounds/${fileName}`, file)
    if (error) {
        console.log("Ups, something went wrong")
    } else {
        console.log("Uploaded", data)
    }
}
