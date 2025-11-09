import { classNames } from "@marshallku/utils";
import { type ReactNode } from "react";

import styles from "./index.module.scss";

export interface CommentContentProps {
    content: string;
}

const cx = classNames(styles, "comment-content");

const parseComponents = (content: string) => {
    const components: ReactNode[] = [];
    const lines = content.split("\n");

    for (let i = 0, max = lines.length; i < max; ++i) {
        const line = lines[i];

        if (!line) {
            continue;
        }

        if (line.startsWith("```")) {
            const code = [];

            for (++i; i < max; ++i) {
                const line = lines[i];

                if (line.startsWith("```")) {
                    components.push(
                        <pre key={i} className={cx("__code")}>
                            {code.join("\n")}
                        </pre>,
                    );
                    break;
                }

                code.push(line);
            }
        } else if (line.startsWith("![")) {
            const alt = line.substring(2, line.indexOf("]"));
            const src = line.substring(line.indexOf("(") + 1, line.indexOf(")"));

            components.push(<img key={i} className={cx("__image")} alt={alt} src={src} />);
        } else {
            const parts = line.split(/(https?:\/\/[^\s]+|[\w.-]+@[\w.-]+\.\w+)/);
            const children: ReactNode[] = [];

            for (let j = 0, max = parts.length; j < max; ++j) {
                const part = parts[j];

                if (!part) {
                    continue;
                }

                if (part.match(/^https?:\/\//)) {
                    if (part.match(/\.(jpeg|jpg|gif|png)$/)) {
                        children.push(
                            <img key={`${i}-${j}`} className={cx("__image")} src={part} alt="User uploaded image" />,
                        );
                    } else if (part.match(/\.(mp4|webm)$/)) {
                        children.push(
                            <video
                                key={`${i}-${j}`}
                                autoPlay
                                playsInline
                                loop
                                muted
                                className={cx("__video")}
                                src={part}
                            />,
                        );
                    } else {
                        children.push(
                            <a key={`${i}-${j}`} href={part} target="_blank" rel="noopener noreferrer nofollow">
                                {part}
                            </a>,
                        );
                    }
                } else if (part.match(/[\w.-]+@[\w.-]+\.\w+/)) {
                    children.push(
                        <a key={`${i}-${j}`} href={`mailto:${part}`}>
                            {part}
                        </a>,
                    );
                } else {
                    children.push(<span key={`${i}-${j}`}>{part}</span>);
                }
            }

            components.push(<p key={i}>{children}</p>);
        }
    }

    return components;
};

function CommentContent({ content }: CommentContentProps) {
    return <div className={cx()}>{parseComponents(content)}</div>;
}

export default CommentContent;
