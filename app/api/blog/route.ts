export async function GET() {
  return Response.json({
    message: "Hello World",
  });
}

export async function POST() {
  return Response.json({
    message: "POST method",
  });
}

export async function PUT() {
  return Response.json({
    message: "PUT method",
  });
}
