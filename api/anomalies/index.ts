import { type VercelRequest, type VercelResponse } from '@vercel/node';
import { getAnomalies } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, severity, status, page = '1', limit = '10' } = req.query;
    
    const filters = {
      type: type as string,
      severity: severity as string,
      status: status as string
    };

    const pagination = {
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10)
    };

    const anomalies = await getAnomalies(filters, pagination);
    res.status(200).json(anomalies);
  } catch (error) {
    console.error('Error fetching anomalies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}