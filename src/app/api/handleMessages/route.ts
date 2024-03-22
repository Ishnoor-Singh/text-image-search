import Twilio from 'twilio';
import extName from 'ext-name';
import urlUtil from 'url';
import path from 'path';
import { saveMedia } from '@/clients/ImageSave';
import { processImageFromURL } from '@/clients/ImageAnnotation';
import { getImageURLFromName } from '@/lib/utils';
import { getUserId } from '@/lib/phoneNumber';
import { ElasticImageDB } from '@/clients/ElasticImageDB';
const { MessagingResponse } = Twilio.twiml;



const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;


export async function POST(request: Request) {
    let params = new URLSearchParams(await request.text());
    const messageBody = paramsToObject(params.entries());
    console.log(messageBody);
    const responseMessage = await handleMessages(messageBody);
    console.log(responseMessage.toString())
    return new Response(responseMessage.toString(), {
        status: 200,
    });
}

async function handleMessages(messageBody: any) {
    const { NumMedia, From: SenderNumber, MessageSid } = messageBody;
    console.log(SenderNumber)

    const responseMessage = new MessagingResponse();
    

    if (NumMedia === 0) {
        const responseString = "Send us an image!"
        return responseMessage.message({
            from: twilioPhoneNumber,
            to: SenderNumber,
        }, responseString);
    }

    const fileNames = await saveMediaItem(NumMedia, messageBody, MessageSid);

    const imagesData = await Promise.all(await createImageData(fileNames, SenderNumber));
    
    await Promise.all(imagesData.map(imageData => ElasticImageDB.getInstance().saveImage(imageData)));


    const responseString = `Thanks for sending us ${NumMedia} file(s)`;

    return responseMessage.message({
        from: twilioPhoneNumber,
        to: SenderNumber,
    }, responseString);
}


async function createImageData (fileNames: string[], SenderNumber:string) {
    const userId = await getUserId(SenderNumber);
    
    return fileNames.map(fileName => {
        return processImageFromURL(getImageURLFromName(fileName)).then((res) => {
            if (res) {
                return {...JSON.parse(res), imageURL: fileName, userId };
            }
            
        })
    });
}

function saveMediaItem(NumMedia, messageBody, MessageSid) {
    let saveOperations: Promise<any>[] = [];
    const mediaItems = [];

    for (var i = 0; i < NumMedia; i++) {  // eslint-disable-line
        const mediaUrl = messageBody[`MediaUrl${i}`];
        const contentType = messageBody[`MediaContentType${i}`];
        const extension = extName.mime(contentType)[0].ext;
        const mediaSid = path.basename(urlUtil.parse(mediaUrl).pathname);
        const filename = `${mediaSid}.${extension}`;

        mediaItems.push({ mediaSid, MessageSid, mediaUrl, filename });
        saveOperations = mediaItems.map(mediaItem => saveMedia(mediaItem));
    }

    return Promise.all(saveOperations);

}


function paramsToObject(entries) {
    const result = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
    }
    return result;
}