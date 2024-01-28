export interface Post {
    data: {
        title: string;
        description: string;
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
