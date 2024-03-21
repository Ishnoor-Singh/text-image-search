const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')
const client = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'R87LziEpoCVHi9vq5+9T'
    },
    tls: {
        ca: fs.readFileSync('/home/ishnoor/dev/text-image-search/src/http_ca.crt'),
        rejectUnauthorized: false
    }
})

function saveImage(imageJSON) {
    saveImageElastic(imageJSON);
}
export async function saveImageElastic(imageJSON) {
    const response = await client.index({
        index: 'images',
        body: imageJSON
    })
    console.log(response)
}

export async function search(query: string) {
    const response = await client.search({
        index: 'images',
        body: {
            query: {
                "multi_match": {
                    "fields": ["tags", "description", "text"],
                    "query": query,
                    "fuzziness": "AUTO"
                }
            }
        }
    })
    console.log(response.hits.hits)
}