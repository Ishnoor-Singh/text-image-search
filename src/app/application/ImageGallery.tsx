import Images from "@/components/Images";
import { getSession } from "@auth0/nextjs-auth0";
import { ElasticImageDB } from "@/services/ElasticImageDB";

export default async function ImageGallery({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const selectedSearch = searchParams?.search ?? "";
    const query = Array.isArray(selectedSearch)
        ? selectedSearch[0]
        : selectedSearch;
    const userId = await getSession().then(session => session?.user?.email)
    return query ? <SearchImages userId={userId} query={query} /> : <AllImages userId={userId} />
}



async function AllImages({ userId }: { userId: string }) {
    const images = await ElasticImageDB.getInstance().getAllImages(userId).then(res => {
        if (res?.hits?.total?.value === 0) {
            return []
        }
        return (res.hits.hits.map(hit => ({ ...hit._source, id: hit._id })) as ImageData[])
    }).catch(err => {
        console.error({err})
    })
    return <Images images={images} />
}


async function SearchImages({ query, userId }: { query: string, userId: string }) {
    const images = await ElasticImageDB.getInstance().getImageSearchResults(query, userId).then(res => {
        if (res?.hits?.total?.value === 0) {
            return []
        }
        return (res.hits.hits.map(hit => ({ ...hit._source, id: hit._id })) as ImageData[])
    }).catch(err => {
        console.error(err)
    })
    return <Images images={images} />
}
