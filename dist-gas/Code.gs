// Google Apps Script globals
/* global SpreadsheetApp, DocumentApp, SlidesApp, DriveApp, HtmlService, UrlFetchApp, Utilities, Logger */

var GASExports;
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 42:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doGet = doGet;
/**
 * Entry point for web app
 */
function doGet() {
    return HtmlService.createHtmlOutputFromFile('index')
        .setTitle('gs-mark2slides - Convert Marp to Google Slides')
        .setWidth(1200)
        .setHeight(800);
}


/***/ }),

/***/ 149:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LANGUAGE_ALIASES = exports.LANGUAGE_KEYWORDS = exports.SYNTAX_COLORS = void 0;
exports.getNormalizedLanguage = getNormalizedLanguage;
exports.SYNTAX_COLORS = {
    // Web Technologies
    javascript: {
        keyword: '#c678dd',
        string: '#98c379',
        number: '#d19a66',
        comment: '#5c6370',
        function: '#61afef',
        operator: '#56b6c2',
        className: '#e5c07b',
        constant: '#d19a66',
        regex: '#98c379'
    },
    typescript: {
        keyword: '#c678dd',
        string: '#98c379',
        number: '#d19a66',
        comment: '#5c6370',
        function: '#61afef',
        operator: '#56b6c2',
        type: '#e5c07b',
        decorator: '#e06c75',
        className: '#e5c07b'
    },
    jsx: {
        keyword: '#c678dd',
        string: '#98c379',
        number: '#d19a66',
        comment: '#5c6370',
        function: '#61afef',
        tag: '#e06c75',
        attribute: '#d19a66',
        className: '#e5c07b'
    },
    tsx: {
        keyword: '#c678dd',
        string: '#98c379',
        number: '#d19a66',
        comment: '#5c6370',
        function: '#61afef',
        tag: '#e06c75',
        attribute: '#d19a66',
        type: '#e5c07b'
    },
    html: {
        tag: '#e06c75',
        attribute: '#d19a66',
        string: '#98c379',
        comment: '#5c6370'
    },
    css: {
        selector: '#d19a66',
        property: '#56b6c2',
        value: '#98c379',
        comment: '#5c6370',
        function: '#61afef',
        variable: '#e06c75'
    },
    scss: {
        selector: '#d19a66',
        property: '#56b6c2',
        value: '#98c379',
        comment: '#5c6370',
        variable: '#e06c75',
        function: '#61afef',
        keyword: '#c678dd'
    },
    // Backend Languages
    python: {
        keyword: '#ff79c6',
        string: '#f1fa8c',
        number: '#bd93f9',
        comment: '#6272a4',
        function: '#50fa7b',
        operator: '#ff79c6',
        decorator: '#8be9fd',
        className: '#f8f8f2',
        builtin: '#8be9fd'
    },
    java: {
        keyword: '#cc7832',
        string: '#6a8759',
        number: '#6897bb',
        comment: '#808080',
        function: '#ffc66d',
        operator: '#cc7832',
        className: '#a9b7c6',
        type: '#287bde',
        constant: '#9876aa'
    },
    csharp: {
        keyword: '#569cd6',
        string: '#d69d85',
        number: '#b5cea8',
        comment: '#57a64a',
        function: '#dcdcaa',
        operator: '#d4d4d4',
        className: '#4ec9b0',
        type: '#569cd6'
    },
    cpp: {
        keyword: '#569cd6',
        string: '#d69d85',
        number: '#b5cea8',
        comment: '#6a9955',
        function: '#dcdcaa',
        operator: '#d4d4d4',
        type: '#569cd6',
        builtin: '#9cdcfe'
    },
    c: {
        keyword: '#569cd6',
        string: '#d69d85',
        number: '#b5cea8',
        comment: '#6a9955',
        function: '#dcdcaa',
        operator: '#d4d4d4',
        type: '#569cd6',
        builtin: '#9cdcfe'
    },
    go: {
        keyword: '#ff79c6',
        string: '#f1fa8c',
        number: '#bd93f9',
        comment: '#6272a4',
        function: '#50fa7b',
        operator: '#ff79c6',
        type: '#8be9fd',
        builtin: '#8be9fd'
    },
    rust: {
        keyword: '#ff7733',
        string: '#39a849',
        number: '#fd971f',
        comment: '#8c8c8c',
        function: '#69c3ff',
        operator: '#ff7733',
        type: '#39cccc',
        attribute: '#ffd700'
    },
    kotlin: {
        keyword: '#cf6a4c',
        string: '#8f9d6a',
        number: '#cf6a4c',
        comment: '#5f5a60',
        function: '#f9ee98',
        operator: '#cf6a4c',
        className: '#9b859d',
        type: '#cf6a4c'
    },
    swift: {
        keyword: '#fc5fa3',
        string: '#fc6a5d',
        number: '#d0bf69',
        comment: '#6c7986',
        function: '#a167e6',
        operator: '#fc5fa3',
        type: '#5dd8ff',
        attribute: '#bfb7ff'
    },
    // Scripting Languages
    ruby: {
        keyword: '#cc7833',
        string: '#a5c261',
        number: '#a5c261',
        comment: '#bc9458',
        function: '#ffc66d',
        operator: '#cc7833',
        variable: '#d0d0ff',
        constant: '#6d9cbe',
        regex: '#a5c261'
    },
    php: {
        keyword: '#cb7832',
        string: '#6a8759',
        number: '#6897bb',
        comment: '#808080',
        function: '#ffc66d',
        operator: '#a9b7c6',
        variable: '#9876aa',
        tag: '#e8bf6a'
    },
    perl: {
        keyword: '#8b0000',
        string: '#ff00ff',
        number: '#ff00ff',
        comment: '#228b22',
        function: '#0000ff',
        operator: '#8b0000',
        variable: '#00688b',
        regex: '#ff00ff'
    },
    lua: {
        keyword: '#569cd6',
        string: '#ce9178',
        number: '#b5cea8',
        comment: '#6a9955',
        function: '#dcdcaa',
        operator: '#d4d4d4',
        builtin: '#4ec9b0'
    },
    bash: {
        keyword: '#f92672',
        string: '#e6db74',
        number: '#ae81ff',
        comment: '#75715e',
        function: '#a6e22e',
        operator: '#f92672',
        variable: '#fd971f',
        builtin: '#66d9ef'
    },
    powershell: {
        keyword: '#00bff3',
        string: '#ec7600',
        number: '#00d084',
        comment: '#006400',
        function: '#eedd82',
        operator: '#00bff3',
        variable: '#ff4500',
        cmdlet: '#00bff3'
    },
    // Database & Data Languages
    sql: {
        keyword: '#cc7832',
        string: '#6a8759',
        number: '#6897bb',
        comment: '#808080',
        function: '#ffc66d',
        operator: '#a9b7c6',
        type: '#287bde'
    },
    // Functional Languages
    haskell: {
        keyword: '#d73a49',
        string: '#032f62',
        number: '#005cc5',
        comment: '#6a737d',
        function: '#6f42c1',
        operator: '#d73a49',
        type: '#22863a'
    },
    scala: {
        keyword: '#dc322f',
        string: '#2aa198',
        number: '#2aa198',
        comment: '#586e75',
        function: '#b58900',
        operator: '#dc322f',
        type: '#268bd2',
        className: '#268bd2'
    },
    clojure: {
        keyword: '#7f5ab6',
        string: '#418179',
        number: '#4ca',
        comment: '#b0b0b0',
        function: '#467fc4',
        operator: '#7f5ab6',
        builtin: '#30a'
    },
    elixir: {
        keyword: '#a074c4',
        string: '#79b05f',
        number: '#e7824a',
        comment: '#8b8680',
        function: '#e7824a',
        operator: '#a074c4',
        atom: '#678cc8',
        variable: '#6e5346'
    },
    // Data Formats
    json: {
        property: '#e06c75',
        string: '#98c379',
        number: '#d19a66',
        constant: '#56b6c2',
        comment: '#5c6370'
    },
    yaml: {
        keyword: '#e06c75',
        string: '#98c379',
        number: '#d19a66',
        comment: '#5c6370',
        property: '#61afef'
    },
    xml: {
        tag: '#e06c75',
        attribute: '#d19a66',
        string: '#98c379',
        comment: '#5c6370'
    },
    markdown: {
        keyword: '#e06c75',
        string: '#98c379',
        comment: '#5c6370',
        tag: '#61afef'
    },
    // Other Languages
    r: {
        keyword: '#0000ff',
        string: '#008000',
        number: '#a020f0',
        comment: '#808080',
        function: '#ff4500',
        operator: '#696969'
    },
    matlab: {
        keyword: '#0000ff',
        string: '#a020f0',
        number: '#ff00ff',
        comment: '#228b22',
        function: '#ff8c00',
        operator: '#696969'
    },
    dart: {
        keyword: '#00b4ab',
        string: '#87c540',
        number: '#f5ab35',
        comment: '#9a9a9a',
        function: '#f5ab35',
        operator: '#00b4ab',
        className: '#01579b',
        type: '#01579b'
    }
};
// Language keywords for syntax highlighting
exports.LANGUAGE_KEYWORDS = {
    // Web Technologies
    javascript: [
        'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
        'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'super',
        'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally',
        'throw', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false',
        'static', 'get', 'set', 'constructor', 'yield', 'debugger', 'with'
    ],
    typescript: [
        'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
        'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'super',
        'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally',
        'throw', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false',
        'interface', 'type', 'enum', 'namespace', 'module', 'declare', 'as', 'implements',
        'private', 'public', 'protected', 'readonly', 'static', 'abstract', 'override'
    ],
    jsx: [
        'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
        'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'super',
        'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally',
        'throw', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false'
    ],
    tsx: [
        'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
        'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'super',
        'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally',
        'interface', 'type', 'enum', 'namespace', 'as', 'implements', 'private', 'public'
    ],
    css: [
        'important', 'inherit', 'initial', 'unset', 'revert', 'auto', 'none', 'block',
        'inline', 'flex', 'grid', 'absolute', 'relative', 'fixed', 'sticky'
    ],
    scss: [
        '@import', '@include', '@extend', '@mixin', '@function', '@return', '@if', '@else',
        '@for', '@each', '@while', '@at-root', '@content', '@warn', '@error', '@debug'
    ],
    // Backend Languages  
    python: [
        'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from',
        'as', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True',
        'False', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'global',
        'nonlocal', 'assert', 'del', 'async', 'await', 'match', 'case'
    ],
    java: [
        'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
        'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final',
        'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int',
        'interface', 'long', 'native', 'new', 'null', 'package', 'private', 'protected',
        'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized',
        'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'true',
        'false', 'var', 'record', 'sealed', 'permits', 'yield'
    ],
    csharp: [
        'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked',
        'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else',
        'enum', 'event', 'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for',
        'foreach', 'goto', 'if', 'implicit', 'in', 'int', 'interface', 'internal', 'is', 'lock',
        'long', 'namespace', 'new', 'null', 'object', 'operator', 'out', 'override', 'params',
        'private', 'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
        'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw',
        'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using',
        'var', 'virtual', 'void', 'volatile', 'while', 'async', 'await', 'dynamic', 'nameof'
    ],
    cpp: [
        'alignas', 'alignof', 'and', 'and_eq', 'asm', 'auto', 'bitand', 'bitor', 'bool',
        'break', 'case', 'catch', 'char', 'char8_t', 'char16_t', 'char32_t', 'class',
        'compl', 'concept', 'const', 'consteval', 'constexpr', 'constinit', 'const_cast',
        'continue', 'co_await', 'co_return', 'co_yield', 'decltype', 'default', 'delete',
        'do', 'double', 'dynamic_cast', 'else', 'enum', 'explicit', 'export', 'extern',
        'false', 'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long', 'mutable',
        'namespace', 'new', 'noexcept', 'not', 'not_eq', 'nullptr', 'operator', 'or', 'or_eq',
        'private', 'protected', 'public', 'register', 'reinterpret_cast', 'requires', 'return',
        'short', 'signed', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct',
        'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef',
        'typeid', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void', 'volatile',
        'wchar_t', 'while', 'xor', 'xor_eq'
    ],
    c: [
        'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double',
        'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'inline', 'int', 'long',
        'register', 'restrict', 'return', 'short', 'signed', 'sizeof', 'static', 'struct',
        'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while', '_Bool',
        '_Complex', '_Imaginary', '_Alignas', '_Alignof', '_Atomic', '_Static_assert',
        '_Noreturn', '_Thread_local', '_Generic'
    ],
    go: [
        'break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else', 'fallthrough',
        'for', 'func', 'go', 'goto', 'if', 'import', 'interface', 'map', 'package', 'range',
        'return', 'select', 'struct', 'switch', 'type', 'var', 'nil', 'true', 'false', 'iota',
        'make', 'new', 'cap', 'len', 'append', 'copy', 'delete', 'close', 'panic', 'recover'
    ],
    rust: [
        'as', 'async', 'await', 'break', 'const', 'continue', 'crate', 'dyn', 'else', 'enum',
        'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod',
        'move', 'mut', 'pub', 'ref', 'return', 'self', 'Self', 'static', 'struct', 'super',
        'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while', 'abstract', 'become',
        'box', 'do', 'final', 'macro', 'override', 'priv', 'typeof', 'unsized', 'virtual',
        'yield', 'try', 'union'
    ],
    kotlin: [
        'as', 'break', 'class', 'continue', 'do', 'else', 'false', 'for', 'fun', 'if', 'in',
        'interface', 'is', 'null', 'object', 'package', 'return', 'super', 'this', 'throw',
        'true', 'try', 'typealias', 'typeof', 'val', 'var', 'when', 'while', 'by', 'catch',
        'constructor', 'delegate', 'dynamic', 'field', 'file', 'finally', 'get', 'import',
        'init', 'param', 'property', 'receiver', 'set', 'setparam', 'where', 'abstract',
        'annotation', 'companion', 'const', 'crossinline', 'data', 'enum', 'expect', 'external',
        'final', 'infix', 'inline', 'inner', 'internal', 'lateinit', 'noinline', 'open',
        'operator', 'out', 'override', 'private', 'protected', 'public', 'reified', 'sealed',
        'suspend', 'tailrec', 'vararg'
    ],
    swift: [
        'associatedtype', 'class', 'deinit', 'enum', 'extension', 'fileprivate', 'func',
        'import', 'init', 'inout', 'internal', 'let', 'open', 'operator', 'private', 'protocol',
        'public', 'static', 'struct', 'subscript', 'typealias', 'var', 'break', 'case',
        'continue', 'default', 'defer', 'do', 'else', 'fallthrough', 'for', 'guard', 'if',
        'in', 'repeat', 'return', 'switch', 'where', 'while', 'as', 'Any', 'catch', 'false',
        'is', 'nil', 'rethrows', 'super', 'self', 'Self', 'throw', 'throws', 'true', 'try',
        'associativity', 'convenience', 'dynamic', 'didSet', 'final', 'get', 'infix', 'indirect',
        'lazy', 'left', 'mutating', 'none', 'nonmutating', 'optional', 'override', 'postfix',
        'precedence', 'prefix', 'Protocol', 'required', 'right', 'set', 'Type', 'unowned',
        'weak', 'willSet'
    ],
    // Scripting Languages
    ruby: [
        'alias', 'and', 'begin', 'break', 'case', 'class', 'def', 'defined?', 'do', 'else',
        'elsif', 'end', 'ensure', 'false', 'for', 'if', 'in', 'module', 'next', 'nil', 'not',
        'or', 'redo', 'rescue', 'retry', 'return', 'self', 'super', 'then', 'true', 'undef',
        'unless', 'until', 'when', 'while', 'yield', '__FILE__', '__LINE__', 'BEGIN', 'END'
    ],
    php: [
        'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class',
        'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo', 'else',
        'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch',
        'endwhile', 'eval', 'exit', 'extends', 'final', 'finally', 'fn', 'for', 'foreach',
        'function', 'global', 'goto', 'if', 'implements', 'include', 'include_once',
        'instanceof', 'insteadof', 'interface', 'isset', 'list', 'match', 'namespace',
        'new', 'or', 'print', 'private', 'protected', 'public', 'require', 'require_once',
        'return', 'static', 'switch', 'throw', 'trait', 'try', 'unset', 'use', 'var',
        'while', 'xor', 'yield', 'true', 'false', 'null'
    ],
    perl: [
        'if', 'else', 'elsif', 'unless', 'while', 'until', 'for', 'foreach', 'do', 'die',
        'exit', 'return', 'last', 'next', 'redo', 'goto', 'sub', 'package', 'use', 'require',
        'BEGIN', 'END', 'my', 'our', 'local', 'state', 'no', 'not', 'and', 'or', 'xor',
        'continue', 'given', 'when', 'default', 'say', 'undef'
    ],
    lua: [
        'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 'if',
        'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 'true', 'until', 'while'
    ],
    bash: [
        'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'until', 'do', 'done', 'case',
        'esac', 'function', 'return', 'break', 'continue', 'shift', 'exit', 'export', 'unset',
        'readonly', 'declare', 'typeset', 'local', 'echo', 'printf', 'read', 'cd', 'pwd',
        'pushd', 'popd', 'dirs', 'let', 'eval', 'set', 'unset', 'true', 'false', 'test',
        'source', 'alias', 'bg', 'bind', 'builtin', 'caller', 'command', 'compgen', 'complete',
        'compopt', 'continue', 'coproc', 'disown', 'enable', 'exec', 'fc', 'fg', 'getopts',
        'hash', 'help', 'history', 'jobs', 'kill', 'logout', 'mapfile', 'printf', 'read',
        'readarray', 'select', 'shopt', 'suspend', 'time', 'times', 'trap', 'type', 'ulimit',
        'umask', 'wait'
    ],
    powershell: [
        'begin', 'break', 'catch', 'class', 'continue', 'data', 'define', 'do', 'dynamicparam',
        'else', 'elseif', 'end', 'enum', 'exit', 'filter', 'finally', 'for', 'foreach', 'from',
        'function', 'if', 'in', 'inlinescript', 'parallel', 'param', 'process', 'return',
        'sequence', 'switch', 'throw', 'trap', 'try', 'until', 'using', 'var', 'while',
        'workflow', 'and', 'or', 'not', 'xor', 'band', 'bor', 'bnot', 'bxor'
    ],
    // Database Languages
    sql: [
        'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS',
        'ON', 'AS', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'ALTER',
        'DROP', 'TABLE', 'DATABASE', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER',
        'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE', 'NOT', 'NULL', 'DEFAULT',
        'AUTO_INCREMENT', 'AND', 'OR', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'ORDER',
        'BY', 'GROUP', 'HAVING', 'UNION', 'ALL', 'DISTINCT', 'LIMIT', 'OFFSET', 'TOP',
        'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IF', 'BEGIN', 'COMMIT', 'ROLLBACK',
        'TRANSACTION', 'WITH', 'GRANT', 'REVOKE', 'EXEC', 'EXECUTE', 'DECLARE', 'CURSOR',
        'FETCH', 'OPEN', 'CLOSE', 'RETURN', 'THROW', 'TRY', 'CATCH'
    ],
    // Functional Languages
    haskell: [
        'case', 'class', 'data', 'default', 'deriving', 'do', 'else', 'foreign', 'if',
        'import', 'in', 'infix', 'infixl', 'infixr', 'instance', 'let', 'module', 'newtype',
        'of', 'then', 'type', 'where', 'forall', 'mdo', 'family', 'role', 'pattern',
        'static', 'stock', 'anyclass', 'via', 'qualified', 'as', 'hiding'
    ],
    scala: [
        'abstract', 'case', 'catch', 'class', 'def', 'do', 'else', 'extends', 'false',
        'final', 'finally', 'for', 'forSome', 'if', 'implicit', 'import', 'lazy', 'match',
        'new', 'null', 'object', 'override', 'package', 'private', 'protected', 'return',
        'sealed', 'super', 'this', 'throw', 'trait', 'try', 'true', 'type', 'val', 'var',
        'while', 'with', 'yield', 'given', 'using', 'enum', 'then'
    ],
    clojure: [
        'def', 'defn', 'defmacro', 'defmulti', 'defmethod', 'defprotocol', 'defrecord',
        'deftype', 'defstruct', 'let', 'letfn', 'do', 'if', 'when', 'when-not', 'when-let',
        'when-first', 'when-some', 'if-let', 'if-not', 'if-some', 'cond', 'case', 'condp',
        'for', 'doseq', 'dotimes', 'while', 'loop', 'recur', 'throw', 'try', 'catch',
        'finally', 'fn', 'defn-', 'letfn', 'ns', 'in-ns', 'require', 'use', 'import',
        'refer', 'alias', 'resolve', 'quote', 'var', 'binding', 'set!', 'alter-var-root'
    ],
    elixir: [
        'after', 'and', 'case', 'catch', 'cond', 'def', 'defcallback', 'defdelegate',
        'defexception', 'defguard', 'defguardp', 'defimpl', 'defmacro', 'defmacrop',
        'defmodule', 'defoverridable', 'defp', 'defprotocol', 'defstruct', 'do', 'else',
        'end', 'false', 'fn', 'for', 'if', 'import', 'in', 'nil', 'not', 'or', 'quote',
        'raise', 'receive', 'require', 'rescue', 'super', 'then', 'throw', 'true', 'try',
        'unless', 'unquote', 'unquote_splicing', 'use', 'when', 'with', '__MODULE__',
        '__DIR__', '__ENV__', '__CALLER__', '__aliases__', '__block__'
    ],
    // Other Languages
    r: [
        'if', 'else', 'repeat', 'while', 'function', 'for', 'in', 'next', 'break', 'TRUE',
        'FALSE', 'NULL', 'Inf', 'NaN', 'NA', 'NA_integer_', 'NA_real_', 'NA_complex_',
        'NA_character_', 'return', 'invisible', 'stop', 'warning', 'message', 'library',
        'require', 'source', 'install.packages', 'data', 'summary', 'plot', 'print'
    ],
    matlab: [
        'break', 'case', 'catch', 'classdef', 'continue', 'else', 'elseif', 'end', 'for',
        'function', 'global', 'if', 'otherwise', 'parfor', 'persistent', 'return', 'spmd',
        'switch', 'try', 'while', 'methods', 'properties', 'events', 'enumeration',
        'arguments', 'nargin', 'nargout', 'varargin', 'varargout'
    ],
    dart: [
        'abstract', 'as', 'assert', 'async', 'await', 'break', 'case', 'catch', 'class',
        'const', 'continue', 'covariant', 'default', 'deferred', 'do', 'dynamic', 'else',
        'enum', 'export', 'extends', 'extension', 'external', 'factory', 'false', 'final',
        'finally', 'for', 'Function', 'get', 'hide', 'if', 'implements', 'import', 'in',
        'interface', 'is', 'late', 'library', 'mixin', 'new', 'null', 'on', 'operator',
        'part', 'required', 'rethrow', 'return', 'set', 'show', 'static', 'super', 'switch',
        'sync', 'this', 'throw', 'true', 'try', 'typedef', 'var', 'void', 'while', 'with',
        'yield'
    ]
};
// Language aliases (map common variations to canonical names)
exports.LANGUAGE_ALIASES = {
    'js': 'javascript',
    'ts': 'typescript',
    'py': 'python',
    'rb': 'ruby',
    'cs': 'csharp',
    'c++': 'cpp',
    'c#': 'csharp',
    'objective-c': 'objc',
    'objc': 'cpp',
    'sh': 'bash',
    'shell': 'bash',
    'zsh': 'bash',
    'ps': 'powershell',
    'ps1': 'powershell',
    'md': 'markdown',
    'yml': 'yaml',
    'jsonc': 'json',
    'tsx': 'tsx',
    'jsx': 'jsx',
    'scss': 'scss',
    'sass': 'scss',
    'less': 'css',
    'styl': 'css',
    'stylus': 'css',
    'kt': 'kotlin',
    'kts': 'kotlin',
    'gradle': 'kotlin',
    'rs': 'rust',
    'hs': 'haskell',
    'ex': 'elixir',
    'exs': 'elixir',
    'erl': 'erlang',
    'clj': 'clojure',
    'cljs': 'clojure',
    'cljc': 'clojure',
    'r': 'r',
    'm': 'matlab',
    'jl': 'julia',
    'nim': 'nim',
    'cr': 'crystal',
    'pl': 'perl',
    'pm': 'perl'
};
// Get normalized language name
function getNormalizedLanguage(lang) {
    const normalized = lang.toLowerCase().trim();
    return exports.LANGUAGE_ALIASES[normalized] || normalized;
}


