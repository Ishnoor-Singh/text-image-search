
import { getSession } from '@auth0/nextjs-auth0';
import fs from 'fs';

export async function updateUserPhoneNumber(phoneNumber: string) {
    const session = await getSession();
    const userId = session?.user?.email;
    // update json  at src/phones.json to have an entry phoneNumber:userId
    const phoneData = fs.readFileSync('src/phones.json', 'utf8');
    const phoneJson = JSON.parse(phoneData);
    phoneJson[phoneNumber] = userId;
    fs.writeFileSync('src/phones.json', JSON.stringify(phoneJson));
}

export async function hasPhoneRegistered(userId:string) {
    const phoneData = fs.readFileSync('src/phones.json', 'utf8');
    const phoneJson = JSON.parse(phoneData);
    return Object.keys(phoneJson).map(key => phoneJson[key]).includes(userId);
    
}

export async function getPhone(userId:string) {
    const phoneData = fs.readFileSync('src/phones.json', 'utf8');
    const phoneJson = JSON.parse(phoneData);
    return Object.keys(phoneJson).find(key => phoneJson[key] === userId);
}

export function getUserId(phoneNumber:string) {
    const phoneData = fs.readFileSync('src/phones.json', 'utf8');
    const phoneJson = JSON.parse(phoneData);
    return phoneJson[phoneNumber];
}