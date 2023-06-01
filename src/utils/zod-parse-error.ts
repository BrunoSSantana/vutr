import { SafeParseError } from "zod";

export const formatZodError = (responseError: SafeParseError<{}>) => {  
  return responseError.error.format()._errors.map((error) => error).join('::')
}
