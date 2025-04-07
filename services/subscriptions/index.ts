import _axios from '@/lib/axios'

export default {
  async getList() {
    try {
      const {data: response, status} = await _axios.get('/api/subscriptions/plans')

      return {
        success: status >= 200,
        response: response.plans,
      }
    } catch (error) {
      console.log(error);
    }
  },
}
