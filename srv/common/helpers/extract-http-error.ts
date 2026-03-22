export const extractHttpError = (error: any): string => {
  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.response?.data) {
    return error.response.data;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
};