/***/ }),

/***/ 169:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addList = addList;
const constants_1 = __webpack_require__(950);
/**
 * Add list element (ordered or unordered)
 */
function addList(slide, element, yPosition, theme) {
    if (!element.items || element.items.length === 0) {
        return yPosition;
    }
    const isOrdered = element.type === 'orderedList';
    const lineHeight = 20;
    // Build the complete list text
    const listTexts = [];
    element.items.forEach((item, index) => {
        const indent = '  '.repeat(item.indent || 0);
        const bullet = isOrdered ? `${index + 1}.` : getBulletSymbol(item.indent || 0);
        listTexts.push(`${indent}${bullet} ${item.text}`);
    });
    // Create a single text box for the entire list
    const fullListText = listTexts.join('\n');
    const totalHeight = element.items.length * lineHeight;
    const textBox = slide.insertTextBox(fullListText, constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, totalHeight);
    const textRange = textBox.getText();
    textRange.getTextStyle().setFontSize(constants_1.DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setForegroundColor(theme.textColor);
    // Style each line's bullet/number
    let charOffset = 0;
    element.items.forEach((item, index) => {
        const indent = '  '.repeat(item.indent || 0);
        const bullet = isOrdered ? `${index + 1}.` : getBulletSymbol(item.indent || 0);
        const bulletLength = indent.length + bullet.length;
        // Style the bullet/number
        if (bulletLength > 0 && charOffset + bulletLength <= textRange.asString().length) {
            const bulletRange = textRange.getRange(charOffset, charOffset + bulletLength);
            bulletRange.getTextStyle().setBold(true);
        }
        // Move to the next line (add 1 for newline character)
        charOffset += indent.length + bullet.length + 1 + item.text.length + 1;
    });
    return yPosition + totalHeight;
}
/**
 * Get appropriate bullet symbol based on indent level
 */
function getBulletSymbol(indent) {
    const bullets = ['•', '◦', '▪', '▫'];
    return bullets[indent % bullets.length];
}


/***/ }),

