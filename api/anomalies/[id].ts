import { type VercelRequest, type VercelResponse } from '@vercel/node';
import { getAnomalyById, updateAnomalyStatus } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid anomaly ID' });
  }

  try {
    if (req.method === 'GET') {
      const anomaly = await getAnomalyById(id);
      if (!anomaly) {
        return res.status(404).json({ message: 'Anomaly not found' });
      }
      res.status(200).json(anomaly);
    } else if (req.method === 'PATCH') {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      }
      
      const updatedAnomaly = await updateAnomalyStatus(id, status);
      if (!updatedAnomaly) {
        return res.status(404).json({ message: 'Anomaly not found' });
      }
      res.status(200).json(updatedAnomaly);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling anomaly request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}