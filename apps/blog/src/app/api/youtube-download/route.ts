import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const videoId = searchParams.get("id");
    const videoSize = searchParams.get("size");

    if (!videoId || !videoSize) {
        return new NextResponse(!videoId ? "Missing id parameter" : "Missing size parameter", { status: 400 });
    }

    const videoIdSchema = z.string().length(11);
    const videoSizeSchema = z.enum(["hq720", "maxresdefault", "sddefault", "hqdefault", "mqdefault", "default"]);

    if (!videoIdSchema.safeParse(videoId).success) {
        return new NextResponse("Invalid id parameter", { status: 400 });
    }

    if (!videoSizeSchema.safeParse(videoSize).success) {
        return new NextResponse("Invalid size parameter", { status: 400 });
    }

    const response = await fetch(`https://img.youtube.com/vi/${videoId}/${videoSize}.jpg`);
    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
        headers: {
            // Modify hq720 to maxresdefault for backward compatibility
            "Content-Disposition": `attachment; filename="${videoSize === "hq720" ? "maxresdefault" : videoSize}.jpg"`,
            "Content-Type": "image/jpeg",
        },
    });
}
