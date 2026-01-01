import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { pin } = req.body;

  // Compara con la variable de entorno que configuraste en Vercel
  if (pin === process.env.APP_PIN) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, message: 'PIN incorrecto' });
}