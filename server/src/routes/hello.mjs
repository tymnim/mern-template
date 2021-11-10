import responses from "../responses.mjs";
import { sign, match } from "../auth.mjs";

// basic login logic
async function sayHi(headers, body, user) {
  return {
    ...responses.ok,
    data: { msg: `hi, ${user.email}` }
  }
}

export default {
  path: "/hello",
  method: "get",
  authentificate: true,
  callback: sayHi
}
