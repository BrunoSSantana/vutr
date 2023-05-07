export type Tool = {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];

  createdAt: Date;
  updatedAt: Date;
};

export const createTool = (tool: CreateToolDTO & { id: number }): Tool => {
  return {
    ...tool,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const updateTool = (tool: Tool, updateToolDTO: UpdateToolDTO): Tool => {
  return {
    ...tool,
    ...updateToolDTO,
    updatedAt: new Date(),
  };
};

export type CreateToolDTO = {
  title: string;
  link: string;
  description: string;
  tags: string[];
};

export type UpdateToolDTO = {
  title?: string;
  link?: string;
  description?: string;
  tags?: string[];
};

export type DeleteToolDTO = {
  id: number;
};

export type ListToolDTO = {
  page: number;
  limit: number;
  search: string;
  tags: string[];
};

export type ToolListResponse = {
  tools: Tool[];
  total: number;
  page: number;
  limit: number;
};
