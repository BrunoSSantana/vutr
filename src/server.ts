import "dotenv/config";

import { fastifyRESTServerStart } from "@/infra/rest/fastify-server";
import { apolloGQLServerStart } from "@/infra/graphql/apollo-server";
import { bootFirebase } from "@/infra/repositories/firebase/firestore";

bootFirebase();
fastifyRESTServerStart().then();
apolloGQLServerStart().then();
