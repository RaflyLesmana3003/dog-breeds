export interface Favorite {
    breed: string;
    imageUrl: string;
    id: string;
    userId: string;
    userName: string;
    totalLikes: number;
    createdAt: Date;
    updatedAt: Date;
    isLikedByMe: boolean
}