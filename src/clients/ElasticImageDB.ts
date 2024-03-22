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
        })
    }

    public static getInstance(): ElasticImageDB {
        if (!this.instance) {
            this.instance = new ElasticImageDB();
        }
        return this.instance;
    }

    public getAllImages(userId: string, page:number=0): Promise<ImageData[] | null>{
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
        }).then((res) => {
            if (!res.hits) {
                return null;
            }
            if (res.hits?.total?.value === 0) {
                return []
            }
            return res.hits.hits.map(hit => ({ ...hit._source, id: hit._id }).reverse())
        }).catch(err => {
            console.error(err)
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

    public getImageSearchResults(query: string, userId: string, page:number=0): Promise<ImageData[] | null>{
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
        }).then((res) => {
                    if (!res.hits) {
                        return null;
                    }
                    if (res.hits?.total?.value === 0) {
                        return []
                    }
                    return res.hits.hits.map(hit => ({ ...hit._source, id: hit._id }))
                }).catch(err => {
                    console.error(err)
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