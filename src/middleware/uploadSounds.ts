import { uploadFileToStorage } from '@/api/storage';

export async function uploadSound(selectedFile: File) {
    if (!selectedFile) {
        alert('No file selected!');
        return;
    }
    console.log('Uploading', selectedFile.name);
    uploadFileToStorage(selectedFile, selectedFile.name)
}