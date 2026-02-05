import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const statesPath = path.join(
      process.cwd(),
      "content",
      "travel",
      "states.json"
    );

    if (!fs.existsSync(statesPath)) {
      return NextResponse.json({ states: [] });
    }

    const fileContent = fs.readFileSync(statesPath, "utf-8");
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading travel states:", error);
    return NextResponse.json({ states: [] });
  }
}
