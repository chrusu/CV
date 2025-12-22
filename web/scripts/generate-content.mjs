import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.resolve(__dirname, '../../content');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/content.json');
const PUBLIC_ASSETS_DIR = path.resolve(__dirname, '../public/assets');

if (!fs.existsSync(PUBLIC_ASSETS_DIR)) {
    fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true });
}

function parseFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (match) {
        try {
            const frontmatter = yaml.load(match[1]);
            const body = match[2];
            return { frontmatter, body };
        } catch (e) {
            console.error(`Error parsing YAML in ${filePath}:`, e);
            return { frontmatter: {}, body: content };
        }
    } else {
        return { frontmatter: {}, body: content };
    }
}

function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    const result = [];

    for (const item of items) {
        if (item.startsWith('.')) continue; // Skip hidden files

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            result.push({
                type: 'folder',
                name: item,
                children: scanDirectory(fullPath)
            });
        } else if (item.endsWith('.md')) {
            const { frontmatter, body } = parseFile(fullPath);
            result.push({
                type: 'file',
                name: item,
                frontmatter,
                content: body
            });
        } else if (item.endsWith('.webp') || item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.gif')) {
             // Copy images to public folder
             fs.copyFileSync(fullPath, path.join(PUBLIC_ASSETS_DIR, item));
             console.log(`Copied asset: ${item}`);
        }
    }
    return result;
}

console.log('Scanning content...');
const tree = scanDirectory(CONTENT_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tree, null, 2));
console.log(`Content generated at ${OUTPUT_FILE}`);
