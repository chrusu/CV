import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
    src: string;
    alt?: string;
    onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <button 
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
                onClick={onClose}
            >
                <X size={32} />
            </button>
            <img 
                src={src} 
                alt={alt} 
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
            {alt && (
                <div className="absolute bottom-8 left-0 right-0 text-center text-white/80 font-mono text-sm pointer-events-none">
                    {alt}
                </div>
            )}
        </div>
    );
};
