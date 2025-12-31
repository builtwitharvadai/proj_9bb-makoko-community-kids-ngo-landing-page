/**
 * Prettier Configuration
 * 
 * Defines code formatting rules for consistent style across the project.
 * Uses modern ES module syntax as per package.json "type": "module".
 * 
 * @generated-from: task-id:TASK-001 type:infrastructure
 * @modifies: none (new file)
 * @dependencies: ["prettier@^3.4.2"]
 */

/**
 * @type {import("prettier").Config}
 */
const config = {
  // Line length - balance readability with horizontal space
  printWidth: 100,

  // Indentation - 2 spaces for consistency with modern JS conventions
  tabWidth: 2,
  useTabs: false,

  // Semicolons - enforce for clarity and ASI safety
  semi: true,

  // Quotes - single quotes for strings (except JSON)
  singleQuote: true,

  // Quote properties - only when necessary
  quoteProps: 'as-needed',

  // JSX quotes - double quotes (HTML convention)
  jsxSingleQuote: false,

  // Trailing commas - ES5 compatible (objects, arrays)
  // Helps with cleaner git diffs
  trailingComma: 'es5',

  // Bracket spacing - spaces inside object literals
  bracketSpacing: true,

  // JSX brackets - same line as last prop
  bracketSameLine: false,

  // Arrow function parentheses - always include for consistency
  arrowParens: 'always',

  // Prose wrap - preserve markdown line breaks
  proseWrap: 'preserve',

  // HTML whitespace sensitivity - CSS display property
  htmlWhitespaceSensitivity: 'css',

  // End of line - LF for cross-platform consistency
  endOfLine: 'lf',

  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',

  // Single attribute per line in HTML/JSX - false for compact formatting
  singleAttributePerLine: false,
};

export default config;