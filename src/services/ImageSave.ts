import { IMAGES_DIR } from '../constants';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

export async function saveMedia(mediaItem: any, imagesBaseDir = IMAGES_DIR) {
    console.log('Saving media item', mediaItem)
    const { mediaUrl, filename } = mediaItem;
    const headers = getTwilioHeaders()
    const fullPath = path.resolve(`${imagesBaseDir}/${filename}`);

    if (!fs.existsSync(fullPath)) {
        console.log('Downloading media item to', mediaUrl)
        const response = await fetch(mediaUrl, { headers });
        console.log(JSON.stringify(response))

        const fileStream = fs.createWriteStream(fullPath);

        response.body?.pipe(fileStream);
    }
    return filename;
}

function getTwilioHeaders(twilioAccountSid: string = process.env.TWILIO_ACCOUNT_SID || "", twilioAuthToken: string = process.env.TWILIO_AUTH_TOKEN || "") {
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(twilioAccountSid + ":" + twilioAuthToken).toString('base64'));
    return headers;
}

// function handleImageProcessing(fileName: string) {
//     const imageURL = getImageURLFromName(fileName);
//     processImageFromURL(imageURL).then((res) => {
//         console.log('Image processing response', res)
//         if (res) {
//             const imageJSON = JSON.parse(res);
//             saveImage({ ...imageJSON, imageURL: fileName });
//         }
//     });
// }