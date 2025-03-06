"use client";

import { Icon } from "@marshallku/icon";
import { useCallback, useState } from "react";

const VIDEO_SIZE_NAMES = ["hq720", "sddefault", "hqdefault", "mqdefault", "default"];
const VIDEO_SIZES = [
    [1280, 720],
    [640, 480],
    [480, 360],
    [320, 180],
    [120, 90],
];

const extractVideoId = (videoUrl: string) => {
    const videoPattern = /youtu\.?be(\.com)?\/(live\/)?(shorts\/|watch\?v=|embed\/)?([^&?\s]+)/;
    return videoUrl.match(videoPattern)?.[4];
};

function YoutubeThumbnailExtractor() {
    const [videoId, setVideoId] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnails, setThumbnails] = useState<string[]>([]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const id = extractVideoId(videoUrl);

            if (!id) {
                return;
            }

            const thumbnails = VIDEO_SIZE_NAMES.map((size) => `https://i.ytimg.com/vi/${id}/${size}.jpg`);

            setVideoId(id);
            setThumbnails(thumbnails);
        },
        [videoUrl],
    );

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form__input"
                    name="uri"
                    placeholder="URI of Youtube video"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                <button type="submit" className="form__submit">
                    Export
                </button>
            </form>
            <div className="result" style={{ display: videoId ? "block" : "none" }}>
                <div className="result__title">Thumbnails</div>
                <div className="result__thumbnail">
                    {thumbnails.map((thumbnail, index) => (
                        <figure key={thumbnail}>
                            <img src={thumbnail} alt={thumbnail} />
                            <figcaption>
                                {VIDEO_SIZES[index][0]} * {VIDEO_SIZES[index][1]}
                                {" - "}
                                <a href={`/api/youtube-download?id=${videoId}&size=${VIDEO_SIZE_NAMES[index]}`}>
                                    다운로드 <Icon name="arrow-downward" />
                                </a>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </>
    );
}

export default YoutubeThumbnailExtractor;
