import { uploadFileToStorage } from '@/api/storage';
import { insertToSoundDatabase } from '@/api/database';

export async function uploadSound(selectedFile: File, name: string, description: string, sourceURL: string) {
    if (!selectedFile) {
        alert('No file selected!');
        return;
    }
    const bucketItem = `sounds/${selectedFile.name}`
    uploadFileToStorage(selectedFile, selectedFile.name)
    insertToSoundDatabase(name, description, sourceURL, bucketItem)
}