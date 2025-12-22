import React, { useState } from 'react';
import { Folder, FolderOpen, FileText } from 'lucide-react';
import type { ContentNode, FileNode } from '../types';

interface SidebarProps {
    nodes: ContentNode[];
    onSelectFile: (file: FileNode) => void;
    selectedFile: FileNode | null;
}

const SidebarItem: React.FC<{
    node: ContentNode;
    onSelectFile: (file: FileNode) => void;
    selectedFile: FileNode | null;
}> = ({ node, onSelectFile, selectedFile }) => {
    const [isOpen, setIsOpen] = useState(true);

    const isSelected = node.type === 'file' && selectedFile?.name === node.name;

    if (node.type === 'folder') {
        return (
            <div className="select-none font-mono">
                <div
                    className="flex items-center py-1.5 px-2 hover:bg-ui-highlight/5 cursor-pointer text-ui-item-folder transition-colors rounded-md mx-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="mr-2 opacity-70">
                        {isOpen ? <FolderOpen size={18} strokeWidth={2} /> : <Folder size={18} strokeWidth={2} />}
                    </span>
                    <span className="text-base font-bold tracking-wide">{node.name}</span>
                </div>
                {isOpen && (
                    <div className='flex flex-col ml-5 pl-2 border-l border-ui-border-ui/20 my-1'>
                        {node.children.map((child, index) => (
                            <SidebarItem
                                key={index}
                                node={child}
                                onSelectFile={onSelectFile}
                                selectedFile={selectedFile}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer transition-all rounded-md mx-2 font-mono text-base ${
                isSelected 
                ? 'bg-ui-highlight/10 text-ui-highlight font-bold' 
                : 'text-ui-item-file hover:text-ui-item-selected hover:bg-ui-highlight/5'
            }`}
            onClick={() => onSelectFile(node)}
        >
            <span className={`shrink-0 ${isSelected ? 'opacity-100' : 'opacity-70'}`}>
                <FileText size={18} strokeWidth={2} />
            </span>
            <span className="truncate">{node.name}</span>
        </div>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ nodes, onSelectFile, selectedFile }) => {
    return (
        <div className="h-full overflow-y-auto pt-6 pb-6">
            <div className="flex flex-col gap-1">
                {nodes.map((node, index) => (
                    <SidebarItem
                        key={index}
                        node={node}
                        onSelectFile={onSelectFile}
                        selectedFile={selectedFile}
                    />
                ))}
            </div>
        </div>
    );
};
