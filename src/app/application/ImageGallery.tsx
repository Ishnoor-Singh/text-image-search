import Images from "@/components/Images";
import { getSession } from "@auth0/nextjs-auth0";
import { ElasticImageDB } from "@/clients/ElasticImageDB";

export default async function ImageGallery({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const query = searchParams?.search ?? "";
    const userId = await getSession().then(session => session?.user?.email)
    return query ? <SearchImages userId={userId} query={query} /> : <AllImages userId={userId} />
}



async function AllImages({ userId }: { userId: string }) {
    const images = await ElasticImageDB.getInstance().getAllImages(userId)
    if (images === null) {
        return <div>Failed to load images</div>
    }
    if (images.length === 0) {
        return <div>
            <h2>No images found</h2>
            <strong>Please add your <a href="/application/profile">phone number in your profile</a></strong>
            <br/>
            You can upload images by sending a <a href="sms:+19292961936">text to 9292961936</a>
        </div>
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
