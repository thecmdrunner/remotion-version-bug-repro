import { NextRequest, NextResponse } from "next/server";
import { VERSION as REMOTION_VERSION } from "remotion";

export async function GET(req: NextRequest) {
  //   const version = REMOTION_VERSION;
  const version = `v0.1`;

  const renderId = `successful-render-${version}`;

  console.log(`Rendering ID generated: ${renderId}`);

  return NextResponse.json({ renderId }, { status: 200 });
}
