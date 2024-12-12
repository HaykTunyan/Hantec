import axios from 'axios';

export async function getFBPosts(limit: string) {
    const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID as string;
    const accessToken = process.env.NEXT_PUBLIC_FB_LIFETIME_PAGE_ACCESS_TOKEN as string;

    try {
        const { data } = await axios.get(
            `https://graph.facebook.com/v20.0/${pageId}?fields=name,picture,posts.limit(${limit}){full_picture,permalink_url,message,created_time}`,
            {
                params: {
                    access_token: accessToken,
                },
            }
        );

        return {
            id: data.id,
            name: data.name,
            picture: data.picture.data.url,
            posts: [...data.posts.data]
        };
    } catch (error) {
        console.error('Error fetching Facebook posts', error);
        throw error;
    }
}
