import { classNames } from "@marshallku/utils";
import styles from "./index.module.scss";

export interface LogoProps {
    height?: number;
    animationOnHover?: boolean;
    forceWhiteColor?: boolean;
}

const cx = classNames(styles, "logo");

function Logo({ height = 20, animationOnHover, forceWhiteColor }: LogoProps) {
    return (
        <svg
            className={cx("", animationOnHover && "--hover-animation", forceWhiteColor && "--white")}
            viewBox="0 0 803.2 140.05"
            height={height}
        >
            <g className={cx("__image")}>
                <path
                    fill="#f1718c"
                    d="M81.32,104.92l24-14.6c.43-.26.65-.15.65.36v29a1.67,1.67,0,0,0,.74,1.37l24.54,18.84a.8.8,0,0,0,1.05,0l28.08-19.78A1.16,1.16,0,0,0,161,119c0-.95,0-96,0-96,0-.51-.22-.68-.54-1L135.42.63c-.9-.79-1.07-.81-2.08-.19l-52,33.71c-.85.55-.85.55-1.68,0L27.62.44c-1-.62-1.18-.6-2.08.19L.54,22A1.1,1.1,0,0,0,0,23s0,95,0,96a1.16,1.16,0,0,0,.58,1.11l28.08,19.78a.8.8,0,0,0,1.05,0L54.25,121a1.67,1.67,0,0,0,.74-1.37v-29c0-.51.22-.62.65-.36l24,14.6C80.47,105.44,80.47,105.44,81.32,104.92Zm0-32.76,69.73-45.65c.35-.21.67,0,.67.36l.81,90.35a1,1,0,0,1-.45.88l-17.47,12.3c-.3.21-.3.21-.3-.15l.23-64.92c0-1.32-.77-1.79-1.73-1.2L81.32,95.68c-.85.54-.85.54-1.68,0L28.15,64.13c-1-.59-1.73-.12-1.73,1.2l.23,64.92c0,.36-.13.36-.42.15L8.88,118.1a1,1,0,0,1-.45-.88l.81-90.35a.4.4,0,0,1,.66-.36L79.61,72.16C80.47,72.69,80.47,72.69,81.32,72.16Z"
                />
            </g>
            <g className={cx("__text")}>
                <path d="M182.84,72.39a33.92,33.92,0,0,1,12.37-14,32.3,32.3,0,0,1,17.47-4.89,30.07,30.07,0,0,1,14.47,3.35,24.8,24.8,0,0,1,9.58,8.81v-11h23.91v78H236.73V121.6a25.8,25.8,0,0,1-9.72,8.81,30,30,0,0,1-14.47,3.36,31.72,31.72,0,0,1-17.33-5,34.13,34.13,0,0,1-12.37-14.12,47,47,0,0,1-4.55-21.18A46.63,46.63,0,0,1,182.84,72.39Zm48.93,7.13a16.81,16.81,0,0,0-24.19-.07q-5,5.11-5,14t5,14.19a16.63,16.63,0,0,0,24.19.07q4.95-5.16,5-14.12T231.77,79.52Z" />
                <path d="M312.36,57.5a27.11,27.11,0,0,1,14-3.7V79.1h-6.57q-9,0-13.42,3.85t-4.47,13.49v36.21H278v-78h23.91v13A31.59,31.59,0,0,1,312.36,57.5Z" />
                <path d="M351.37,130.27a31.07,31.07,0,0,1-12.59-9.57,25.23,25.23,0,0,1-5.17-13.64h23.63a9,9,0,0,0,3.77,6.57,13.36,13.36,0,0,0,8.25,2.52,11.74,11.74,0,0,0,6.92-1.75,5.34,5.34,0,0,0,2.45-4.54q0-3.36-3.5-5a71.13,71.13,0,0,0-11.32-3.57,106.06,106.06,0,0,1-14-4.12,24.21,24.21,0,0,1-9.65-6.85q-4.05-4.68-4.05-12.65a21.51,21.51,0,0,1,3.7-12.24,25,25,0,0,1,10.91-8.74,41.78,41.78,0,0,1,17.12-3.21q14.68,0,23.14,7.27t9.72,19.29H378.63a9.55,9.55,0,0,0-3.57-6.43,12.39,12.39,0,0,0-7.9-2.38,10.94,10.94,0,0,0-6.43,1.61,5.13,5.13,0,0,0-2.23,4.41c0,2.23,1.18,3.91,3.56,5a56.54,56.54,0,0,0,11.11,3.35,121.72,121.72,0,0,1,14.12,4.41,24.25,24.25,0,0,1,9.58,7c2.75,3.21,4.17,7.53,4.27,12.93a20.52,20.52,0,0,1-3.85,12.23,25.44,25.44,0,0,1-11,8.46,42.29,42.29,0,0,1-16.71,3.08A44.82,44.82,0,0,1,351.37,130.27Z" />
                <path d="M485.3,62.68q8.1,8.88,8.1,24.39v45.58H469.64V90.29q0-7.83-4.06-12.16t-10.9-4.34q-6.85,0-10.91,4.34t-4,12.16v42.36H415.81V29.19h23.91V65.12a25.66,25.66,0,0,1,9.93-8.25,31.85,31.85,0,0,1,14.12-3.07Q477.18,53.8,485.3,62.68Z" />
                <path d="M509.83,72.39a34,34,0,0,1,12.37-14,32.34,32.34,0,0,1,17.48-4.89,30.1,30.1,0,0,1,14.47,3.35,24.77,24.77,0,0,1,9.57,8.81v-11h23.91v78H563.72V121.6a25.84,25.84,0,0,1-9.71,8.81,30,30,0,0,1-14.47,3.36,31.73,31.73,0,0,1-17.34-5,34.2,34.2,0,0,1-12.37-14.12,47,47,0,0,1-4.54-21.18A46.63,46.63,0,0,1,509.83,72.39Zm48.93,7.13a16.8,16.8,0,0,0-24.18-.07q-5,5.11-5,14t5,14.19a16.62,16.62,0,0,0,24.18.07q5-5.16,5-14.12T558.76,79.52Z" />
                <path d="M628.87,29.19V132.65H605V29.19Z" />
                <path d="M670.11,29.19V132.65h-23.9V29.19Z" />
                <path d="M774,132.65,741,89.31v43.34h-23.9V34.51H741V77.57l32.72-43.06h28.1l-38,48.09,39.42,50.05Z" />
            </g>
        </svg>
    );
}

export default Logo;
