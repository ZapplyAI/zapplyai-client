import { axios } from '@/lib'
import { Response, UpdateMemberRequest, UpdateOrganizationRequest } from '../types'

const BASE_URL = 'https://copilot-api-go-test-739610349551.europe-west2.run.app/api'

const organizations = {
  /**
   * Get organization details by ID
   * @param id - Organization ID
   * @returns Promise with organization data
   */
  getOrganization: async (id: string): Promise<Response> => {
    try {
      const response = await axios.get(`${BASE_URL}/organizations/${id}`)
      return {
        success: true,
        response: response.data
      }
    } catch (error) {
      console.error('Error fetching organization:', error)
      return {
        success: false,
        response: error instanceof Error ? error.message : 'Failed to fetch organization'
      }
    }
  },

  /**
   * Update organization details
   * @param id - Organization ID
   * @param orgData - Organization update data (name and seats)
   * @returns Promise with update response
   */
  updateOrganization: async (id: string, orgData: UpdateOrganizationRequest): Promise<Response> => {
    try {
      const response = await axios.put(`${BASE_URL}/organizations/${id}`, orgData)
      return {
        success: true,
        response: response.data
      }
    } catch (error) {
      console.error('Error updating organization:', error)
      return {
        success: false,
        response: error instanceof Error ? error.message : 'Failed to update organization'
      }
    }
  },

  /**
   * Get list of organization members
   * @param orgId - Organization ID
   * @returns Promise with members list
   */
  getMembers: async (orgId: string): Promise<Response> => {
    try {
      const response = await axios.get(`${BASE_URL}/organizations/members?org_id=${orgId}`)
      return {
        success: true,
        response: response.data
      }
    } catch (error) {
      console.error('Error fetching organization members:', error)
      return {
        success: false,
        response: error instanceof Error ? error.message : 'Failed to fetch organization members'
      }
    }
  },

  /**
   * Update organization member role or remove member
   * @param orgId - Organization ID
   * @param userId - User ID
   * @param memberData - Member update data (role and optional remove flag)
   * @returns Promise with update response
   */
  updateMember: async (orgId: string, userId: string, memberData: UpdateMemberRequest): Promise<Response> => {
    try {
      const response = await axios.put(`${BASE_URL}/organizations/members/${orgId}/${userId}`, memberData)
      return {
        success: true,
        response: response.data
      }
    } catch (error) {
      console.error('Error updating organization member:', error)
      return {
        success: false,
        response: error instanceof Error ? error.message : 'Failed to update organization member'
      }
    }
  }
}

export default organizations
