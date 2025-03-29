export interface MessageResponseDto {
    _id: string;
    sender_id: string,
    message: string,
    timestamp: string,
    is_read: boolean
}

export interface MessageViewDto {
    sender_id: string,
    message: string,
    timestamp: string,
    receiver_id: string,
}

export const messageViewProps = [ "sender_id", "message", "timestamp", "receiver_id" ];