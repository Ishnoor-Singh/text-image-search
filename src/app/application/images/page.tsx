import { Suspense } from 'react'
import Image from '@/components/Image'
import { ElasticImageDB } from '@/clients/ElasticImageDB';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


export default withPageAuthRequired(ImageDetailPage, {returnTo: '/application'});

function ImageDetailPage({
    searchParams,
  }: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) 

  {
    const selectedSearch = searchParams?.img ?? "";
    const imgPath = Array.isArray(selectedSearch)
    ? selectedSearch[0]
    : selectedSearch;
  
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-3">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                {imgPath?<Suspense fallback={<div>Loading...</div>
                }>
                    <LoadAndRenderImage path={imgPath} />
                </Suspense>:<h1>error</h1>
                }
            </div>
        </main>
    )
}


async function LoadAndRenderImage({path}: {path:string}) {
    const img = await ElasticImageDB.getInstance().getImageById(path).then(res => {
        return (res._source as ImageData)
    }).catch(err => {
        console.error(err)
    });

    return <Image {...img}/>
}