/***/ 181:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addTable = addTable;
const constants_1 = __webpack_require__(950);
/**
 * Add table element with enhanced styling
 */
function addTable(slide, element, yPosition, theme) {
    if (!element.rows || element.rows.length === 0) {
        return yPosition;
    }
    const numRows = element.rows.length;
    const numCols = element.rows[0].cells.length;
    const cellHeight = 30;
    const tableHeight = numRows * cellHeight;
    const tableWidth = constants_1.CONTENT_WIDTH;
    // Create table
    const table = slide.insertTable(numRows, numCols, constants_1.MARGIN, yPosition, tableWidth, tableHeight);
    // Populate table with styling
    element.rows.forEach((row, rowIdx) => {
        row.cells.forEach((cellText, colIdx) => {
            const cell = table.getCell(rowIdx, colIdx);
            const textRange = cell.getText();
            textRange.setText(cellText || '');
            textRange.getTextStyle().setFontSize(12);
            textRange.getTextStyle().setForegroundColor(theme.textColor);
            // Apply alignment
            if (element.alignments && element.alignments[colIdx]) {
                const alignment = element.alignments[colIdx];
                switch (alignment) {
                    case 'center':
                        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
                        break;
                    case 'right':
                        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
                        break;
                    default:
                        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);
                }
            }
            // Style header row
            if (row.isHeader) {
                cell.getFill().setSolidFill(theme.tableHeaderBg);
                textRange.getTextStyle().setBold(true);
            }
            else if (rowIdx % 2 === 0) {
                // Alternating row colors
                cell.getFill().setSolidFill(theme.tableAltRowBg);
            }
        });
    });
    return yPosition + tableHeight;
}


