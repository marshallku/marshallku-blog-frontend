import { classNames } from "@marshallku/utils";
import Typography from "@marshallku/ui/Typography";
import { Icon } from "@marshallku/icon";
import Image from "#components/Image";
import styles from "./index.module.scss";

export interface ProfileProps {
    className?: string;
    size?: "small" | "large";
    showContact?: boolean;
}

const cx = classNames(styles, "profile");

function Profile({ className, size = "large", showContact = true }: ProfileProps) {
    const imageSize = size === "large" ? 130 : 65;
    return (
        <div className={cx("", `--size-${size}`, { "--show-contact": showContact, className })}>
            <figure className={cx("__profile")}>
                <a target="_blank" href="https://resume.marshallku.com" rel="noopener noreferrer nofollow">
                    <Image
                        src="/assets/profile.jpeg"
                        alt="Marshall Ku"
                        forceSize={imageSize}
                        width={imageSize}
                        height={imageSize}
                    />
                </a>
            </figure>
            <div className={cx("__content")}>
                <div>
                    <Typography
                        variant={size === "large" ? "h1" : "b1"}
                        component="a"
                        href="https://resume.marshallku.com"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={cx("__title")}
                        fontWeight={700}
                    >
                        Marshall Ku / 구영표
                    </Typography>
                </div>
                {showContact && (
                    <ul className={cx("__contact")}>
                        <li>
                            <a href="https://github.com/marshallku" target="_blank" rel="noopener noreferrer nofollow">
                                <Icon name="github" />
                                <Typography className="sr-only">GitHub</Typography>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/marshallku/"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                            >
                                <Icon name="linkedin" />
                                <Typography className="sr-only">LinkedIn</Typography>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:marshall@kakao.com">
                                <Icon name="mail" />
                                <Typography className="sr-only">marshall@kakao.com</Typography>
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

Profile.displayName = "Profile";

export default Profile;
