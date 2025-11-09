import Typography from "@marshallku/ui/Typography";
import { classNames } from "@marshallku/utils";
import { type Metadata } from "next";

import styles from "./page.module.scss";

import Profile from "#components/Profile";


export const dynamic = "error";

export const metadata: Metadata = {
    title: "About Me",
    openGraph: {
        type: "profile",
        firstName: "Marshall",
        lastName: "Ku",
    },
};

const cx = classNames(styles, "about");

export default function AboutPage() {
    return (
        <div className={cx()}>
            <Profile size="large" showContact className={cx("__profile")} />
            <section className={cx("__container", "__container--about")}>
                <Typography component="p" marginBottom>
                    Hello! I&apos;m Marshall Ku, a passionate developer who loves learning and taking on new challenges.
                    I&apos;ve worked on various projects and have experience with a wide range of technologies.
                </Typography>
                <Typography component="p" marginBottom>
                    I enjoy solving complex problems with code and continuously strive to improve my skills. Through
                    side projects and professional experience, I&apos;ve gained a solid foundation in multiple domains,
                    from frontend to backend technologies.
                </Typography>
                <Typography component="p" marginBottom={8} variant="h5" fontWeight={700}>
                    What I Do
                </Typography>
                <Typography component="ul" marginBottom>
                    <li>
                        <Typography component="strong" fontWeight={700}>
                            Frontend Development:
                        </Typography>{" "}
                        I specialize in building interactive user interfaces using technologies like React, Next.js, and
                        TypeScript.
                    </li>
                    <li>
                        <Typography component="strong" fontWeight={700}>
                            Backend Development:
                        </Typography>{" "}
                        I&apos;ve worked with NestJS, Axum, MongoDB, and more to create robust server-side applications.
                    </li>
                    <li>
                        <Typography component="strong" fontWeight={700}>
                            Infrastructure Management:
                        </Typography>{" "}
                        I manage both on-premise and cloud-based environments using Docker, NGINX, and Ubuntu, ensuring
                        high availability and security.
                    </li>
                    <li>
                        <Typography component="strong" fontWeight={700}>
                            Development Efficiency:
                        </Typography>{" "}
                        I am passionate about automating tasks and creating efficient workflows using tools like GitHub
                        Actions, Python, JavaScript, and Shell Scripts.
                    </li>
                </Typography>
                <Typography component="p">
                    For more details about my experience and projects, please visit my{" "}
                    <a href="https://resume.marshallku.com/" target="_blank" rel="noreferrer noopener">
                        resume page
                    </a>
                    .
                </Typography>
            </section>
        </div>
    );
}
