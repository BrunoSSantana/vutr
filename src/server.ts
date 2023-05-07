import { app } from "@/app";

app.listen({ host: "0.0.0.0", port: 3000 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log("🚀 HTTP Server Running!");
});
