import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Users } from "./collections/index.mjs";
import responses from "./responses.mjs";

const SECRET = process.env.JWT_SECRET || "qwerty";

// Decrypts token and finds user.
function identify(token) {
  if (token) {
    return new Promise((resolve, reject) =>
      jwt.verify(token, SECRET, async (err, info) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(await Users.findOne({ email: info.email }));
        }
      })
    );
  }
  return Promise.resolve(null);
}

function sign(email) {
  return jwt.sign({ email }, SECRET, { expiresIn: "7d" });
}

function hash(password) {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => err ? reject(err) : resolve(hash))
  );
}

function match(email, password) {
  return new Promise(async (resolve, reject) => {

    const { password: hash } = await Users.findOne({ email }, { fields: { password: 1 } }) || {};
    if (hash) {
      return bcrypt.compare(password, hash, (err, res) => err ? reject(err) : resolve(res));
    }
    resolve(false);
  });
}

// sort of middleware used by router when route has { authentificate: true }
// will perform jwt verification and provide route callback with validated user
function auth(callback) {
  return async (req, res) => {
    try {
      const user = await identify(req.cookies.jwt);
      if (user) {
        return await callback(req.headers, req.body, user);
      }
      return responses.unauthorized
    }
    catch(e) {
      return responses.unauthorized;
    }
  }
}

export {
  identify,
  sign,
  hash,
  match,
  auth
}
