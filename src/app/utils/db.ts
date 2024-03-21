import fs from 'fs';
import fetch from 'node-fetch';
import { HOSTING_BASE_URL } from '../../constants';
import { saveImageElastic } from './elastic';
export function saveImage(imageJSON) {
    saveImageJSON(imageJSON);
    saveImageElastic(imageJSON);
}


async function saveImageJSON(imageJSON) {
    const DB_PATH = 'public/db.json';
    const db = await fetch(`${HOSTING_BASE_URL}/db.json`)
        .then((response) => response.json())
    db.push(imageJSON);
    fs.writeFileSync(DB_PATH, JSON.stringify(db));
}