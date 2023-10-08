import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
const contentful = require('contentful');

const client = contentful.createClient({
  space: 'vam02wto75r0',
  environment: 'gcontent1',
  accessToken: 'QKf7w7kwqsHjDLkiRSSifnZtco61xWGyAeW_av06b6M'
})

export interface GAME {
    title: string
    media: Medum[]
    description: string
    gameOffers: GameOffer[]
}
  
export interface Medum {
    sys: Sys
}
  
export interface Sys {
    type: string
    linkType: string
    id: string
}
  
export interface GameOffer {
    platform: string
    price: number
    compare_price: number
    discount: number
    url: string
}


export async function getGames() {

    const gamesData = await client.getEntries();

    const filterImage = (id) => gamesData.includes.Asset.filter(asset => asset.sys.id === id);

    const gamesLocal = gamesData.items.map(item => {
        let currentImage = item?.fields?.media[0]?.sys.id;

        return {
            "title": item?.fields?.title,
            "description": item?.fields?.description,
            "cover_url": filterImage(currentImage)[0]?.fields?.file?.url,
            "game_offers": item?.fields?.gameOffers
        }
    })

  return gamesLocal;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const jsonData = await getGames();
    res.status(200).json(jsonData);
  } catch (error) {
    console.error(error);
    return { error: "Error en servidor" }
  }
}
