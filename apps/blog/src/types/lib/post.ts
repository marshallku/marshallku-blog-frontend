import { IconProps } from "@marshallku/icon";

export interface Post {
    data: {
        title: string;
        description: string;
        date: {
            posted: Date;
            modified?: Date;
        };
        tags: string[];
        coverImage: string;
        ogImage: string;
        displayAd?: boolean;
    };
    content: string;
    slug: string;
    category: string;
}

export interface Category {
    index?: number;
    name: string;
    hidden?: boolean;
    coverImage?: string;
    color?: string;
    icon?: IconProps["name"];
    description?: string;
}

export interface Tag {
    name: string;
    count: number;
}
