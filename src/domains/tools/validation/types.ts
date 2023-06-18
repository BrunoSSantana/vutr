import { CreateToolDTO, DeleteToolDTO, ListToolsDTO } from "@/domains/tools/entities";

export type ICreateToolValidation = <Type>() => {
  validate: (createToolDTO: Type) => CreateToolDTO;
};

export type IDeleteToolValidation = <Type>() => {
  validate: (deleteToolDTO: Type) => DeleteToolDTO;
};

export type IListToolValidationBuild = <Type>() => {
  validate: (listToolDTO: Type) => ListToolsDTO;
};