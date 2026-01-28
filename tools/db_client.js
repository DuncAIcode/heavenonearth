
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from project root
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
// Fallback if running from root
if (!process.env.SUPABASE_URL) {
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
    console.warn("[DB_WARNING] Missing Supabase credentials. Client will fail if used.");
}

export const supabase = createClient(url || '', key || '');

/**
 * Deterministic User Fetcher
 * @returns {Promise<any[]>} List of users or empty array on error
 */
export async function getUsers() {
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        return data || [];
    } catch (e) {
        console.error(`[DB_ERROR] getUsers failed: ${e.message}`);
        return [];
    }
}

/**
 * Deterministic Post Creator
 * @param {Object} post - { title, content, author_id, published }
 */
export async function createPost(post) {
    try {
        const { data, error } = await supabase.from('posts').insert(post).select();
        if (error) throw error;
        return data ? data[0] : null;
    } catch (e) {
        console.error(`[DB_ERROR] createPost failed: ${e.message}`);
        return null;
    }
}
