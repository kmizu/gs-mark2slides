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
}

export const SYNTAX_COLORS: Record<string, SyntaxColors> = {
  javascript: {
    keyword: '#c678dd',
    string: '#98c379',
    number: '#d19a66',
    comment: '#5c6370',
    function: '#61afef',
    operator: '#56b6c2'
  },
  python: {
    keyword: '#ff79c6',
    string: '#f1fa8c',
    number: '#bd93f9',
    comment: '#6272a4',
    function: '#50fa7b',
    operator: '#ff79c6'
  },
  java: {
    keyword: '#cc7832',
    string: '#6a8759',
    number: '#6897bb',
    comment: '#808080',
    function: '#ffc66d',
    operator: '#cc7832'
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
    comment: '#5c6370'
  },
  sql: {
    keyword: '#c678dd',
    string: '#98c379',
    number: '#d19a66',
    comment: '#5c6370',
    function: '#61afef'
  }
};

// Language keywords for syntax highlighting
export const LANGUAGE_KEYWORDS: Record<string, string[]> = {
  javascript: [
    'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'super',
    'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally',
    'throw', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false'
  ],
  python: [
    'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from',
    'as', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True',
    'False', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'global',
    'nonlocal', 'assert', 'del'
  ],
  java: [
    'public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends',
    'implements', 'void', 'int', 'long', 'double', 'float', 'boolean', 'char', 'byte',
    'short', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break',
    'continue', 'return', 'new', 'this', 'super', 'try', 'catch', 'finally', 'throw',
    'throws', 'import', 'package', 'null', 'true', 'false'
  ],
  sql: [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AS',
    'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER',
    'DROP', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'AND', 'OR', 'NOT',
    'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'ORDER', 'BY', 'GROUP', 'HAVING',
    'UNION', 'ALL', 'DISTINCT', 'LIMIT', 'OFFSET'
  ]
};