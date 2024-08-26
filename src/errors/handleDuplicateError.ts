export const handleDuplicateError = (err: any) => {
  const extractedText = err?.errorResponse?.errmsg.match(/"([^"]+)"/)[1];
  const errorMessage = [
    {
      path: "",
      message: `${extractedText} has already existed.`,
    },
  ];
  return {
    statusCode: 400,
    message: "Duplicate Error",
    errorMessage,
  };
};
