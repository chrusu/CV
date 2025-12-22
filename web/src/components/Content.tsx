import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';
import type { FileNode } from '../types';

interface ContentProps {
    file: FileNode | null;
}

export const Content: React.FC<ContentProps> = ({ file }) => {
    if (!file) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500 font-mono">
                Select a file to view its content
            </div>
        );
    }

    const lineCount = file ? (file.content.split('\n').length + (file.frontmatter ? Object.keys(file.frontmatter).length + 2 : 0)) : 0;
    
    // Calculate minimum lines to fill screen (approximate)
    const minLines = Math.ceil(typeof window !== 'undefined' ? window.innerHeight / 28 : 30);
    const displayLines = Math.max(lineCount, minLines);

    return (
        <div className="h-full p-2 pt-6 md:p-4 flex flex-col">
            <div className="relative flex-1 flex flex-col min-h-0">
                
                {/* Border & Label Layer */}
                <div className="absolute inset-0 border border-ui-border-ui rounded-ui pointer-events-none z-20 transition-all duration-300"></div>
                <div 
                    className="absolute -top-3.5 left-4 px-2 py-0.5 border border-ui-border-ui text-ui-item-folder z-30 text-base transition-colors duration-300 font-bold"
                    style={{ background: 'var(--bg-image)', backgroundAttachment: 'fixed' }}
                >
                    {file.name}
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar rounded-ui z-10 flex transition-all duration-300">
                    {/* Line Numbers */}
                    <div className="hidden md:flex flex-col items-end py-8 pl-4 text-gray-500/50 font-mono text-base select-none bg-bg-primary/50 min-h-full">
                        <div className="border-r border-ui-border-ui/10 pr-2">
                            {Array.from({ length: displayLines }).map((_, i) => (
                                <div key={i} className="leading-relaxed h-[28px]">{i + 1}</div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 p-3 md:p-6">
                        {/* Frontmatter display */}
                        {file.frontmatter && Object.keys(file.frontmatter).length > 0 && (
                            <div className="mb-8 font-mono text-[18px]">
                                
                                {Object.entries(file.frontmatter)
                                    .filter(([key]) => key !== 'timeline' && key !== 'cta')
                                    .map(([key, value]) => (
                                    <div key={key} className={`mt-2 flex ${Array.isArray(value) ? 'flex-col' : 'flex-col sm:flex-row sm:items-start'} gap-2`}>
                                        <span className="text-ui-highlight min-w-[100px] shrink-0">{key}:</span>{' '}
                                        {Array.isArray(value) ? (
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {value.map((item: string, i: number) => (
                                                    <span 
                                                        key={i} 
                                                        className="text-text-body text-base border border-ui-link px-2 py-0.5 rounded-md bg-ui-link/10"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : key === 'link' ? (
                                            <a 
                                                href={String(value)} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-ui-link hover:underline flex items-center gap-2 group"
                                            >
                                                <span>{String(value)}</span>
                                                <ExternalLink size={16} strokeWidth={2} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ) : (
                                            <span className="text-text-body">{String(value)}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Timeline Display */}
                        {file.frontmatter?.timeline && Array.isArray(file.frontmatter.timeline) && (
                            <div className="mb-12 font-mono ml-2">
                                {file.frontmatter.timeline.map((item: any, index: number) => (
                                    <div key={index} className="relative pl-8 pb-8 border-l border-ui-border-ui last:border-l-0 last:pb-0">
                                        <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-ui-highlight border border-bg-primary"></div>
                                        <div className="text-base text-ui-highlight mb-1">{item.date}</div>
                                        <h3 className="text-xl text-text-heading font-bold">{item.title}</h3>
                                        <div className="text-text-body text-lg">{item.institution}</div>
                                        {item.location && <div className="text-text-body text-base opacity-75 mt-1">{item.location}</div>}
                                        {item.details && Array.isArray(item.details) && (
                                            <ul className="list-disc list-inside mt-2 text-text-body text-base opacity-90">
                                                {item.details.map((detail: string, i: number) => (
                                                    <li key={i}>{detail}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="prose prose-invert prose-p:text-text-body prose-headings:font-normal max-w-none">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    img: ({node, ...props}) => {
                                        const src = props.src || '';
                                        const newSrc = src.startsWith('http') ? src : `./assets/${src}`;
                                        return <img {...props} src={newSrc} className="rounded-xl shadow-lg max-w-full border border-gray-800" />;
                                    },
                                    a: ({node, ...props}) => (
                                        <a {...props} className="text-ui-link hover:text-ui-link hover:underline" target="_blank" rel="noopener noreferrer" />
                                    ),
                                    h1: ({node, ...props}) => <h1 {...props} className="text-[26px] text-text-heading mt-8 mb-4 font-mono"><span className="opacity-50 mr-2">#</span>{props.children}</h1>,
                                    h2: ({node, ...props}) => <h2 {...props} className="text-[26px] text-text-heading mt-8 mb-4 font-mono"><span className="opacity-50 mr-2">##</span>{props.children}</h2>,
                                    h3: ({node, ...props}) => <h3 {...props} className="text-[22px] text-text-heading mt-6 mb-3 font-mono"><span className="opacity-50 mr-2">###</span>{props.children}</h3>,
                                    p: ({node, ...props}) => <p {...props} className="mb-4 leading-relaxed text-text-body font-mono text-[18px]" />,
                                    ul: ({node, ...props}) => <ul {...props} className="list-disc list-inside mb-4 space-y-1 text-text-body font-mono text-[18px]" />,
                                    li: ({node, ...props}) => <li {...props} className="text-text-body" />,
                                    code: ({node, ...props}) => <code {...props} className="text-ui-highlight bg-white/5 px-1 py-0.5 rounded" />,
                                }}
                            >
                                {file.content}
                            </ReactMarkdown>
                        </div>

                        {/* CTA Section */}
                        {file.frontmatter?.cta && (
                            <div className="mt-12 mb-12 p-6 border border-ui-border-ui rounded-ui bg-bg-primary/30 backdrop-blur-sm">
                                <p className="text-text-body mb-4 text-lg font-mono">{file.frontmatter.cta.text}</p>
                                <a 
                                    href={file.frontmatter.cta.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-ui-highlight text-bg-primary font-bold rounded hover:opacity-90 transition-opacity font-mono"
                                >
                                    {file.frontmatter.cta.button}
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        )}
                        
                        {/* Bottom Spacer */}
                        <div className="h-2 w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
