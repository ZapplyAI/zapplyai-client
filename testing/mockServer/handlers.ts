import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/resource', () => {
    return HttpResponse.json({ id: 'abc-123' })
  }),
];
