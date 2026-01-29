export interface Frontmatter {
    name?: string;
    skills?: string[];
    passions?: string[];
    [key: string]: any;
}

export interface FileContent {
    frontmatter: Frontmatter;
    content: string;
}

export interface FileNode {
    type: 'file';
    name: string;
    translations: {
        [lang: string]: FileContent;
    };
}

export interface FolderNode {
    type: 'folder';
    name: string;
    children: (FileNode | FolderNode)[];
}

export type ContentNode = FileNode | FolderNode;
