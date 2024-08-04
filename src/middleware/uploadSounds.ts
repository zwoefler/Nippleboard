import { uploadFileToStorage, deleteSoundFromStorage } from '@/api/storage';
import { insertToSoundDatabase, deleteSoundFromDatabase } from '@/api/database';

export async function uploadSound(selectedFile: File, name: string, description: string, sourceURL: string) {
    if (!selectedFile) {
        alert('No file selected!');
        return;
    }
    const bucketItem = `sounds/${selectedFile.name}`
    uploadFileToStorage(selectedFile, selectedFile.name)
    insertToSoundDatabase(name, description, sourceURL, bucketItem)
}



export async function deleteSoundFromSupabase(soundName: string, bucketItem: string) {
    try {
        const storageResponse = await deleteSoundFromStorage(bucketItem);
        if (storageResponse) {
            const dbResponse = await deleteSoundFromDatabase(soundName);
            if (dbResponse) {
                console.log("Successfully deleted sound from both storage and database.");
            }
        }
    } catch (error) {
        console.error("Failed to delete sound:", error.message);
    }
}