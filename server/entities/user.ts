export interface UserResponseDTO {
    _id: string;
    name: string;
    is_bot: boolean;
    description?: string;
    image: string;
}


export interface UserViewDTO {
    name: string;
    description?: string;
    image: string;
}