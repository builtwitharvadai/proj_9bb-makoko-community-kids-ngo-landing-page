import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Root directory for the project
  root: '.',
  
  // Public base path when served in development or production
  base: '/',
  
  // Directory to serve as plain static assets
  publicDir: 'public',
  
  // Build configuration
  build: {
    // Output directory for production build
    outDir: 'dist',
    
    // Directory for assets (relative to outDir)
    assetsDir: 'assets',
    
    // Generate source maps for production
    sourcemap: true,
    
    // Target browsers for build
    target: 'es2020',
    
    // Minify with terser for better compression
    minify: 'terser',
    
    // Terser options
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
    },
    
    // Chunk size warning limit (in kbs)
    chunkSizeWarningLimit: 500,
    
    // Rollup options for advanced build configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // Manual chunks for better caching
        manualChunks: undefined,
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Emit manifest for asset tracking
    manifest: false,
    
    // Clean output directory before build
    emptyOutDir: true,
  },
  
  // Development server configuration
  server: {
    // Port for development server
    port: 3000,
    
    // Automatically open browser on server start
    open: false,
    
    // Enable CORS
    cors: true,
    
    // Strict port - exit if port is already in use
    strictPort: false,
    
    // Host configuration
    host: 'localhost',
    
    // HMR configuration
    hmr: {
      overlay: true,
    },
    
    // Watch options
    watch: {
      usePolling: false,
    },
  },
  
  // Preview server configuration (for production build preview)
  preview: {
    port: 4173,
    strictPort: false,
    host: 'localhost',
    open: false,
  },
  
  // CSS configuration
  css: {
    // PostCSS configuration
    postcss: './postcss.config.js',
    
    // CSS modules configuration
    modules: {
      localsConvention: 'camelCase',
    },
    
    // Preprocessor options
    preprocessorOptions: {},
    
    // Enable CSS source maps in development
    devSourcemap: true,
  },
  
  // Resolve configuration
  resolve: {
    // File extensions to try when resolving imports
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    
    // Path aliases
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    // Include dependencies for pre-bundling
    include: [],
    
    // Exclude dependencies from pre-bundling
    exclude: [],
    
    // Force optimize deps even if in cache
    force: false,
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
  
  // Plugin configuration
  plugins: [],
  
  // Log level
  logLevel: 'info',
  
  // Clear screen on rebuild
  clearScreen: true,
});