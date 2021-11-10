
import responses from "../responses.mjs";
import { sign, match } from "../auth.mjs";

// basic login logic
async function login(headers, { email, password }) {
  if (! email && password) {
    return responses.bad;
  }

  const correct = await match(email, password);
  if (! correct) {
    return responses.forbidden;
  }

  const token = sign(email);

  return {
    ...responses.ok,
    // NOTE: enable secure: true when use https
    cookies: { jwt: { value: token, options: { /*secure: true, httpOnly: true*/  } } }
  }
}

export default {
  path: "/login",
  method: "post",
  authentificate: false,
  callback: login
}
