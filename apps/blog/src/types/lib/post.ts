export interface Post {
    data: {
        title: string;
        excerpt: string;
        coverImage: string;
        date: Date;
        ogImage: {
            url: string;
        };
    };
    content: string;
    slug: string;
    category: string;
}
