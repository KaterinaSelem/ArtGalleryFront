

export interface IArtwork {
    id: number;
    title: string;
    createdAt: string;
    categoryId: number;
    artStyle: number;
    comition: boolean;
    userId: number;
    description: string;
    image: string;
}

export interface IArtworkProps {
    artwork: IArtwork;
}

