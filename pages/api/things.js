export default async function handler(req, res) {
  const query = req.query.q;

  res.status(200).json({
    things: [
      {
        name: "Teapot",
      },
      {
        name: `A ${query ? `${query} ` : ""}goose`,
      },
    ],
  });
}
