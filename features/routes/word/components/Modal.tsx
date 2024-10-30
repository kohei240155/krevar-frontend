"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ open, setOpen }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-6 pb-6 pt-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <CheckIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-gray-900"
                />
              </div>
              <div className="mt-4 text-left sm:mt-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  ハイライト機能の使い方
                </DialogTitle>
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-gray-90">
                      ▶ ハイライト色を設定する場合
                    </strong>
                    <br />
                    <span className="border-b border-gray-900 bg-yellow-200">
                      ハイライトされた単語
                    </span>
                    に対するイメージ画像と訳が出力されます。
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-gray-90">
                      ▶ ハイライト色を設定しない場合
                    </strong>
                    <br />
                    <span className="border-b border-gray-900">
                      入力された単語、または文章全体
                    </span>
                    に対するイメージ画像と訳が出力されます。
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
