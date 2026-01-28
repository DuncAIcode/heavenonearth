
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
    console.error("Error: Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(url, key);

async function testConnection() {
    try {
        // Try to select from a table that might exist, or just check URL access
        // We often check by querying a system table or non-existent one to see if we get a DB response
        const { data, error } = await supabase.from('users').select('*').limit(1);

        if (error) {
            // 404/406/Relation does not exist means we HIT the database but the table isn't there. SUCCESS.
            if (error.code === '42P01' || error.message.includes('permission') || error.message.includes('exist')) {
                console.log("Connection Verified: Reached Supabase (Database response received).");
                process.exit(0);
            }
            console.log(`Supabase Handshake Attempted. Result: ${error.message}`);
            // If it's a connection error, we'll know.
            if (!error.message.includes('fetch failed')) {
                console.log("Connection Verified: Reached Supabase.");
            } else {
                throw error;
            }
        } else {
            console.log("Connection Successful! (User table accessed)");
        }
    } catch (e) {
        console.error(`Handshake Failed: ${e.message}`);
        process.exit(1);
    }
}

testConnection();
