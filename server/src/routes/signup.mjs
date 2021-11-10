
import responses from "../responses.mjs";
import { sign, hash } from "../auth.mjs";
import { Users } from "../collections/index.mjs";

// simple sign up and user creation
async function signup(headers, { email, password }) {
  if (! email && password) {
    return responses.bad;
  }

  const user = await Users.findOne({ email });
  if (user) {
    return responses.forbidden;
  }

  const passwordHash = await hash(password);

  await Users.insert({
    email,
    password: passwordHash
  });

  const token = sign(email);

  return {
    ...responses.ok,
    // NOTE: enable secure: true when use https
    cookies: { jwt: { value: token, options: { /*secure: true,*/ httpOnly: true } } }
  }
}

export default {
  path: "/signup",
  method: "post",
  authentificate: false,
  callback: signup
}