/***/ }),

/***/ 212:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addImage = addImage;
const constants_1 = __webpack_require__(950);
/**
 * Add image element
 */
function addImage(slide, element, yPosition) {
    if (!element.src) {
        return yPosition;
    }
    try {
        // Default dimensions
        let width = element.width || 400;
        let height = element.height || 300;
        // Ensure image fits within slide boundaries
        const maxWidth = constants_1.SLIDE_WIDTH - (constants_1.MARGIN * 2);
        const maxHeight = constants_1.SLIDE_HEIGHT - yPosition - constants_1.MARGIN;
        if (width > maxWidth) {
            const scale = maxWidth / width;
            width = maxWidth;
            height = height * scale;
        }
        if (height > maxHeight) {
            const scale = maxHeight / height;
            height = maxHeight;
            width = width * scale;
        }
        // Center the image horizontally
        const xPosition = (constants_1.SLIDE_WIDTH - width) / 2;
        // Insert image
        const image = slide.insertImage(element.src, xPosition, yPosition, width, height);
        // Add alt text as title if available
        if (element.alt) {
            image.setTitle(element.alt);
        }
        return yPosition + height;
    }
    catch (error) {
        console.error('Failed to insert image:', error);
        // Return original position if image insertion fails
        return yPosition;
    }
}


/***/ }),

/***/ 336:
/***/ (function(__unused_webpack_module, exports) {


// Parser module - no need to import Theme here
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseMarpMarkdown = parseMarpMarkdown;
/**
 * Parse Marp markdown into structured data
 */
function parseMarpMarkdown(markdown) {
    const result = {
        metadata: {},
        slides: []
    };
    // Handle empty input
    if (!markdown || markdown.trim().length === 0) {
        result.slides.push({ metadata: {}, content: [], notes: '' });
        return result;
    }
    // Normalize line endings
    markdown = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lines = markdown.split('\n');
    let i = 0;
    // Check for frontmatter
    if (lines[0] === '---') {
        const frontmatterLines = [];
        i = 1;
        while (i < lines.length && lines[i] !== '---') {
            frontmatterLines.push(lines[i]);
            i++;
        }
        if (i < lines.length) {
            try {
                result.metadata = parseFrontmatter(frontmatterLines.join('\n'));
            }
            catch (error) {
                console.error('Error parsing frontmatter:', error);
                // Continue with empty metadata
            }
            i++; // Skip closing ---
        }
    }
    // Parse slides
    let currentSlide = null;
    let currentContent = [];
    let speakerNotes = [];
    let inSpeakerNotes = false;
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockContent = [];
    for (; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        // Slide separator
        if (trimmedLine === '---') {
            // Save current slide if exists
            if (currentSlide || currentContent.length > 0) {
                if (!currentSlide) {
                    currentSlide = { metadata: {}, content: [], notes: '' };
                }
                if (currentContent.length > 0) {
                    currentSlide.content = parseSlideContent(currentContent.join('\n'));
                }
                if (speakerNotes.length > 0) {
                    currentSlide.notes = speakerNotes.join('\n').trim();
                }
                result.slides.push(currentSlide);
            }
            // Reset for new slide
            currentSlide = { metadata: {}, content: [], notes: '' };
            currentContent = [];
            speakerNotes = [];
            inSpeakerNotes = false;
            continue;
        }
        // Check for slide directives
        if (trimmedLine.startsWith('<!-- ') && trimmedLine.endsWith(' -->')) {
            const directive = trimmedLine.slice(5, -4).trim();
            if (directive.startsWith('_')) {
                // Local directive for current slide
                const [key, ...valueParts] = directive.slice(1).split(':');
                const value = valueParts.join(':').trim();
                if (!currentSlide) {
                    currentSlide = { metadata: {}, content: [], notes: '' };
                }
                currentSlide.metadata[key] = value;
                continue;
            }
        }
        // Check for speaker notes
        if (trimmedLine.startsWith('<!--') && !trimmedLine.endsWith('-->')) {
            inSpeakerNotes = true;
            speakerNotes.push(trimmedLine.slice(4).trim());
            continue;
        }
        if (inSpeakerNotes) {
            if (trimmedLine.endsWith('-->')) {
                speakerNotes.push(trimmedLine.slice(0, -3).trim());
                inSpeakerNotes = false;
            }
            else {
                speakerNotes.push(line);
            }
            continue;
        }
        // Check for code blocks
        if (trimmedLine.startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockLang = trimmedLine.slice(3).trim();
                codeBlockContent = [];
            }
            else {
                inCodeBlock = false;
                currentContent.push('```' + codeBlockLang);
                currentContent.push(...codeBlockContent);
                currentContent.push('```');
                codeBlockLang = '';
                codeBlockContent = [];
            }
            continue;
        }
        if (inCodeBlock) {
            codeBlockContent.push(line);
        }
        else {
            currentContent.push(line);
        }
    }
    // Don't forget the last slide
    if (currentSlide || currentContent.length > 0) {
        if (!currentSlide) {
            currentSlide = { metadata: {}, content: [], notes: '' };
        }
        if (currentContent.length > 0) {
            currentSlide.content = parseSlideContent(currentContent.join('\n'));
        }
        if (speakerNotes.length > 0) {
            currentSlide.notes = speakerNotes.join('\n').trim();
        }
        result.slides.push(currentSlide);
    }
    return result;
}
/**
 * Parse frontmatter YAML (improved)
 */
function parseFrontmatter(yaml) {
    const metadata = {};
    const lines = yaml.split('\n');
    let currentKey = null;
    let currentValue = [];
    for (const line of lines) {
        // Skip empty lines
        if (!line.trim())
            continue;
        // Check if it's a new key-value pair
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0 && !line.slice(0, colonIndex).includes('"') && !line.slice(0, colonIndex).includes("'")) {
            // Save previous key-value if exists
            if (currentKey) {
                const value = currentValue.join('\n').trim();
                metadata[currentKey] = parseYamlValue(value);
            }
            // Start new key-value
            currentKey = line.slice(0, colonIndex).trim();
            const initialValue = line.slice(colonIndex + 1).trim();
            currentValue = initialValue ? [initialValue] : [];
        }
        else if (currentKey && (line.startsWith('  ') || line.startsWith('\t'))) {
            // Multi-line value
            currentValue.push(line.trim());
        }
    }
    // Don't forget the last key-value
    if (currentKey) {
        const value = currentValue.join('\n').trim();
        metadata[currentKey] = parseYamlValue(value);
    }
    return metadata;
}
/**
 * Parse YAML value (handle booleans, numbers, strings)
 */
