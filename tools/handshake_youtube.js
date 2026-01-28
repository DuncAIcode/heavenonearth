
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.YOUTUBE_API_KEY;

if (!apiKey) {
    console.error("Error: Missing YOUTUBE_API_KEY in .env");
    process.exit(1);
}

async function testConnection() {
    try {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=Google&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`API Error: ${response.status} ${err}`);
        }

        const data = await response.json();
        console.log("Connection Successful! YouTube API Responded.");
        console.log(`Items found: ${data.items ? data.items.length : 0}`);

    } catch (e) {
        console.error(`YouTube Handshake Failed: ${e.message}`);
        process.exit(1);
    }
}

testConnection();
