import { baseApi } from "../../baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStats: builder.query({
      query: ({role,userId}) => {
        return {
          url: role ==="admin" ?`stats/admin-stats`: role ==="agent" ? `/stats/agent-stats/${userId}` : `/stats/user-stats/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["Stats"],
    }),
  }),
});
export const { useGetAllStatsQuery } = statsApi;
