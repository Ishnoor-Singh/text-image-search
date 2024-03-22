import Images from "@/components/Images";
import { getSession } from "@auth0/nextjs-auth0";
import { ElasticImageDB } from "@/clients/ElasticImageDB";

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
    const images = await ElasticImageDB.getInstance().getAllImages(userId)
    if (images === null) {
        return <div>Failed to load images</div>
    }
    return <Images images={images} />
}


async function SearchImages({ query, userId }: { query: string, userId: string }) {
    const images = await ElasticImageDB.getInstance().getImageSearchResults(query, userId);
    if (images === null) {
        return <div>Failed to load images</div>
    }
    return <Images images={images} />
}