function parseYamlValue(value) {
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1);
    }
    // Boolean values
    if (value.toLowerCase() === 'true' || value.toLowerCase() === 'yes')
        return true;
    if (value.toLowerCase() === 'false' || value.toLowerCase() === 'no')
        return false;
    // Numeric values
    if (/^-?\d+$/.test(value))
        return parseInt(value, 10);
    if (/^-?\d+\.\d+$/.test(value))
        return parseFloat(value);
    // Return as string
    return value;
}
/**
 * Parse slide content into structured elements
 */
function parseSlideContent(markdown) {
    const elements = [];
    const lines = markdown.split('\n');
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const trimmedLine = line.trim();
        // Skip empty lines
        if (!trimmedLine) {
            i++;
            continue;
        }
        // Headings
        const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
            elements.push({
                type: 'heading',
                level: headingMatch[1].length,
                text: headingMatch[2]
            });
            i++;
            continue;
        }
        // Horizontal rule
        if (/^[-*_]{3,}$/.test(trimmedLine)) {
            elements.push({ type: 'hr' });
            i++;
            continue;
        }
        // Code block
        if (trimmedLine.startsWith('```')) {
            const lang = trimmedLine.slice(3).trim();
            const codeLines = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            elements.push({
                type: 'code',
                language: lang,
                text: codeLines.join('\n')
            });
            i++;
            continue;
        }
        // Blockquote
        if (trimmedLine.startsWith('>')) {
            const quoteLines = [];
            while (i < lines.length && lines[i].trim().startsWith('>')) {
                quoteLines.push(lines[i].replace(/^>\s?/, ''));
                i++;
            }
            elements.push({
                type: 'blockquote',
                text: quoteLines.join('\n')
            });
            continue;
        }
        // List (unordered or ordered)
        if (/^(\s*)[-*+]\s/.test(line) || /^(\s*)\d+\.\s/.test(line)) {
            const listItems = [];
            const initialIndent = line.search(/\S/);
            const isOrdered = /^\d+\./.test(trimmedLine);
            let blankLineCount = 0;
            while (i < lines.length && blankLineCount <= 1) {
                const currentLine = lines[i];
                const currentTrimmed = currentLine.trim();
                // Count consecutive blank lines
                if (!currentTrimmed) {
                    blankLineCount++;
                    i++;
                    continue;
                }
                // Reset blank line count when we find content
                blankLineCount = 0;
                // Check if it's a list item (ordered or unordered)
                const unorderedMatch = currentLine.match(/^(\s*)[-*+]\s+(.*)$/);
                const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/);
                if (unorderedMatch || orderedMatch) {
                    const indent = unorderedMatch ? unorderedMatch[1].length : orderedMatch[1].length;
                    const text = unorderedMatch ? unorderedMatch[2] : orderedMatch[3];
                    // Calculate relative indent level
                    const indentLevel = Math.floor((indent - initialIndent) / 2);
                    listItems.push({
                        text: text.trim(),
                        indent: Math.max(0, indentLevel)
                    });
                    i++;
                }
                else if (currentLine.startsWith(' ') || currentLine.startsWith('\t')) {
                    // Continuation of previous list item
                    if (listItems.length > 0) {
                        const lastItem = listItems[listItems.length - 1];
                        lastItem.text += '\n' + currentTrimmed;
                    }
                    i++;
                }
                else {
                    // Not a list item, stop processing
                    break;
                }
            }
            if (listItems.length > 0) {
                elements.push({
                    type: isOrdered ? 'orderedList' : 'list',
                    items: listItems
                });
            }
            continue;
        }
        // Table
        if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('|')) {
            const tableData = parseTable(lines, i);
            if (tableData.table) {
                elements.push(tableData.table);
                i = tableData.endIndex;
                continue;
            }
        }
        // Image (with support for various formats and attributes)
        const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)(?:\s*(?:=(\d+)x(\d+)|{([^}]+)}))?/);
        if (imageMatch) {
            const element = {
                type: 'image',
                alt: imageMatch[1] || '',
                src: imageMatch[2].trim()
            };
            // Handle size specification (=WIDTHxHEIGHT)
            if (imageMatch[3] && imageMatch[4]) {
                element.width = parseInt(imageMatch[3]);
                element.height = parseInt(imageMatch[4]);
            }
            // Handle attribute specification ({key=value ...})
            if (imageMatch[5]) {
                const attrs = imageMatch[5].split(/\s+/);
                attrs.forEach(attr => {
                    const [key, value] = attr.split('=');
                    if (key === 'width' && value)
                        element.width = parseInt(value);
                    if (key === 'height' && value)
                        element.height = parseInt(value);
                });
            }
            elements.push(element);
            i++;
            continue;
        }
        // Math block
        if (trimmedLine.startsWith('$$')) {
            const mathLines = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('$$')) {
                mathLines.push(lines[i]);
                i++;
            }
            elements.push({
                type: 'math',
                text: mathLines.join('\n'),
                display: true
            });
            i++;
            continue;
        }
        // Paragraph (default)
        const paragraphLines = [];
        while (i < lines.length && lines[i].trim() &&
            !lines[i].trim().match(/^#{1,6}\s/) &&
            !lines[i].trim().match(/^[-*+]\s/) &&
            !lines[i].trim().match(/^\d+\.\s/) &&
            !lines[i].trim().startsWith('>') &&
            !lines[i].trim().startsWith('```') &&
            !lines[i].includes('|') &&
            !/^[-*_]{3,}$/.test(lines[i].trim())) {
            paragraphLines.push(lines[i]);
            i++;
        }
        if (paragraphLines.length > 0) {
            elements.push({
                type: 'paragraph',
                text: paragraphLines.join('\n')
            });
        }
    }
    return elements;
}
/**
 * Parse table from markdown lines
 */
function parseTable(lines, startIndex) {
    let i = startIndex;
    const rows = [];
    let alignments = [];
    // Check if this is really a table (must have separator row)
    if (i + 1 >= lines.length || !lines[i + 1].includes('|')) {
        return { table: null, endIndex: startIndex + 1 };
    }
    // Validate separator row format
    const separatorRow = lines[i + 1];
    if (!/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(separatorRow)) {
        return { table: null, endIndex: startIndex + 1 };
    }
    // Parse header row
    if (i < lines.length && lines[i].includes('|')) {
        const headerLine = lines[i];
        // Remove leading and trailing pipes if present
        const cleanedHeader = headerLine.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
        const headerCells = cleanedHeader.split('|').map(cell => cell.trim());
        rows.push({ cells: headerCells, isHeader: true });
        i++;
    }
    // Parse separator row (defines alignments)
    if (i < lines.length && lines[i].includes('|')) {
        const cleanedSeparator = lines[i].replace(/^\s*\|/, '').replace(/\|\s*$/, '');
        const separatorCells = cleanedSeparator.split('|');
        alignments = separatorCells.map(cell => {
            const trimmed = cell.trim();
            if (trimmed.startsWith(':') && trimmed.endsWith(':'))
                return 'center';
            if (trimmed.endsWith(':'))
                return 'right';
            return 'left';
        });
        i++;
    }
    // Parse data rows
    while (i < lines.length && lines[i].includes('|')) {
        const dataLine = lines[i];
        // Skip if line is empty or just contains pipes
        if (!/[^|\s]/.test(dataLine)) {
            i++;
            continue;
        }
        const cleanedData = dataLine.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
        const cells = cleanedData.split('|').map(cell => cell.trim());
        // Ensure all rows have the same number of columns
        if (rows.length > 0 && cells.length !== rows[0].cells.length) {
            // Pad or truncate to match header row
            const targetLength = rows[0].cells.length;
            while (cells.length < targetLength)
                cells.push('');
            if (cells.length > targetLength)
                cells.length = targetLength;
        }
        rows.push({ cells: cells, isHeader: false });
        i++;
    }
    if (rows.length > 0) {
        return {
            table: {
                type: 'table',
                rows: rows,
                alignments: alignments
            },
            endIndex: i
        };
    }
    return { table: null, endIndex: startIndex + 1 };
}


/***/ }),

/***/ 359:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addParagraph = addParagraph;
const constants_1 = __webpack_require__(950);
/**
 * Add paragraph with inline formatting
 */
