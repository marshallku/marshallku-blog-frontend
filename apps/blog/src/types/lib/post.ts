export interface Post {
    data: {
        title: string;
        excerpt: string;
        coverImage: string;
        date: Date;
        ogImage: {
            src: string;
        };
    };
    content: string;
    slug: string;
    category: string;
}
