export default function run(context, request) {
  context.res = {
    body: JSON.stringify({ status: "OK" }),
    status: 200
  };

  context.done(null);
}