function addParagraph(slide, element, yPosition, theme) {
    const text = element.text || '';
    const lines = text.split('\n');
    const estimatedHeight = lines.length * 20 + 10;
    const textBox = slide.insertTextBox('', constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, estimatedHeight);
    const textRange = textBox.getText();
    // Parse and apply inline formatting
    applyInlineFormatting(textRange, text, theme);
    // Set default style
    textRange.getTextStyle().setFontSize(constants_1.DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setForegroundColor(theme.textColor);
    return yPosition + estimatedHeight;
}
/**
 * Apply inline formatting (bold, italic, code, links)
 */
function applyInlineFormatting(textRange, text, theme) {
    // First, set the plain text
    let plainText = text;
    // Replace formatting markers with plain text
    plainText = plainText.replace(/\*\*([^*]+)\*\*/g, '$1'); // Bold
    plainText = plainText.replace(/\*([^*]+)\*/g, '$1'); // Italic
    plainText = plainText.replace(/_([^_]+)_/g, '$1'); // Italic alt
    plainText = plainText.replace(/`([^`]+)`/g, '$1'); // Inline code
    plainText = plainText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Links
    plainText = plainText.replace(/~~([^~]+)~~/g, '$1'); // Strikethrough
    textRange.setText(plainText);
    // Track position adjustments due to removed formatting characters
    let offset = 0;
    // Apply bold formatting
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let match;
    while ((match = boldRegex.exec(text)) !== null) {
        const start = match.index - offset;
        const length = match[1].length;
        try {
            const range = textRange.getRange(start, start + length);
            range.getTextStyle().setBold(true);
        }
        catch (e) {
            console.error('Bold formatting error:', e);
        }
        offset += 4; // Remove ** **
    }
    // Apply italic formatting
    const italicRegex = /\*([^*]+)\*/g;
    offset = 0;
    while ((match = italicRegex.exec(text)) !== null) {
        if (text.substring(match.index - 1, match.index) !== '*' &&
            text.substring(match.index + match[0].length, match.index + match[0].length + 1) !== '*') {
            const start = match.index - offset;
            const length = match[1].length;
            try {
                const range = textRange.getRange(start, start + length);
                range.getTextStyle().setItalic(true);
            }
            catch (e) {
                console.error('Italic formatting error:', e);
            }
            offset += 2; // Remove * *
        }
    }
    // Apply inline code formatting
    const codeRegex = /`([^`]+)`/g;
    offset = 0;
    while ((match = codeRegex.exec(text)) !== null) {
        const start = match.index - offset;
        const length = match[1].length;
        try {
            const range = textRange.getRange(start, start + length);
            range.getTextStyle().setFontFamily('Courier New');
            range.getTextStyle().setBackgroundColor(constants_1.INLINE_CODE_BACKGROUND);
        }
        catch (e) {
            console.error('Code formatting error:', e);
        }
        offset += 2; // Remove ` `
    }
    // Apply link formatting
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    offset = 0;
    while ((match = linkRegex.exec(text)) !== null) {
        const start = match.index - offset;
        const linkText = match[1];
        // const linkUrl = match[2]; // Not used in GAS version
        const length = linkText.length;
        try {
            const range = textRange.getRange(start, start + length);
            range.getTextStyle().setForegroundColor(theme.linkColor);
            range.getTextStyle().setUnderline(true);
            // Note: setLinkUrl may not be available in all GAS versions
        }
        catch (e) {
            console.error('Link formatting error:', e);
        }
        offset += match[0].length - linkText.length; // Adjust for removed markdown
    }
    // Apply strikethrough formatting
    const strikeRegex = /~~([^~]+)~~/g;
    offset = 0;
    while ((match = strikeRegex.exec(text)) !== null) {
        const start = match.index - offset;
        const length = match[1].length;
        try {
            const range = textRange.getRange(start, start + length);
            range.getTextStyle().setStrikethrough(true);
        }
        catch (e) {
            console.error('Strikethrough formatting error:', e);
        }
        offset += 4; // Remove ~~ ~~
    }
}


/***/ }),

/***/ 388:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSlide = createSlide;
const constants_1 = __webpack_require__(950);
const code_1 = __webpack_require__(836);
const table_1 = __webpack_require__(181);
const list_1 = __webpack_require__(169);
const blockquote_1 = __webpack_require__(746);
const image_1 = __webpack_require__(212);
const math_1 = __webpack_require__(471);
const paragraph_1 = __webpack_require__(359);
/**
 * Create a slide from parsed data
 */
function createSlide(presentation, slideData, index, globalMetadata, theme) {
    const slide = presentation.appendSlide();
    // Apply slide-specific background
    if (slideData.metadata.backgroundColor) {
        slide.getBackground().setSolidFill(slideData.metadata.backgroundColor);
    }
    else {
        slide.getBackground().setSolidFill(theme.backgroundColor);
    }
    // Apply background image if specified
    if (slideData.metadata.backgroundImage) {
        try {
            const imageUrl = slideData.metadata.backgroundImage.replace('url(', '').replace(')', '').trim();
            slide.getBackground().setPictureFill(imageUrl);
        }
        catch (e) {
            console.error('Failed to set background image:', e);
        }
    }
    // Add speaker notes
    if (slideData.notes) {
        slide.getNotesPage().getSpeakerNotesShape().getText().setText(slideData.notes);
    }
    // Layout content elements
    let yPosition = constants_1.MARGIN;
    slideData.content.forEach((element) => {
        yPosition = addElement(slide, element, yPosition, theme) + 15; // Add spacing
    });
    // Add page number if paginate is enabled
    const paginateValue = globalMetadata.paginate;
    if (paginateValue === 'true' || paginateValue === true || paginateValue === 'yes' || paginateValue === 1) {
        addPageNumber(slide, index + 1, theme);
    }
    // Add header/footer if specified
    if (globalMetadata.header) {
        addHeader(slide, globalMetadata.header, theme);
    }
    if (globalMetadata.footer) {
        addFooter(slide, globalMetadata.footer, theme);
    }
}
/**
 * Add element to slide based on type
 */
function addElement(slide, element, yPosition, theme) {
    switch (element.type) {
        case 'heading':
            return addHeading(slide, element, yPosition, theme);
        case 'paragraph':
            return (0, paragraph_1.addParagraph)(slide, element, yPosition, theme);
        case 'list':
        case 'orderedList':
            return (0, list_1.addList)(slide, element, yPosition, theme);
        case 'code':
            return (0, code_1.addCodeBlock)(slide, element, yPosition, theme);
        case 'table':
            return (0, table_1.addTable)(slide, element, yPosition, theme);
        case 'blockquote':
            return (0, blockquote_1.addBlockquote)(slide, element, yPosition, theme);
        case 'image':
            return (0, image_1.addImage)(slide, element, yPosition);
        case 'math':
            return (0, math_1.addMathExpression)(slide, element, yPosition, theme);
        case 'hr':
            return addHorizontalRule(slide, yPosition, theme);
        default:
            console.warn('Unknown element type:', element.type);
            return yPosition;
    }
}
/**
 * Add heading element
 */
function addHeading(slide, element, yPosition, theme) {
    const level = element.level || 1;
    const fontSize = constants_1.HEADING_SIZES[level - 1] || constants_1.DEFAULT_FONT_SIZE;
    const height = fontSize + 10;
    const textBox = slide.insertTextBox(element.text || '', constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, height);
    const textRange = textBox.getText();
    textRange.getTextStyle().setFontSize(fontSize);
    textRange.getTextStyle().setBold(true);
    textRange.getTextStyle().setForegroundColor(theme.headingColor);
    return yPosition + height;
}
/**
 * Add horizontal rule
 */
function addHorizontalRule(slide, yPosition, _theme) {
    const line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, constants_1.MARGIN, yPosition + 10, constants_1.SLIDE_WIDTH - constants_1.MARGIN, yPosition + 10);
    line.setWeight(1);
    // Note: Line color setting may vary based on API version
    return yPosition + 20;
}
/**
 * Add page number
 */
function addPageNumber(slide, pageNumber, theme) {
    const textBox = slide.insertTextBox(pageNumber.toString(), constants_1.SLIDE_WIDTH - 80, constants_1.SLIDE_HEIGHT - 40, 60, 30);
    textBox.getText().getTextStyle().setFontSize(12);
    textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
    textBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
}
/**
 * Add header
 */
function addHeader(slide, headerText, theme) {
    const textBox = slide.insertTextBox(headerText, constants_1.MARGIN, 10, constants_1.CONTENT_WIDTH, 30);
    textBox.getText().getTextStyle().setFontSize(10);
    textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
    textBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
}
/**
 * Add footer
 */
function addFooter(slide, footerText, theme) {
    const textBox = slide.insertTextBox(footerText, constants_1.MARGIN, constants_1.SLIDE_HEIGHT - 35, constants_1.CONTENT_WIDTH, 25);
    textBox.getText().getTextStyle().setFontSize(10);
    textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
    textBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
}


/***/ }),

/***/ 471:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addMathExpression = addMathExpression;
const constants_1 = __webpack_require__(950);
/**
 * Add math expression (basic rendering)
 * Note: Google Slides doesn't have native LaTeX support,
 * so this is a simplified representation
 */
