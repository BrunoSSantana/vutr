import "dotenv/config";

import { bootFirebase } from "@/infra/repositories/firebase/firestore";
import { app, bootServers } from "@/infra/rest/fastify-server";

bootFirebase();
await bootServers(app);