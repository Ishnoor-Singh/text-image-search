import { Client } from '@elastic/elasticsearch';
export default class ElasticDB {
    private static client: Client;

    public static getClient(): Client {
        if (!this.client) {
            this.client = new Client({
                node: process.env.ELASTICSEARCH_URL,
                auth: {
                    apiKey: process.env.ELASTICSEARCH_API_KEY
                },
            })
        }

        return this.client;
    }

}