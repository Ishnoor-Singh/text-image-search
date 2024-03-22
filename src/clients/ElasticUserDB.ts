import { Client } from '@elastic/elasticsearch';
import type { User } from '@/types/user';

export class ElasticUserDB {
    private static instance: ElasticUserDB;
    private client: Client;
    private constructor() {
        this.client = new Client({
            node: process.env.ELASTICSEARCH_URL,
            auth: {
                apiKey: process.env.ELASTICSEARCH_API_KEY
            },
        })
    }
    public static getInstance(): ElasticUserDB {
        if (!this.instance) {
            this.instance = new ElasticUserDB();
        }
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
            console.error(err)
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
}