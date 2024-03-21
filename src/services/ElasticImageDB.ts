import {Client} from '@elastic/elasticsearch';


export class ElasticImageDB {
    private static instance: ElasticImageDB;
    private client: Client;
    private constructor() {
        this.client = new Client({
            node: process.env.ELASTICSEARCH_URL,
            auth: {
                apiKey: process.env.ELASTICSEARCH_API_KEY
            },
            // auth: {
            //     username: process.env.ELASTICSEARCH_USER,
            //     password: process.env.ELASTICSEARCH_PWD
            // },
            
            // tls: {
            //     // ca: fs.readFileSync(process.env.ELASTICSEARCH_CERT_PATH),
            //     rejectUnauthorized: false
            // }
        })
    }

    public static getInstance(): ElasticImageDB {
        if (!this.instance) {
            this.instance = new ElasticImageDB();
        }
        return this.instance;

    }

    public getAllImages(userId: string, page=0) {
        const PAGE_SIZE = 20;
        return this.client.search({
            index: 'images',
            body: {
                query: {
                    bool: {
                        filter: [
                            { match_phrase: { userId: userId } },
                        ]
                    }
                    }
                },
                  from: page * PAGE_SIZE,
                size: PAGE_SIZE
        })
    }

    public saveImage(imageData: ImageData) {
        return this.client.index({
            index: 'images',
            body: {
                ...imageData
            }
        })
    }

    public getImageById(imageId: string) {
        return this.client.get({
            index: 'images',
            id: imageId
        })
    }

    public getImageByURL(url: string) {
        return this.client.search({
            index: 'images',
            body: {
                query: {
                    match: {
                        imageURL: url
                    }
                }
            }
        })

    }

    public getImageSearchResults(query: string, userId: string, page=0) {
        const PAGE_SIZE = 20;
        return this.client.search({
            index: 'images',
            body: {
                query: {
                    bool: {
                        filter: [
                            { match_phrase: { userId } },
                        ],
                        must:{
                            multi_match: {
                            fields: ["tags", "description", "text"],
                            query: query,
                            fuzziness: "AUTO"
                        }
                    }
                    }
                },
                from: page * PAGE_SIZE,
                size: PAGE_SIZE
            }
        })
    }

}

class DB {
    private static instance: DB;
    private constructor() {}

    public static getInstance(): DB {}
}


class ImageDB extends DB {
    private static instance: ImageDB;
    private constructor() {super()}

    public static getInstance(): ImageDB {}

    public static getAllImages(userId: string, page=0) {}

    public static getImageById(imageId: string) {}

    public static saveImage(imageData: ImageData, userId: string) {}
}