import { Request, Response } from 'express';

export default {
  'GET /api/object': { a: 'test' },
  'GET /api/arrary': ['arrary'],
  'GET /api/requset': (req: Request, res: Response) => {
    const { type } = req.query;
    res.send({
      status: 'ok',
      type,
      currentAuthority: 'admin',
    });
  },
};
