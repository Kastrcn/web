import { Request, Response } from 'express';
import { parse } from 'url';
import { User, UserParams } from './data.d';

let userDataSource: User[] = [];

for (let i = 0; i < 90; i += 1) {
  userDataSource.push({
    id: i,
    username: `TradeCode ${i}`,
    email: `email@e${i}.com`,
  });
}

function getUser(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as UserParams;

  const dataSource = userDataSource;
  let pageSize = 10;
  if (params) {
    pageSize = parseInt(`${params.size}`, 0);
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(`${params.page}`, 10) || 1,
    },
  };
  return res.json(result);
}

function postUser(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      userDataSource = userDataSource.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      userDataSource.unshift({
        id: i,
        username: `TradeCode ${i}`,
        email: `email@e${i}.com`,
      });
      break;
    case 'update':
      userDataSource = userDataSource.map(item => {
        if ((item.id = id)) {
          return { ...item, desc, name };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: userDataSource,
    pagination: {
      total: userDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/sys/user': getUser,
  'POST /api/sys/user': postUser,
};
