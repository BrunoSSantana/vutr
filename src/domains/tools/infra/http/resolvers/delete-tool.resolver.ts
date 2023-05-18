import { InMemoryToolRepository } from "../../repositories";

export const deleteTool = (_parent, args, _contextValue, _info) => {
  const { id } = args;

  InMemoryToolRepository.delete(id);

  return true;
};
