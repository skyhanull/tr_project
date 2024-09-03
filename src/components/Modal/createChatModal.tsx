const Modal = ({ isOpen, onClose, onCreate, newRoomName, setNewRoomName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4">Create a New Chat Room</h2>
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Enter room name"
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={onCreate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
