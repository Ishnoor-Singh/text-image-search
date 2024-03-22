import { Client } from '@elastic/elasticsearch';
import type { User } from '@/types/user';
import ElasticDB from './ElasticDB';

export class ElasticUserDB {
    private static instance: ElasticUserDB;
    private client: Client;
    private constructor() {
        this.client = ElasticDB.getClient();
    }
    public static getInstance(): ElasticUserDB {
        if (!this.instance) {
            this.instance = new ElasticUserDB();
        }
        console.log('getting user instance')
        
        return this.instance;
    }

    public getUserPhoneNumber(emailId: string): Promise<string | null> {
        return this.client.search({
            index: 'users',
            body: {
                query: {
                    match: {
                        emailId: emailId
                    }
                }
            }
        }).then((res) => {
            if (!res.hits) {
                return null;
            }
            if (res.hits?.total?.value === 0) {
                return null;
            }
            return res.hits.hits[0]._source.phoneNumber;
        }).catch(err => {
            console.error('hi')
        })
    }

    public saveUser(user: User) {
        return this.client.index({
            index: 'users',
            body: {
                ...user
            }
        })
    }

    public updateUserPhoneNumber(emailId: string, phoneNumber: string) {
        return this.client.updateByQuery({
            index: 'users',
            body: {
                script: {
                    source: 'ctx._source.phoneNumber = params.phoneNumber',
                    lang: 'painless',
                    params: {
                        phoneNumber: phoneNumber
                    }
                },
                query: {
                    match: {
                        emailId: emailId
                    }
                }
            }
        })
    }

    public getUserByEmailId(emailId: string): Promise<User | null> {
        return this.client.search({
            index: 'users',
            body: {
                query: {
                    term: {
                        "emailId.keyword": emailId
                    }
                }
            }
        }).then(res => {
            if (!res.hits) {
                return null;
            }
            if (res.hits?.total?.value === 0) {
                return null;
            }
            return res.hits.hits[0]._source;
        }).catch(err => {
            console.error(err)
        });
    }

    public getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
        return this.client.search({
            index: 'users',
            body: {
                query: {
                    term: {
                        "phoneNumber.keyword": "+14242102185"
                    }
                }
            }
        }).then(res => {
                        console.log({phoneNumber})
            
            if (!res.hits) {
                return null;
            }
            if (res.hits?.total?.value === 0) {
                return null;
            }
            return res.hits.hits[0]._source;
        }).catch(err => {
            console.error(err)
        });
    }
}