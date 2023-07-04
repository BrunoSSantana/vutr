import { SafeParseError } from "zod";

export const formatZodError = (responseError: SafeParseError<{}>) => {

  const errors = Object.entries(responseError.error.format()).map(([key, value]: [string, any]) => {
    if (!Array.isArray(value)) {

      const error = value?._errors;
      if (error) {
        return `${key}: ${error}`;
      }
    }
  }).filter((error) => error).join('::');

  return errors;
}
