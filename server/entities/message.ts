export interface MessageResponseDto {
    sender_id: string,
    message: string,
    timestamp: string,
    is_read: boolean
}

export interface MessageViewDto {
    sender_id: string,
    message: string,
    timestamp: string,
}