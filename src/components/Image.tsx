import {
    Card,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { ReactElement } from 'react'
import { ImageProps } from '@/types/image'
import { getImageURLFromName } from "@/lib/utils";

export default function ImageView(imageProps: ImageProps): ReactElement {
    return (
        <Card className='mx-6' key={imageProps.key}>
            <CardContent>
                <img className="mt-3 max-h-100p max-w-100p rounded-6" src={getImageURLFromName(imageProps.imageURL)} alt={imageProps.description} />
                <div className='flex flex-wrap my-3'>
                    {imageProps.tags?.split(',').map((tag) => (
                        <Badge className="m-1" key={tag}>{tag}</Badge>
                    ))}
                </div>
                <CardDescription>{imageProps.description}</CardDescription>
                <div>{imageProps.text}</div>
            </CardContent>
        </Card>
    )
}
{/* <Card className="overflow-hidden absolute">
                <img src={`/mms_images/${(imageProps.imageURL)}`} />
                </Card> */}
export function ImageCard(imageProps: ImageProps): ReactElement {
    return (
        <Card className='overflow-hidden' key={imageProps.key} >
            <div className="relative w-full h-full m-0 p-0 flex items-center flex-col">
                <img className='relative' src={`/mms_images/${(imageProps.imageURL)}`} 
                alt={imageProps.description} 
            />
                <div className='flex flex-wrap my-3'>
                    {imageProps.tags?.split(',').map((tag) => (
                        <Badge className="m-1" key={tag}>{tag}</Badge>
                    ))}
                </div>
            </div>
        </Card>
    )
}