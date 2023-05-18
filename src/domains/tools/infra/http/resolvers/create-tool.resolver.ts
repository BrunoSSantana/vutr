import { InMemoryToolRepository } from "../../repositories";

export const tool = (_parent, args, _contextValue, _info) => {
  const { title, link, description, tags } = args;

  return InMemoryToolRepository.create({
    title,
    link,
    description,
    tags,
  });
};
