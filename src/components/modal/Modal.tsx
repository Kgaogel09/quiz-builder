import { X } from "lucide-react";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  showModal,
  onClose,
  onConfirm,
  title,
  content,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) {
  return (
    <div
      className={`fixed inset-0 bg-stone-800 bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ease-out z-50 ${
        showModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 transition-transform duration-300 ease-out ${
          showModal ? "scale-100" : "scale-95"
        }`}
      >
        <div className="border-b border-stone-200 p-4 flex justify-between items-center">
          <h1 className="text-lg text-stone-800 font-semibold">{title}</h1>
          <button type="button" onClick={onClose} aria-label="Close">
            <X
              size={18}
              className="text-stone-500 hover:text-stone-800 transition-all"
            />
          </button>
        </div>
        <div className="p-4 text-stone-500">{content}</div>
        <div className="border-t border-stone-200 p-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center border align-middle select-none font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md px-3 py-1 bg-transparent border-red-500 text-red-500 hover:bg-red-500/5 hover:border-red-500/5 shadow-none hover:shadow-none"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="text-white text-sm bg-sky-600  border border-sky-600 px-3 py-1 rounded-md shadow-sm transition-all disabled:bg-gray-300 disabled:border-gray-300"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
