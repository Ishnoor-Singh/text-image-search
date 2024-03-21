import { ImageData } from '@/types/image'
import {ImageCard as Image} from '@/components/Image'
import Link from 'next/link'

export default function Images({images}: {images: ImageData[]}) {
    return (
        <div className='flex justify-evenly mt-6 flex-wrap'>
            {
                images?.map((image: ImageData, index: number) => (
                    <Link key={index} className="m-6" href={`/application/images?img=${image.id}`} >
                        <Image {...image} />
                    </Link>
                ))
            }
        </div>
    )
}