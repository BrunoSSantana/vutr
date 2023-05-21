import "dotenv/config";

import { restStart } from "@/infra/api-rest/api-rest";
import { gqlServerStart } from "@/infra/graphql/apollo-server";
import { bootFirebase } from "@/infra/repositories/firebase/firestore";

bootFirebase();
await restStart();
await gqlServerStart();
