import { ListToolsDTO } from "@/domains/tools/core";
import { toolListSchema } from "@/domains/tools/core/validation";

export type IListToolValidationBuild = <Type>() => {
  validate: (listToolDTO: Type) => ListToolsDTO;
};

export const buildListToolValidation: IListToolValidationBuild = <Type>() => {
  const validate = (listToolDTO: Type) => {
    const resultToolListParse = toolListSchema.safeParse(
      JSON.parse(JSON.stringify(listToolDTO))
    );

    if (!resultToolListParse.success) {
      const error = JSON.stringify(resultToolListParse.error.format());

      throw new Error(error);
    }

    return resultToolListParse.data;
  };

  return { validate };
};
