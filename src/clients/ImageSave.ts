import { IMAGES_DIR } from '../constants';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
 accessKeyId: process.env.APP_AWSACCESS_KEY_ID,
 secretAccessKey: process.env.APP_AWSSECRET_ACCESS_KEY,
 region: process.env.APP_AWSREGION,
});

const s3 = new AWS.S3();




export async function saveMedia(mediaItem: any, imagesBaseDir = IMAGES_DIR) {
    console.log('Saving media item', mediaItem)
    const { mediaUrl, filename } = mediaItem;
    const headers = getTwilioHeaders()
    const fullPath = path.resolve(`${imagesBaseDir}/${filename}`);

    // if (!fs.existsSync(fullPath)) {
        console.log('Downloading media item to', mediaUrl)
        const response = await fetch(mediaUrl, { headers });
        // console.log(JSON.stringify(response))

        // const fileStream = fs.createWriteStream(fullPath);

        // response.body?.pipe(fileStream);
        const uploadParams = {
            Bucket: process.env.APP_AWSIMAGE_BUCKET,
            Key: filename,
            Body: response.body,
        };
        try {
            const uploadResult = await s3.upload(uploadParams).promise();
            console.log(`File uploaded successfully to ${uploadResult.Location}`);
            return uploadResult.Location;
        } catch (error) {
            console.error('Error uploading file to S3', error);
            return null;
        }
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