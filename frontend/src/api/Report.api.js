import axios from "./axios";
import { API_ROUTE } from "../utils/constants.js";

export const reportAPI = {
  /**
   * User creates a report against another user
   * (e.g. abuse in chat/message)
   */
  create: async (data) => {
    const response = await axios.post(
      API_ROUTE.REPORTS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Admin: get all reports
   * Supports filtering by status + pagination
   */
  getAll: async (params = {}) => {
    const response = await axios.get(
      API_ROUTE.REPORTS.GET_ALL,
      { params }
    );
    return response.data;
  },

  /**
   * Admin: update report
   * status: pending | reviewed | resolved | dismissed
   * reviewNotes: string
   */
  update: async (reportId, data) => {
    const response = await axios.patch(
      API_ROUTE.REPORTS.UPDATE(reportId),
      data
    );
    return response.data;
  },
};
