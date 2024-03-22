
import { ElasticUserDB } from '@/clients/ElasticUserDB';
import { User } from '@/types/user';

export async function addUser(phoneNumber: string, userId: string) {
    const user: User = {
        phoneNumber,
        emailId: userId,
    }
    return await ElasticUserDB.getInstance().saveUser(user);
}

export async function updateUserPhoneNumber(phoneNumber: string, userId: string) {
    return await ElasticUserDB.getInstance().updateUserPhoneNumber(userId, phoneNumber);
}


export async function hasPhoneRegistered(userId:string) {
    const user = await ElasticUserDB.getInstance().getUserByEmailId(userId);
    return user?.phoneNumber !== undefined;    
}

export async function getPhone(userId:string) {
    const user = await ElasticUserDB.getInstance().getUserByEmailId(userId);
    return user?.phoneNumber;
}

export function getUserId(phoneNumber:string) {
    return ElasticUserDB.getInstance().getUserByPhoneNumber(phoneNumber).then(user => user?.emailId);
    
}