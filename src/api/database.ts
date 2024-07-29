import { supabase } from './supabase';

export async function insertToSoundDatabase(soundName: string, description: string, sourceURL: string, bucketItem: string) {
    try {
        console.log(soundName, description, sourceURL, bucketItem)
        const { data, error } = await supabase
            .from('sounds')
            .insert([
                { name: soundName, source_url: sourceURL, description: description, bucket_item: bucketItem },
            ])
            .select()
        return data
    } catch (error) {
        console.log("ERROR uploading sound ", soundName)
        console.error(error)
    }
}

export async function readSoundsMetaData() {
    try {
        let { data: sounds, error } = await supabase
            .from('sounds')
            .select('*')
        if (error) {
            throw error;
        }
        return sounds;

    } catch (error) {
        console.error('Failed to fetch sounds metadata:', error.message);
        return [];
    }

}