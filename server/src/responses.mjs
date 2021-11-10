
export default {
  bad: {
    code: 404,
    data: { error: "bad request" }
  },
  unauthorized: {
    code: 401,
    data: { error: "unauthorized" }
  },
  forbidden: {
    code: 403,
    data: { error: "forbidden" }
  },
  notFound: {
    code: 404,
    data: { error: "not found" }
  },
  ok: {
    code: 200,
    data: { msg: "ok" }
  }
}
