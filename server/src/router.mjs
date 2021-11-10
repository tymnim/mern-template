
import { auth } from "./auth.mjs";
import { Router } from "express";

import routes from "./routes/index.mjs";

const router = Router();

// Will add each route to router.
// If a route needs an authentification, it will perform it first.
// This allows to build a nice routes api in which each route is in separate file receiving
// and returing data and ignoring request/response api.
function setup({ method, path, callback, authentificate = false }) {
  const func = authentificate ? auth(callback) : (req, res) => callback(req.headers, req.body);
  router[method](path, async (req, res) => {
    try {
      const { code, data, headers, cookies } = await func(req, res);
      if (headers) {
        for (let header in headers) {
          req.headers[header] = headers[header];
        }
      }
      if (cookies) {
        for (let name in cookies) {
          const { value, options } = cookies[name];
          res.cookie(name, value, options);
        }
      }
      res.status(code);
      res.send(data);
      res.end();
    }
    catch(e) {
      console.error(e);
      res.status(500);
      res.send({ error: "Internal server error" });
      res.end();
    }
  });
}

export default function () {
  routes.forEach(setup);
  return router;
}
