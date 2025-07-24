import { useState, useEffect } from 'react';

type ModalProps = {
    isOpen: boolean, onClose: () => void, children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
	setShowModal(isOpen);
    }, [isOpen]);

    if (!showModal) return null;

    return (
	<div className="fixed inset-0 z-50 overflow-y-auto">
	    {/* Background overlay with transition */}
	    <div
		className={`fixed inset-0 bg-black/50 transition-opacity ${
		    isOpen ? 'opacity-100' : 'opacity-0'
		}`}
		onClick={onClose}
	    ></div>

	    {/* Modal container with transition */}
	    <div className="flex min-h-full items-center justify-center  text-center">
		<div
		    className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all   ${
			isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
		    }`}
		>
		    {/* Modal content */}
		    <div className="bg-white ">
			{children}
		    </div>

		</div>
	    </div>
	</div>
    );
};