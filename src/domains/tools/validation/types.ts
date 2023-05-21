import { CreateToolDTO, DeleteToolDTO, ListToolsDTO } from "../tool.entity";

export type ICreateToolValidation = <Type>() => {
  validate: (createToolDTO: Type) => CreateToolDTO;
};

export type IDeleteToolValidation = <Type>() => {
  validate: (deleteToolDTO: Type) => DeleteToolDTO;
};

export type IListToolValidationBuild = <Type>() => {
  validate: (listToolDTO: Type) => ListToolsDTO;
};