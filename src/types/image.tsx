export type ImageData = {
    _id?: string;
    tags: string;
    description: string;
    text?: string;
    imageURL: string;
}

export type ImageProps = ImageData

export type ImageDataDB = ImageData & {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

