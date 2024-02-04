"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { classNames } from "@marshallku/utils";
import Button from "#components/Button";
import ReportIssueButton from "#components/ReportIssueButton";
import Typography from "#components/Typography";
import styles from "./index.module.scss";

export interface ErrorProps {
    title?: string;
    notFound?: boolean;
    reset?(): void;
}

const cx = classNames(styles, "error");

function Error({ title, notFound, reset }: ErrorProps) {
    const [location, setLocation] = useState("");

    useEffect(() => {
        setLocation(window.location.href);
    }, []);

    return (
        <div className={cx()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="800px"
                width="800px"
                version="1.1"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className={cx("__ufo")}
            >
                <g transform="translate(1 1)">
                    <path
                        style={{ fill: "#FD9808" }}
                        d="M255,314.733c-75.947,0-143.36-9.387-188.587-23.893C90.307,343.747,165.4,383,255,383 s164.693-39.253,188.587-92.16C398.36,305.347,330.093,314.733,255,314.733"
                    />
                    <path
                        style={{ fill: "#FFDD09" }}
                        d="M238.787,314.733c-64.853,0-123.733-9.387-162.987-23.893C96.28,343.747,161.133,383,238.787,383 s142.507-39.253,162.987-92.16C362.52,305.347,303.64,314.733,238.787,314.733"
                    />
                    <path
                        style={{ fill: "#FFFFFF" }}
                        d="M113.347,302.787c24.747,45.227,81.92,77.653,150.187,80.213c-2.56,0-5.973,0-8.533,0 c-89.6,0-164.693-39.253-188.587-92.16C80.067,295.107,96.28,299.373,113.347,302.787"
                    />
                    <g>
                        <path
                            style={{ fill: "#FFDD09" }}
                            d="M382.147,187.587c0,3.413,0.853,5.973,0.853,9.387c0,1.707,0,3.413,0,6.827l-31.573,10.24 c-63.147,20.48-130.56,20.48-193.707,0L127,203.8c0-3.413,0-5.12,0-6.827c0-3.413,0-5.973,0.853-9.387 c-71.68,11.947-120.32,34.133-120.32,58.88c0,37.547,110.933,68.267,247.467,68.267s247.467-30.72,247.467-68.267 C502.467,221.72,453.827,199.533,382.147,187.587"
                        />
                        <polygon
                            style={{ fill: "#FFDD09" }}
                            points="237.933,41.667 272.067,41.667 272.067,7.533 237.933,7.533"
                        />
                    </g>
                    <path
                        style={{ fill: "#FD9808" }}
                        d="M383,203.8c0-70.827-57.173-119.467-128-119.467S127,132.973,127,203.8l31.573,10.24 c63.147,20.48,130.56,20.48,193.707,0L383,203.8z"
                    />
                    <path
                        style={{ fill: "#FFDD09" }}
                        d="M357.4,203.8c0-70.827-51.2-119.467-115.2-119.467S127,132.973,127,203.8l28.16,10.24 c56.32,20.48,117.76,20.48,174.08,0L357.4,203.8z"
                    />
                    <path
                        style={{ fill: "#FFFFFF" }}
                        d="M256.707,84.333c2.56,0,4.267,0,6.827,0c-60.587,3.413-109.227,51.2-109.227,119.467l28.16,10.24 c26.453,9.387,53.76,14.507,81.067,15.36c-34.987,0.853-69.973-4.267-103.253-15.36l-31.573-10.24 C128.707,132.973,185.88,84.333,256.707,84.333"
                    />
                    <path d="M186.733,186.733c-5.12,0-8.533-3.413-8.533-8.533c0-33.28,26.453-59.733,59.733-59.733c5.12,0,8.533,3.413,8.533,8.533 s-3.413,8.533-8.533,8.533c-23.893,0-42.667,18.773-42.667,42.667C195.267,183.32,191.853,186.733,186.733,186.733z" />
                    <path d="M255,391.533c-91.307,0-170.667-39.253-196.267-97.28l-7.68-17.067l17.92,5.973C115.907,297.667,183.32,306.2,255,306.2 s139.093-8.533,186.027-23.893l17.92-5.973l-7.68,17.067C425.667,352.28,346.307,391.533,255,391.533z M84.333,304.493 c30.72,41.813,96.427,69.973,170.667,69.973c73.387,0,139.947-28.16,170.667-69.973c-46.08,11.947-107.52,18.773-170.667,18.773 S130.413,316.44,84.333,304.493z" />
                    <path d="M255,237.933c-33.28,0-67.413-5.12-98.987-16.213l-37.547-11.947V203.8c0-73.387,58.88-128,136.533-128 s136.533,54.613,136.533,128v5.973l-37.547,12.8C322.413,232.813,288.28,237.933,255,237.933z M135.533,197.827l25.6,8.533   c60.587,20.48,127.147,20.48,187.733,0l25.6-8.533C371.053,137.24,320.707,92.867,255,92.867S138.947,137.24,135.533,197.827z" />
                    <path d="M272.067,50.2h-34.133l-8.533-8.533V7.533L237.933-1h34.133l8.533,8.533v34.133L272.067,50.2z M246.467,33.133h17.067 V16.067h-17.067V33.133z" />
                    <path d="M255,92.867c-5.12,0-8.533-3.413-8.533-8.533V41.667c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v42.667 C263.533,89.453,260.12,92.867,255,92.867z" />
                    <path d="M263.533,272.067c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533 S263.533,266.947,263.533,272.067" />
                    <path d="M340.333,263.533c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S340.333,258.413,340.333,263.533" />
                    <path d="M408.6,246.467c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S408.6,241.347,408.6,246.467" />
                    <path d="M118.467,246.467c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S118.467,241.347,118.467,246.467" />
                    <path d="M169.667,263.533c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533c0-5.12-3.413-8.533-8.533-8.533 C173.08,255,169.667,258.413,169.667,263.533" />
                    <path d="M255,323.267c-123.733,0-256-27.307-256-76.8c0-41.813,89.6-60.587,128-67.413l11.093-1.707l-1.707,11.093 c0,2.56-0.853,5.973-0.853,8.533l25.6,8.533c60.587,20.48,127.147,20.48,187.733,0l25.6-8.533c0-3.413,0-5.973-0.853-8.533 l-1.707-11.093L383,179.053c38.4,5.973,128,25.6,128,67.413C511,295.96,378.733,323.267,255,323.267z M118.467,197.827 c-69.973,12.8-102.4,34.133-102.4,48.64c0,24.747,91.307,59.733,238.933,59.733s238.933-34.987,238.933-59.733   c0-14.507-32.427-34.987-102.4-48.64c0,0.853,0,3.413,0,5.973v5.973l-37.547,12.8c-64,21.333-134.827,21.333-198.827,0 l-36.693-12.8V203.8C118.467,201.24,118.467,199.533,118.467,197.827z" />
                    <path d="M203.8,442.733c-5.12,0-8.533-3.413-8.533-8.533v-25.6c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533 v25.6C212.333,439.32,208.92,442.733,203.8,442.733z" />
                    <path d="M203.8,502.467c-5.12,0-8.533-3.413-8.533-8.533v-25.6c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533 v25.6C212.333,499.053,208.92,502.467,203.8,502.467z" />
                    <path d="M255,434.2c-5.12,0-8.533-3.413-8.533-8.533v-8.533c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v8.533 C263.533,430.787,260.12,434.2,255,434.2z" />
                    <path d="M263.533,459.8c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533 S263.533,454.68,263.533,459.8" />
                    <path d="M255,511c-5.12,0-8.533-3.413-8.533-8.533v-8.533c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v8.533 C263.533,507.587,260.12,511,255,511z" />
                    <path d="M306.2,434.2c-5.12,0-8.533-3.413-8.533-8.533V408.6c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v17.067 C314.733,430.787,311.32,434.2,306.2,434.2z" />
                    <path d="M306.2,493.933c-5.12,0-8.533-3.413-8.533-8.533v-25.6c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v25.6 C314.733,490.52,311.32,493.933,306.2,493.933z" />
                </g>
            </svg>
            <Typography component="h1" variant="h1" fontWeight={700} marginBottom={12}>
                {title || (notFound ? "페이지를 찾을 수 없습니다." : "요청을 처리하는데 실패했습니다.")}
            </Typography>
            <Typography variant="b2" marginBottom={24}>
                {notFound ? (
                    <>
                        페이지가 존재하지 않거나 이동했습니다. 주소를 다시 확인해 주세요.
                        <br />
                        주소가 정확한 경우, 하단 버튼을 통해 이슈를 제보해 주시면 빠르게 확인하겠습니다.
                    </>
                ) : (
                    <>
                        요청하신 페이지를 처리하는 데 실패했습니다. 잠시 후 다시 시도해 주세요.
                        <br />
                        오류가 개선되지 않는 경우 하단 버튼을 통해 이슈를 제보해 주시면 빠르게 확인하겠습니다.
                    </>
                )}
            </Typography>
            <div className={cx("__buttons")}>
                <Button component={Link} href="/">
                    홈으로
                </Button>
                {reset && <Button onClick={reset}>초기화</Button>}
            </div>
            <ReportIssueButton title={notFound ? "[Page not found]" : "[Bug report]"} body={`Error page: ${location}`}>
                이슈 제보
            </ReportIssueButton>
        </div>
    );
}

export default Error;