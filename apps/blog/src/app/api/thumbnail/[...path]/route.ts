import { NextRequest, NextResponse } from "next/server";

const EMOJI_MAP: Record<string, string> = {
    cry: "😢",
    laugh: "😂",
    smile: "😊",
    heart: "❤️",
    fire: "🔥",
    thumbsup: "👍",
    thumbsdown: "👎",
    star: "⭐",
    rocket: "🚀",
    check: "✅",
    cross: "❌",
    warning: "⚠️",
    info: "ℹ️",
    question: "❓",
    exclamation: "❗",
    wrench: "🔧",
    debug: "🐛",
    developer: "👨‍💻",
    building: "🏗️",
};

const POSITION_MAP = {
    center: "center",
    top: "flex-start",
    bottom: "flex-end",
    left: "flex-start",
    right: "flex-end",
} as const;

interface ThumbnailConfig {
    emoji: string;
    textAlign: keyof typeof POSITION_MAP;
    title: string;
    body: string;
    fontSize: number;
    width: number;
    height: number;
    emojiSize: number;
    backgroundColor: string | [string, string];
}

function isHex(color: string): boolean {
    return /^([0-9a-fA-F]{6})$/.test(color);
}

function parseColor(color: string): string {
    const trimmed = color.trim();

    if (isHex(trimmed)) {
        return `#${trimmed}`;
    }

    return trimmed;
}

function parseThumbnailPath(path: string): ThumbnailConfig | null {
    const parts = path.split("-");

    if (parts.length < 2) {
        return null;
    }

    if (parts[0] !== "image") {
        return null;
    }

    const args = parts.slice(1);
    const config: ThumbnailConfig = {
        emoji: "",
        textAlign: "center",
        title: "",
        body: "",
        fontSize: 48,
        width: 1200,
        height: 630,
        emojiSize: 120,
        backgroundColor: ["#667eea", "#764ba2"],
    };

    for (const arg of args) {
        const [key, value] = arg.split(":");

        if (!key || !value) {
            continue;
        }

        switch (key) {
            case "emoji":
                config.emoji = EMOJI_MAP[value] ?? value;
                break;
            case "title":
                config.title = value;
                break;
            case "body":
                config.body = value;
                break;
            case "fontSize":
                config.fontSize = parseInt(value);
                break;
            case "backgroundColor":
                config.backgroundColor = value.includes(",")
                    ? (value
                          .split(",")
                          .map((x) => parseColor(x))
                          .slice(0, 2) as [string, string])
                    : parseColor(value);
                break;
        }
    }

    console.log(config);

    return {
        emoji: config.emoji,
        textAlign: config.textAlign as keyof typeof POSITION_MAP,
        title: config.title,
        body: config.body,
        fontSize: config.fontSize,
        width: config.width,
        height: config.height,
        emojiSize: config.emojiSize,
        backgroundColor: config.backgroundColor,
    };
}

function calculateVerticalSpacing(texts: string[], spacing: number | number[]) {
    if (texts.length === 1) {
        return [0];
    }

    const positions: number[] = [];

    for (let i = 0, max = texts.length; i < max; ++i) {
        positions.push((i - (max - 1) / 2) * (Array.isArray(spacing) ? spacing[i] : spacing));
    }

    return positions;
}

// Generate SVG content
function generateSVG(config: ThumbnailConfig) {
    const { emoji, title, body, fontSize, width, height, emojiSize, backgroundColor } = config;

    const hasTitle = title && title.length > 0;
    const hasBody = body && body.length > 0;
    const texts = [emoji, title, body].filter((x) => x.length > 0);
    const [emojiY, titleY, bodyY] = calculateVerticalSpacing(
        texts,
        [emojiSize, fontSize, fontSize * 0.75].slice(0, texts.length),
    );
    const hasGradient = Array.isArray(backgroundColor);

    const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${
        hasGradient
            ? `
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${backgroundColor[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${backgroundColor[1]};stop-opacity:1" />
    </linearGradient>
    `
            : `
    <rect width="${width}" height="${height}" fill="${backgroundColor}" />
    `
    }
  </defs>
  <rect width="${width}" height="${height}" fill="${hasGradient ? "url(#bg)" : backgroundColor}" />
  <g transform="translate(${width / 2}, ${height / 2})">
    <text 
      x="0" 
      y="${emojiY}" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      font-size="${emojiSize}" 
      font-family="Arial, sans-serif"
    >${emoji}</text>
    
    ${
        hasTitle
            ? `
    <text 
      x="0" 
      y="${titleY}" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      font-size="${fontSize}" 
      font-family="Arial, sans-serif" 
      font-weight="bold" 
      fill="white"
    >${title}</text>
    `
            : ""
    }
    
    ${
        hasBody
            ? `
    <text 
      x="0" 
      y="${bodyY}" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      font-size="${fontSize * 0.8}" 
      font-family="Arial, sans-serif" 
      fill="rgba(255,255,255,0.8)"
    >${body}</text>
    `
            : ""
    }
  </g>
</svg>`;

    return svg;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    try {
        const resolvedParams = await params;
        const pathSegments = resolvedParams.path || [];
        const pathString = pathSegments.join("-").replace(/\.svg$/, "");

        if (!pathString) {
            return new NextResponse("Missing path parameter", { status: 400 });
        }

        const config = parseThumbnailPath(pathString);

        if (!config) {
            return new NextResponse("Invalid path format.", {
                status: 400,
            });
        }

        const svgContent = generateSVG(config);

        return new NextResponse(svgContent, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Thumbnail generation error:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
