import React from 'react';

const ModalActions = ({ onCancel, onConfirm, label, disabled, icon: Icon }) => {
    return (
        <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="srd-secondary h-9">
                Cancel
            </button>
            <button
                type="button"
                onClick={onConfirm}
                disabled={disabled}
                className="srd-primary h-9"
            >
                {Icon && <Icon size={13} />}
                {label}
            </button>
        </div>
    );
};

export default ModalActions;