function addMathExpression(slide, element, yPosition, theme) {
    const height = element.display ? 60 : 30;
    const mathText = element.text || '';
    // Create a text box for the math expression
    const textBox = slide.insertTextBox(mathText, constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, height);
    const textRange = textBox.getText();
    textRange.getTextStyle().setFontSize(element.display ? 18 : constants_1.DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setFontFamily('Cambria Math'); // Use math-friendly font
    textRange.getTextStyle().setItalic(true);
    textRange.getTextStyle().setForegroundColor(theme.textColor);
    if (element.display) {
        // Center display math
        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }
    return yPosition + height;
}


/***/ }),

/***/ 746:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addBlockquote = addBlockquote;
const constants_1 = __webpack_require__(950);
/**
 * Add blockquote element with enhanced styling
 */
function addBlockquote(slide, element, yPosition, theme) {
    const text = element.text || '';
    const lines = text.split('\n');
    const height = lines.length * 20 + 20;
    // Create background shape for quote
    const quoteBackground = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, constants_1.MARGIN + 10, yPosition, constants_1.CONTENT_WIDTH - 20, height);
    quoteBackground.getFill().setSolidFill('#f9f9f9');
    quoteBackground.getBorder().setTransparent();
    // Add quote text
    const textBox = slide.insertTextBox('', constants_1.MARGIN + 25, yPosition + 10, constants_1.CONTENT_WIDTH - 35, height - 20);
    const textRange = textBox.getText();
    // Support multi-line blockquotes
    textRange.setText(text);
    textRange.getTextStyle().setFontSize(constants_1.DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setItalic(true);
    textRange.getTextStyle().setForegroundColor(theme.blockquoteColor);
    // Add quote bar
    const quoteLine = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, constants_1.MARGIN + 15, yPosition + 5, constants_1.MARGIN + 15, yPosition + height - 5);
    quoteLine.setWeight(3);
    // Note: Line color setting may vary based on API version
    return yPosition + height;
}


/***/ }),

/***/ 761:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openSidebar = openSidebar;
/**
 * Open the conversion sidebar in Google Slides
 */
function openSidebar() {
    const html = HtmlService.createHtmlOutputFromFile('index')
        .setTitle('gs-mark2slides')
        .setWidth(300);
    SlidesApp.getUi().showSidebar(html);
}


/***/ }),

/***/ 836:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addCodeBlock = addCodeBlock;
const constants_1 = __webpack_require__(950);
const syntax_highlighting_1 = __webpack_require__(149);
/**
 * Add code block with syntax highlighting
 */
function addCodeBlock(slide, element, yPosition, theme) {
    const code = element.text || '';
    const rawLanguage = element.language || '';
    const language = (0, syntax_highlighting_1.getNormalizedLanguage)(rawLanguage);
    const lines = code.split('\n');
    const lineHeight = 16;
    const padding = 15;
    const height = lines.length * lineHeight + padding * 2;
    // Create background shape
    const codeBackground = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, height);
    codeBackground.getFill().setSolidFill(theme.codeBackground);
    codeBackground.getBorder().setTransparent();
    // Add code text with syntax highlighting
    const textBox = slide.insertTextBox('', constants_1.MARGIN + padding, yPosition + padding, constants_1.CONTENT_WIDTH - padding * 2, height - padding * 2);
    const textRange = textBox.getText();
    // Apply syntax highlighting
    if (language && syntax_highlighting_1.SYNTAX_COLORS[language]) {
        const highlightedText = applySyntaxHighlighting(code, language);
        textRange.setText(highlightedText.text);
        // Apply color styles (sort by start position to avoid conflicts)
        const sortedStyles = highlightedText.styles.sort((a, b) => a.start - b.start);
        sortedStyles.forEach(style => {
            try {
                const range = textRange.getRange(style.start, style.end);
                range.getTextStyle().setForegroundColor(style.color);
            }
            catch (e) {
                console.error('Error applying syntax highlighting:', e);
            }
        });
    }
    else {
        textRange.setText(code);
    }
    // Set font style
    textRange.getTextStyle().setFontFamily(constants_1.CODE_FONT);
    textRange.getTextStyle().setFontSize(12);
    if (!language || !syntax_highlighting_1.SYNTAX_COLORS[language]) {
        textRange.getTextStyle().setForegroundColor(theme.codeTextColor);
    }
    return yPosition + height;
}
/**
 * Apply syntax highlighting to code
 */
