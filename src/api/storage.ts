import { supabase } from './supabase';

interface Sound {
    name: string;
    url: string;
    description: string;
    source_url: string;
}

export async function fetchSoundsURLs(soundPaths: []) {
    try {
        const { data: signedURLs, error: urlsError } = await supabase
            .storage
            .from('sounds')
            .createSignedUrls(soundPaths, 3600);

        if (urlsError) {
            console.error('Error getting signed URLs:', urlsError);
            return [];
        }
        return signedURLs;

    } catch (error) {
        console.error('Error fetching sounds from Supabase:', error);
        return []
    }
}

export async function downloadSoundFromSupabase(soundFile: string) {
    try {
        const { data, error } = await supabase.storage.from('sounds').download(`sounds/${soundFile}`);
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
