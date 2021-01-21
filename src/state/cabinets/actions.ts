import { createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://0.0.0.0:9292/v1/private/users/f94cb343-f1a3-43c2-865d-12e0c0b63d91/referrals/total'

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDYxNjUyNjEsInVzZXJfaWQiOiJmOTRjYjM0My1mMWEzLTQzYzItODY1ZC0xMmUwYzBiNjNkOTEiLCJzZXNzaW9uX2lkIjoiMjA2YzU3NWEtNzQ4My00ZjZjLThiNTYtNDBmMmExNGRmNDcyIn0.yOwIi574LaTW32Q92gu4GtW96U56m1appryw2pmYKZo'

const useReferalPerformance = async () => {
  // const response = await new Promise(resolve => resolve()).then(() => 'test redux toolkit on hooks')
  const response = await fetch(url, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()).then(data => data)

  return response as string
}

export const loadPerformance = createAsyncThunk(
  'cabinets/loadReferalPerformance',
  (): Promise<string> => {
    return useReferalPerformance()
  },
);
