import { Icon } from "@marshallku/icon";
import { classNames } from "@marshallku/utils";
import Typography from "#components/Typography";
import styles from "./page.module.scss";

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
            </section>
            <section className={cx("__container", "__container--about")}>
                <Typography component="p" marginBottom>
                    Hello! I'm Marshall Ku, a passionate developer who loves learning and taking on new challenges. I've
                    worked on various projects and have experience with a wide range of technologies.
                </Typography>
                <Typography component="p" marginBottom>
                    I enjoy solving complex problems with code and continuously strive to improve my skills. Through
                    side projects and professional experience, I've gained a solid foundation in multiple domains, from
                    frontend to backend technologies.
                </Typography>
                <Typography component="p" marginBottom={8} variant="h5" fontWeight={700}>
                    What I Do
                </Typography>
                <Typography component="ul" marginBottom>
                    <li>
                        <Typography component="strong" fontWeight={700}>
                            Frontend Development:
                        </Typography>{" "}
                        I specialize in building interactive user interfaces using technologies like React and
                        TypeScript.
                    </li>
                    <li>
                        <Typography component="strong" fontWeight={700}>
                            Backend Development:
                        </Typography>{" "}
                        I've worked with NestJS, MongoDB, and more to create robust server-side applications.
                    </li>
                    <li>
                        <Typography component="strong" fontWeight={700}>
                            Automation Enthusiast:
                        </Typography>{" "}
                        I love automating tasks and creating efficient workflows using tools like Github Actions and
                        Shell Scripts.
                    </li>
                </Typography>
                <Typography component="p">
                    For more details about my experience and projects, please visit my{" "}
                    <a href="https://resume.marshallku.com/">resume page</a>.
                </Typography>
            </section>
        </div>
    );
}
