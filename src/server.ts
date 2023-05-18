import { apiRestStart } from "@/infra/api-rest/api-rest";
import { gqlServerStart } from "@/infra/graphql/apollo-server";

await apiRestStart();
await gqlServerStart();
