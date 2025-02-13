"use client";

import { useCallback, useState } from "react";

const VIDEO_SIZES = ["hq720", "sddefault", "hqdefault", "mqdefault", "default"];

function YoutubeThumbnailExtractor() {
    const [videoId, setVideoId] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnails, setThumbnails] = useState<string[]>([]);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const youtubeRegex = /youtu\.?be(\.com)?\/(live\/)?(shorts\/|watch\?v=|embed\/)?([^&?\s]+)/;
            const id = videoUrl.match(youtubeRegex)?.[4];
            if (!id) return;
            setVideoId(id);
            const thumbnails = VIDEO_SIZES.map((size) => `https://i.ytimg.com/vi/${id}/${size}.jpg`);
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
                    {thumbnails.map((thumbnail) => (
                        <img key={thumbnail} src={thumbnail} alt={thumbnail} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default YoutubeThumbnailExtractor;
