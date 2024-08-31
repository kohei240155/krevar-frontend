export interface EmptyListProps {
    title: string;
    message: string;
    buttonText: string;
    buttonAction: () => void;
}

export interface DeleteConfirmModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirmDelete: () => void;
    targetWord: string;
}