import logger from "./logger.js";

export default async function (port?: number) {
  const { createServer } = await import("http");
  createServer((req, res) => {
    res.writeHead(200);
    res.end("ok");
  }).listen(port ?? 80, () => logger.info("http server listening"));
}
