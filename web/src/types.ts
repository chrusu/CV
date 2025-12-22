export interface Frontmatter {
    name?: string;
    skills?: string[];
    passions?: string[];
    [key: string]: any;
}

export interface FileNode {
    type: 'file';
    name: string;
    frontmatter: Frontmatter;
    content: string;
}

export interface FolderNode {
    type: 'folder';
    name: string;
    children: (FileNode | FolderNode)[];
}

export type ContentNode = FileNode | FolderNode;
