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

    const textInferenceTask = async (apiKey: string) => {
        try {
          const response = await client.inference.putPipeline({
            id: 'openai_embeddings',
            body: {
              service: 'openai',
              service_settings: {
                api_key: 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,
              },
              task_settings: {
                model: 'text-embedding-ada-002',
              },
            },
          });

    const createOpenAIEmbeddingsIndex = async () => {
    try {
        const response = await client.indices.create({
        index: 'openai-embeddings',
        body: {
            mappings: {
            properties: {
                content_embedding: {
                type: 'dense_vector',
                dims: 1536,
                element_type: 'float',
                similarity: 'dot_product',
                },
                content: {
                type: 'text',
                },
            },
            },
        },
        });

    const createOpenAIEmbeddingsPipeline = async () => {
    try {
        const response = await client.ingest.putPipeline({
        id: 'openai_embeddings',
        body: {
            processors: [
            {
                inference: {
                model_id: 'openai_embeddings',
                input_output: {
                    input_field: 'content',
                    output_field: 'content_embedding',
                },
                },
            },
            ],
        },
        });

    const reindexDataWithEmbeddings = async () => {
        try {
            const response = await client.reindex({
            waitForCompletion: false,
            body: {
                source: {
                index: 'images',
                size: 50, // default is 1000. Reducing size to a smaller number makes the update of the reindexing process quicker which enables you to follow the progress closely and detect errors early.
                },
                dest: {
                index: 'openai-embeddings',
                pipeline: 'openai_embeddings',
                },
            },
            });
    const searchWithEmbeddings = async (query: string) => {
        try {
            const response = await client.search({
            index: 'openai-embeddings',
            body: {
                knn: {
                field: 'content_embedding',
                queryVectorBuilder: {
                    textEmbedding: {
                    modelId: 'openai_embeddings',
                    modelText: query,
                    },
                },
                k: 10,
                numCandidates: 100,
                },
                _source: ['id', 'content'],
            },
            });

    
        

    

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