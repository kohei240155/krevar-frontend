import Modal from "react-modal";
import { DeleteConfirmModalProps } from "../types/common";

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirmDelete,
  targetWord,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirm Delete"
    className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Confirm to delete</h2>
      <p className="mb-4">Are you sure you want to delete this {targetWord}?</p>
      <div className="flex justify-end">
        <button
          onClick={onRequestClose}
          className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
        >
          No
        </button>
        <button
          onClick={onConfirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Yes
        </button>
      </div>
    </div>
  </Modal>
);

export default DeleteConfirmModal;
