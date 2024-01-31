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
    };
    content: string;
    slug: string;
    category: string;
}

export interface Category {
    name: string;
    hidden?: boolean;
    coverImage?: string;
    color?: string;
    icon?: string;
    description?: string;
}
