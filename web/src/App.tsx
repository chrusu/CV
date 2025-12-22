import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import contentData from './data/content.json';
import type { ContentNode, FileNode } from './types';
import { Menu, X } from 'lucide-react';

function App() {
  const [data, setData] = useState<ContentNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cast the imported JSON to our type
    const nodes = contentData as unknown as ContentNode[];
    setData(nodes);

    // Find and select "about me.md" by default
    const findFile = (nodes: ContentNode[], name: string): FileNode | null => {
      for (const node of nodes) {
        if (node.type === 'file' && node.name === name) return node as FileNode;
        if (node.type === 'folder' && node.children) {
          const found = findFile(node.children, name);
          if (found) return found;
        }
      }
      return null;
    };

    const defaultFile = findFile(nodes, 'about me.md');
    if (defaultFile) {
      setSelectedFile(defaultFile);
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

  return (
    <div 
        className="flex flex-col h-screen text-text-body overflow-hidden font-mono p-2 md:p-6 box-border transition-colors duration-300"
        style={{ background: 'var(--bg-image)', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
    >
      
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
        <div className="flex flex-1 w-full h-full overflow-hidden rounded-ui z-10 relative transition-all duration-300">
            
            {/* Mobile Header */}
            <div 
                className="md:hidden absolute top-0 left-0 right-0 h-12 border-b border-ui-border-ui flex items-center px-4 z-40 transition-colors duration-300"
            >
                <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-ui-highlight hover:text-white flex items-center gap-2 transition-colors duration-300"
                >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="text-ui-highlight">menu</span>
                </button>
            </div>

            {/* Sidebar */}
            <div 
                className={`
                absolute md:relative z-30 top-12 md:top-0 bottom-0 left-0 
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
            <div className="flex-1 flex flex-col h-full pt-12 md:pt-0 w-full relative overflow-hidden transition-colors duration-300">
                <Content file={selectedFile} />
            </div>
        </div>

      </div>

      {/* Theme Switcher Footer */}
      <div className="flex justify-center">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default App;