function applySyntaxHighlighting(code, language) {
    const colors = syntax_highlighting_1.SYNTAX_COLORS[language];
    if (!colors) {
        return { text: code, styles: [] };
    }
    const keywords = syntax_highlighting_1.LANGUAGE_KEYWORDS[language] || [];
    const styles = [];
    const processedRanges = new Set();
    // Helper to check if a range overlaps with already processed ranges
    const isRangeProcessed = (start, end) => {
        for (let i = start; i < end; i++) {
            if (processedRanges.has(i.toString())) {
                return true;
            }
        }
        return false;
    };
    // Helper to mark a range as processed
    const markRangeProcessed = (start, end) => {
        for (let i = start; i < end; i++) {
            processedRanges.add(i.toString());
        }
    };
    let position = 0;
    const lines = code.split('\n');
    lines.forEach((line) => {
        // Skip empty lines
        if (!line.trim()) {
            position += line.length + 1;
            return;
        }
        // Comments (different patterns for different languages)
        let commentIndex = -1;
        if (['javascript', 'typescript', 'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'kotlin', 'swift', 'dart', 'scala'].includes(language)) {
            commentIndex = line.indexOf('//');
            // Also check for /* */ style comments
            const blockCommentStart = line.indexOf('/*');
            if (blockCommentStart !== -1 && (commentIndex === -1 || blockCommentStart < commentIndex)) {
                const blockCommentEnd = line.indexOf('*/', blockCommentStart + 2);
                if (blockCommentEnd !== -1) {
                    styles.push({
                        start: position + blockCommentStart,
                        end: position + blockCommentEnd + 2,
                        color: colors.comment || '#808080'
                    });
                    markRangeProcessed(position + blockCommentStart, position + blockCommentEnd + 2);
                }
            }
        }
        else if (['python', 'ruby', 'perl', 'bash', 'powershell', 'r', 'elixir'].includes(language)) {
            commentIndex = line.indexOf('#');
        }
        else if (language === 'sql') {
            commentIndex = line.indexOf('--');
        }
        else if (['haskell', 'lua'].includes(language)) {
            commentIndex = line.indexOf('--');
        }
        else if (language === 'clojure') {
            commentIndex = line.indexOf(';');
        }
        else if (language === 'matlab') {
            commentIndex = line.indexOf('%');
        }
        if (commentIndex !== -1 && !isRangeProcessed(position + commentIndex, position + line.length)) {
            styles.push({
                start: position + commentIndex,
                end: position + line.length,
                color: colors.comment || '#808080'
            });
            markRangeProcessed(position + commentIndex, position + line.length);
        }
        // Strings (with different quote styles for different languages)
        const stringPatterns = [];
        if (['javascript', 'typescript', 'python', 'ruby', 'php', 'go', 'rust', 'kotlin', 'swift', 'dart'].includes(language)) {
            // Single and double quotes, with template literals for JS/TS
            stringPatterns.push(/(['"])(?:(?=(\\?))\2.)*?\1/g);
            if (['javascript', 'typescript'].includes(language)) {
                stringPatterns.push(/`(?:[^`\\]|\\.)*`/g); // Template literals
            }
            if (['python', 'ruby'].includes(language)) {
                stringPatterns.push(/'''[\s\S]*?'''/g); // Triple quotes
                stringPatterns.push(/"""[\s\S]*?"""/g);
            }
        }
        else if (['java', 'csharp', 'cpp', 'c'].includes(language)) {
            stringPatterns.push(/"(?:[^"\\]|\\.)*"/g); // Double quotes only
            stringPatterns.push(/'(?:[^'\\]|\\.)*'/g); // Character literals
        }
        stringPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                if (!isRangeProcessed(position + match.index, position + match.index + match[0].length)) {
                    styles.push({
                        start: position + match.index,
                        end: position + match.index + match[0].length,
                        color: colors.string || '#008000'
                    });
                    markRangeProcessed(position + match.index, position + match.index + match[0].length);
                }
            }
        });
        // Numbers (including hex, binary, scientific notation)
        const numberPatterns = [
            /\b0x[0-9a-fA-F]+\b/g, // Hex
            /\b0b[01]+\b/g, // Binary
            /\b\d+\.?\d*([eE][+-]?\d+)?\b/g // Decimal and scientific
        ];
        numberPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(line)) !== null) {
                if (!isRangeProcessed(position + match.index, position + match.index + match[0].length)) {
                    styles.push({
                        start: position + match.index,
                        end: position + match.index + match[0].length,
                        color: colors.number || '#ff0000'
                    });
                    markRangeProcessed(position + match.index, position + match.index + match[0].length);
                }
            }
        });
        // Keywords
        keywords.forEach(keyword => {
            // Escape special regex characters in keywords
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'g');
            let match;
            while ((match = regex.exec(line)) !== null) {
                if (!isRangeProcessed(position + match.index, position + match.index + keyword.length)) {
                    styles.push({
                        start: position + match.index,
                        end: position + match.index + keyword.length,
                        color: colors.keyword || '#0000ff'
                    });
                    markRangeProcessed(position + match.index, position + match.index + keyword.length);
                }
            }
        });
        // Language-specific patterns
        if (language === 'css' || language === 'scss') {
            // CSS selectors
            const selectorMatch = line.match(/^([^{]+)\s*{/);
            if (selectorMatch && !isRangeProcessed(position, position + selectorMatch[1].length)) {
                styles.push({
                    start: position,
                    end: position + selectorMatch[1].length,
                    color: colors.selector || '#d19a66'
                });
            }
            // CSS properties
            const propertyMatch = line.match(/^\s*([a-zA-Z-]+)\s*:/);
            if (propertyMatch && !isRangeProcessed(position + line.indexOf(propertyMatch[1]), position + line.indexOf(propertyMatch[1]) + propertyMatch[1].length)) {
                const propStart = position + line.indexOf(propertyMatch[1]);
                styles.push({
                    start: propStart,
                    end: propStart + propertyMatch[1].length,
                    color: colors.property || '#56b6c2'
                });
            }
        }
        if (language === 'html' || language === 'xml') {
            // HTML/XML tags
            const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9-]*)/g;
            let match;
            while ((match = tagRegex.exec(line)) !== null) {
                if (!isRangeProcessed(position + match.index, position + match.index + match[0].length)) {
                    styles.push({
                        start: position + match.index,
                        end: position + match.index + match[0].length,
                        color: colors.tag || '#e06c75'
                    });
                }
            }
            // Attributes
            const attrRegex = /\s([a-zA-Z-]+)=/g;
            while ((match = attrRegex.exec(line)) !== null) {
                const attrStart = position + match.index + 1; // +1 for the space
                if (!isRangeProcessed(attrStart, attrStart + match[1].length)) {
                    styles.push({
                        start: attrStart,
                        end: attrStart + match[1].length,
                        color: colors.attribute || '#d19a66'
                    });
                }
            }
        }
        position += line.length + 1; // +1 for newline
    });
    // Remove overlapping styles (keep the first one)
    const finalStyles = [];
    const sortedStyles = styles.sort((a, b) => a.start - b.start);
    sortedStyles.forEach(style => {
        const overlaps = finalStyles.some(existing => (style.start >= existing.start && style.start < existing.end) ||
            (style.end > existing.start && style.end <= existing.end));
        if (!overlaps) {
            finalStyles.push(style);
        }
    });
    return { text: code, styles: finalStyles };
}


/***/ }),

/***/ 950:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.THEMES = exports.INLINE_CODE_BACKGROUND = exports.CODE_BACKGROUND = exports.CODE_FONT = exports.HEADING_SIZES = exports.DEFAULT_FONT_SIZE = exports.CONTENT_WIDTH = exports.MARGIN = exports.SLIDE_HEIGHT = exports.SLIDE_WIDTH = void 0;
// Constants for layout and styling
exports.SLIDE_WIDTH = 720;
exports.SLIDE_HEIGHT = 540;
exports.MARGIN = 50;
exports.CONTENT_WIDTH = exports.SLIDE_WIDTH - (exports.MARGIN * 2);
exports.DEFAULT_FONT_SIZE = 14;
exports.HEADING_SIZES = [32, 28, 24, 20, 18, 16];
exports.CODE_FONT = 'Courier New';
exports.CODE_BACKGROUND = '#f5f5f5';
exports.INLINE_CODE_BACKGROUND = '#e8e8e8';
exports.THEMES = {
    default: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        headingColor: '#000000',
        codeBackground: '#f5f5f5',
        codeTextColor: '#333333',
        linkColor: '#0066cc',
        blockquoteColor: '#666666',
        tableHeaderBg: '#f0f0f0',
        tableAltRowBg: '#f9f9f9'
    },
    dark: {
        backgroundColor: '#1e1e1e',
        textColor: '#e0e0e0',
        headingColor: '#ffffff',
        codeBackground: '#2d2d2d',
        codeTextColor: '#f8f8f2',
        linkColor: '#66d9ef',
        blockquoteColor: '#999999',
        tableHeaderBg: '#333333',
        tableAltRowBg: '#2a2a2a'
    },
    light: {
        backgroundColor: '#fafafa',
        textColor: '#444444',
        headingColor: '#222222',
        codeBackground: '#f0f0f0',
        codeTextColor: '#444444',
        linkColor: '#0080ff',
        blockquoteColor: '#777777',
        tableHeaderBg: '#e0e0e0',
        tableAltRowBg: '#f5f5f5'
    }
};


/***/ }),

/***/ 991:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertMarpToSlides = convertMarpToSlides;
const parser_1 = __webpack_require__(336);
const constants_1 = __webpack_require__(950);
const slide_builder_1 = __webpack_require__(388);
/**
 * Main conversion function called from the web interface
 */
function convertMarpToSlides(markdown, customTitle) {
    console.log('convertMarpToSlides called with markdown length:', markdown.length, 'customTitle:', customTitle);
    try {
        // Parse the Marp markdown
        console.log('Parsing markdown...');
        const parsedData = (0, parser_1.parseMarpMarkdown)(markdown);
        console.log('Parsed data:', JSON.stringify({
            metadata: parsedData.metadata,
            slideCount: parsedData.slides.length
        }));
        // Use custom title if provided, otherwise use metadata title or default
        const presentationTitle = customTitle || parsedData.metadata.title || 'Converted from Marp';
        console.log('Presentation title:', presentationTitle);
        // Create a new presentation
        console.log('Creating presentation...');
        const presentation = SlidesApp.create(presentationTitle);
        const presentationId = presentation.getId();
        console.log('Created presentation with ID:', presentationId);
        // Remove the default slide
        const slides = presentation.getSlides();
        console.log('Initial slide count:', slides.length);
        if (slides.length > 0) {
            slides[0].remove();
            console.log('Removed default slide');
        }
        // Apply theme
        const themeName = parsedData.metadata.theme || 'default';
        const theme = constants_1.THEMES[themeName] || constants_1.THEMES.default;
        console.log('Using theme:', themeName);
        // Add slides from parsed data
        console.log('Adding slides...');
        parsedData.slides.forEach((slideData, index) => {
            console.log(`Creating slide ${index + 1}/${parsedData.slides.length}`);
            (0, slide_builder_1.createSlide)(presentation, slideData, index, parsedData.metadata, theme);
        });
        const finalSlideCount = presentation.getSlides().length;
        console.log('Final slide count:', finalSlideCount);
        const result = {
            success: true,
            presentationId: presentationId,
            url: presentation.getUrl(),
            slideCount: finalSlideCount,
            title: presentationTitle
        };
        console.log('Conversion successful:', JSON.stringify(result));
        return result;
    }
    catch (error) {
        console.error('Conversion error:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
!function() {
var exports = __webpack_exports__;

// Entry point for Google Apps Script
// This file will be compiled to Code.gs
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openSidebar = exports.convertMarpToSlides = exports.doGet = void 0;
exports.testFunction = testFunction;
const webapp_1 = __webpack_require__(42);
Object.defineProperty(exports, "doGet", ({ enumerable: true, get: function () { return webapp_1.doGet; } }));
const converter_1 = __webpack_require__(991);
Object.defineProperty(exports, "convertMarpToSlides", ({ enumerable: true, get: function () { return converter_1.convertMarpToSlides; } }));
const ui_1 = __webpack_require__(761);
Object.defineProperty(exports, "openSidebar", ({ enumerable: true, get: function () { return ui_1.openSidebar; } }));
// Test function
function testFunction() {
    console.log("Test function called");
    return { success: true, message: "Test successful" };
}
if (typeof __webpack_require__.g !== 'undefined') {
    __webpack_require__.g.doGet = webapp_1.doGet;
    __webpack_require__.g.convertMarpToSlides = converter_1.convertMarpToSlides;
    __webpack_require__.g.openSidebar = ui_1.openSidebar;
    __webpack_require__.g.testFunction = testFunction;
}

}();
GASExports = __webpack_exports__;
/******/ })()
;
// Make functions available to Google Apps Script
function doGet() {
  return GASExports.doGet();
}

function convertMarpToSlides(markdownContent, presentationTitle) {
  return GASExports.convertMarpToSlides(markdownContent, presentationTitle);
}

function openSidebar() {
  return GASExports.openSidebar();
}

function testFunction() {
  return GASExports.testFunction();
}