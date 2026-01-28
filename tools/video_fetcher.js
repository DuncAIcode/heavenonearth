
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
if (!process.env.YOUTUBE_API_KEY) {
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

const apiKey = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Fetch latest videos from a channel (defaults to Google for demo)
 * @param {string} channelId 
 * @param {number} maxResults 
 */
export async function getLatestVideos(channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw', maxResults = 5) {
    if (!apiKey) {
        console.error("[YT_ERROR] No API Key provided");
        return [];
    }

    // First get Uploads playlist ID
    try {
        // For simplicity in this tool, we'll just search for now to avoid 2-step channel lookup if ID is unknown
        // But better pattern: Search for channel -> Get contentDetails -> Get uploads -> Get videos

        // Simplified: Search (Cost: 100 quota units usually, expensive! Be careful)
        // Better: PlaylistItems (Cost: 1 unit) if we know the Uploads Playlist ID.
        // Let's assume we want to search for now but limit it.

        const url = `${BASE_URL}/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
        const response = await fetch(url);

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`API Error ${response.status}: ${err}`);
        }

        const data = await response.json();
        return data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt
        }));

    } catch (e) {
        console.error(`[YT_ERROR] fetch failed: ${e.message}`);
        return [];
    }
}
