import { readSoundsMetaData } from '@/api/database';
import { fetchSoundsURLs } from "@/api/storage";

export async function fetchSoundsMetadata() {
    try {
        const soundsMetadata = await readSoundsMetaData();

        const soundPaths = soundsMetadata.map(item => item.bucket_item);
        const soundURLs = await fetchSoundsURLs(soundPaths);
        const mergedData = soundsMetadata.map(item => {
            const match = soundURLs.find(urlItem => urlItem.path === item.bucket_item);
            return match ? { ...item, signedURL: match.signedUrl } : item;
        });
        console.log("MERGED DATA", mergedData)
        // return mergedData;
    } catch (error) {
        console.error('Error fetching or merging sound metadata:', error);
        return [];
    }
}