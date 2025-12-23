import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import contentData from './data/content.json';
import type { ContentNode, FileNode } from './types';
import { Menu, X, ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';

function App() {
  const [data, setData] = useState<ContentNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // New state for keyboard navigation
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [focusedPath, setFocusedPath] = useState<string | null>(null);

  // Helper to collect all folder paths to expand them by default
  const getAllFolderPaths = (nodes: ContentNode[], parentPath = ''): string[] => {
    let paths: string[] = [];
    for (const node of nodes) {
      const path = parentPath ? `${parentPath}/${node.name}` : node.name;
      if (node.type === 'folder') {
        paths.push(path);
        if (node.children) {
          paths = paths.concat(getAllFolderPaths(node.children, path));
        }
      }
    }
    return paths;
  };

  useEffect(() => {
    // Cast the imported JSON to our type
    const nodes = contentData as unknown as ContentNode[];
    setData(nodes);

    // Expand all folders by default
    const allPaths = getAllFolderPaths(nodes);
    setExpandedPaths(new Set(allPaths));

    // Find and select "about me.md" by default
    const findFile = (nodes: ContentNode[], name: string, parentPath = ''): { node: FileNode, path: string } | null => {
      for (const node of nodes) {
        const path = parentPath ? `${parentPath}/${node.name}` : node.name;
        if (node.type === 'file' && node.name === name) return { node: node as FileNode, path };
        if (node.type === 'folder' && node.children) {
          const found = findFile(node.children, name, path);
          if (found) return found;
        }
      }
      return null;
    };

    const defaultFile = findFile(nodes, 'about me.md');
    if (defaultFile) {
      setSelectedFile(defaultFile.node);
      setFocusedPath(defaultFile.path);
    } else if (nodes.length > 0) {
        // Fallback focus
        setFocusedPath(nodes[0].name);
    }

    // Check for mobile screen size
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelectFile = (file: FileNode) => {
    setSelectedFile(file);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  // Flatten visible nodes for keyboard navigation
  const getVisibleNodes = useCallback(() => {
    const flatten = (nodes: ContentNode[], parentPath = ''): { node: ContentNode; path: string }[] => {
      let flat: { node: ContentNode; path: string }[] = [];
      for (const node of nodes) {
        const path = parentPath ? `${parentPath}/${node.name}` : node.name;
        flat.push({ node, path });
        if (node.type === 'folder' && expandedPaths.has(path) && node.children) {
          flat = flat.concat(flatten(node.children, path));
        }
      }
      return flat;
    };
    return flatten(data);
  }, [data, expandedPaths]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if modifier keys are pressed (except shift maybe?)
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Only handle navigation keys if sidebar is visible (or always on desktop)
      if (isMobile && !isSidebarOpen) return;

      const visibleNodes = getVisibleNodes();
      const currentIndex = visibleNodes.findIndex(item => item.path === focusedPath);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : 0;
        setFocusedPath(visibleNodes[nextIndex].path);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleNodes.length - 1;
        setFocusedPath(visibleNodes[prevIndex].path);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentIndex !== -1) {
          const item = visibleNodes[currentIndex];
          if (item.node.type === 'folder') {
            toggleExpand(item.path);
          } else {
            handleSelectFile(item.node as FileNode);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getVisibleNodes, focusedPath, isMobile, isSidebarOpen]);

  return (
    <div 
        className="h-screen w-full overflow-hidden transition-colors duration-300"
        style={{ background: 'var(--bg-image)', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
    >
      <div className="flex flex-col h-full text-text-body font-mono p-2 pt-8 md:p-6 box-border max-w-[1200px] mx-auto w-full">
      
      {/* Outer Frame Container */}
      <div className="relative flex flex-1 min-h-0 mb-2">
        
        {/* Border & Label Layer */}
        <div 
            className="absolute inset-0 border border-ui-border-outer rounded-ui pointer-events-none z-20 transition-all duration-300"
            style={{ 
                maskImage: 'linear-gradient(160deg, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(160deg, black 80%, transparent 100%)'
            }}
        ></div>
        <div 
            className="absolute -top-4 left-8 px-3 py-0.5 border border-ui-border-outer text-ui-item-folder z-30 text-xl transition-colors duration-300 font-bold"
            style={{ background: 'var(--bg-image)', backgroundAttachment: 'fixed' }}
        >
            tobias hinderling
        </div>

        {/* Content Layer (Clipped) */}
        <div className="flex flex-col md:flex-row flex-1 w-full h-full overflow-hidden rounded-ui z-10 relative transition-all duration-300">
            
            {/* Mobile Header */}
            <div 
                className="md:hidden h-20 border-b border-ui-border-ui flex items-center px-4 z-40 transition-colors duration-300 shrink-0"
            >
                <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-ui-highlight hover:text-white flex items-center gap-2 transition-colors duration-300 p-2 ml-1 mt-6"
                >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                <span className="text-ui-highlight text-lg">menu</span>
                </button>
            </div>

            {/* Sidebar */}
            <div 
                className={`
                absolute md:relative z-50 top-20 md:top-0 bottom-0 left-0 
                w-64 transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                ${isMobile ? 'shadow-2xl' : ''}
                `}
                style={isMobile ? { background: 'var(--bg-image)', backgroundAttachment: 'fixed', backgroundSize: 'cover' } : {}}
            >
                <Sidebar 
                    nodes={data} 
                    onSelectFile={handleSelectFile} 
                    selectedFile={selectedFile}
                    expandedPaths={expandedPaths}
                    onToggleExpand={toggleExpand}
                    focusedPath={focusedPath}
                    onFocusItem={setFocusedPath}
                />
            </div>

            {/* Vertical Separator (Fading Line) */}
            <div className="hidden md:block w-px bg-gradient-to-b from-ui-border-ui via-ui-border-ui/50 to-transparent z-30 my-4"></div>

            {/* Overlay for mobile when sidebar is open */}
            {isMobile && isSidebarOpen && (
                <div 
                className="absolute inset-0 bg-black/50 z-20"
                onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full pt-0 md:pt-4 w-full relative overflow-hidden transition-colors duration-300">
                <Content file={selectedFile} />
            </div>
        </div>

      </div>

        {/* Footer: Theme Switcher & Manual */}
        <div className="flex justify-between items-center px-4 text-ui-item-folder/60 text-xs md:text-sm">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
                <ArrowUp size={14} />
                <ArrowDown size={14} />
                <span>nav</span>
            </div>
            <div className="flex items-center gap-1">
                <CornerDownLeft size={14} />
                <span>select/toggle</span>
            </div>
            <div className="flex items-center gap-1">
                <span className="border border-ui-item-folder/40 px-1 rounded text-[10px]">PgUp</span>
                <span className="border border-ui-item-folder/40 px-1 rounded text-[10px]">PgDn</span>
                <span>scroll</span>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

export default App;
