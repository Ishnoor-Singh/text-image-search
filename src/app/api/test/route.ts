import { saveImage } from '@/app/utils/db'
import { saveImageElastic, search } from '@/app/utils/elastic'
import { ElasticImageDB } from '@/services/ElasticImageDB'
// import { Client } from '@elastic/elasticsearch'
// import fs from 'fs'

export async function GET() {
  console.log('GET')
  // search('sunrise')
  // // saveImageElastic({ tags: 'test', description: 'test', text: 'test', imageURL: 'test' })

  const json = {
    "tags": "social media, Instagram, advertisement, sponsored post, mental health, AI chatbot, mobile app interface",
    "description": "A screenshot of an Instagram post featuring an advertisement for a mental health AI Coach named Clare. The top portion displays a status bar with battery and signal icons, and the post is liked by several Instagram users. The image's main focus is the advertisment of the AI coach with a graphical representation of a smartphone interface showing a messaging conversation with the AI. Beneath the graphical representation is a caption encouraging users to text a phone number with 'sign-up' to begin using the AI coach service with a 7-day free trial. The bottom of the image shows interface elements of Instagram, including navigation buttons.",
    "text": "Liked by _utkarsh07_ and 12,902 others, thevishnukaushal Soch rha hu notice period ke last day sick leave apply kr du 😉... more, View all 66 comments, Sponsored, Clare - your mental health AI Coach, I need someone to talk right now..., I'm here for you. What is on your mind?, Can you call me now?, Contact us, 4 likes, clare_and_me Simply text +15626623854 'sign-up' to get started to speak to Clare your AI mental health coach. 7-day free trial.",
    userId: '2OcsnxpFdtIVRsLseLhUcPl2pAp4Zn5G',
    imageURL: 'MEf9a78555c55025d49f561be19af655da.jpeg'
  }
  console.log(ElasticImageDB.getInstance())
  await ElasticImageDB.getInstance().saveImage(json)
  return Response.json({ message: 'Hello, World!' })
// 

}
