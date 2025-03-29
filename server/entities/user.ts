
export interface UserResponseDTO {
    _id: string;
    name: string;
    is_bot: boolean;
    image: string;
}


export interface UserViewDTO {
    name: string;
}

export const parseUserDocument = (userDocument: any): UserResponseDTO => (
    {
        _id: userDocument._id,
        name: userDocument.name,
        is_bot: userDocument.is_bot,
        image: userDocument.image,
    }
)
