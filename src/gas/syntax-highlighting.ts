// Syntax highlighting color schemes
export interface SyntaxColors {
  keyword?: string;
  string?: string;
  number?: string;
  comment?: string;
  function?: string;
  operator?: string;
  tag?: string;
  attribute?: string;
  selector?: string;
  property?: string;
  value?: string;
  type?: string;
  builtin?: string;
  constant?: string;
  variable?: string;
  className?: string;
  decorator?: string;
  regex?: string;
  cmdlet?: string;
  atom?: string;
}

export const SYNTAX_COLORS: Record<string, SyntaxColors> = {
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
export const LANGUAGE_KEYWORDS: Record<string, string[]> = {
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
export const LANGUAGE_ALIASES: Record<string, string> = {
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
export function getNormalizedLanguage(lang: string): string {
  const normalized = lang.toLowerCase().trim();
  return LANGUAGE_ALIASES[normalized] || normalized;
}