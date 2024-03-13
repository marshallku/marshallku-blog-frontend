import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import Typography from "#components/Typography";
import styles from "./page.module.scss";
import Button from "#components/Button";

export const dynamic = "error";

const cx = classNames(styles, "about");

export function generateMetadata() {
    return {
        title: "About Me",
    };
}

export default function AboutPage() {
    return (
        <div className={cx()}>
            <section className={cx("__container")}>
                <figure className={cx("__profile")}>
                    <img src="https://github.com/marshallku.png" alt="Marshall Ku" width="150" height="150" />
                </figure>
                <Typography variant="h1" component="h1" className={cx("__title")} fontWeight={700}>
                    Marshall Ku / 구영표
                </Typography>
                <ul className={cx("__contact")}>
                    <li>
                        <a href="https://github.com/marshallku" target="_blank" rel="noopener noreferrer nofollow">
                            <Icon name="github" />
                            <Typography>GitHub</Typography>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/marshallku/"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                        >
                            <Icon name="linkedin" />
                            <Typography>LinkedIn</Typography>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:marshall@kakao.com">
                            <Icon name="mail" />
                            <Typography>marshall@kakao.com</Typography>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://marshallku.notion.site/a8461811a3044446a2048fc054001b9d?pvs=4"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                        >
                            <Icon name="notion" />
                            <Typography>Resume</Typography>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
}
