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
      className={`fixed inset-0 bg-stone-800 bg-opacity-80 flex justify-center items-center transition-opacity duration-300 ease-out z-50 ${
        showModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-lg w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 transition-transform duration-300 ease-out p-6 ${
          showModal ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-lg text-stone-800 font-semibold">{title}</h1>
          <button
            className="absolute top-1 right-2"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X
              size={18}
              className="text-stone-500 hover:text-stone-800 transition-all"
            />
          </button>
        </div>
        <div className="text-stone-500 text-center mb-8">{content}</div>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center border align-middle select-none font-medium text-center transition-all duration-300 ease-in text-sm rounded-md px-3 py-1 bg-transparent border-red-500 text-red-500 hover:bg-red-500/5 hover:border-red-500/5 shadow-md"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="text-white bg-sky-600 font-medium text-sm border border-sky-600 px-3 py-1 rounded-md shadow-md 
             hover:bg-sky-600/5 hover:text-sky-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
