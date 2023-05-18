import { InMemoryToolRepository } from "../../repositories";

export const tools = (_parent, args, _contextValue, _info) => {
  const { limit, page, search } = args;

  return InMemoryToolRepository.list({ limit, page, search });
}