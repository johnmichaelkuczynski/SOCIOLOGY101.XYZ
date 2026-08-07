import React, { useState } from "react";

export interface MathKey {
  label: string;
  insert: string;
  cursorBack?: number;
  title?: string;
}

// ── Math symbols (CS-1 relevant) ───────────────────────────────────────────
const MATH_KEYS: MathKey[] = [
  // Arithmetic
  { label: "+", insert: "+" },
  { label: "−", insert: "−", title: "minus" },
  { label: "×", insert: "×", title: "multiply" },
  { label: "÷", insert: "÷", title: "divide" },
  { label: "=", insert: "=" },
  { label: "≠", insert: "≠", title: "not equal" },
  { label: "≤", insert: "≤", title: "less than or equal" },
  { label: "≥", insert: "≥", title: "greater than or equal" },
  { label: "<", insert: "<", title: "less than" },
  { label: ">", insert: ">", title: "greater than" },
  { label: "≈", insert: "≈", title: "approximately" },
  // Powers / roots
  { label: "x²", insert: "²", title: "squared" },
  { label: "x³", insert: "³", title: "cubed" },
  { label: "xⁿ", insert: "^n", title: "to the nth power" },
  { label: "√", insert: "√", title: "square root" },
  { label: "log", insert: "log", title: "logarithm" },
  { label: "log₂", insert: "log₂", title: "log base 2" },
  // Numbers / constants
  { label: "π", insert: "π", title: "pi" },
  { label: "∞", insert: "∞", title: "infinity" },
  { label: "½", insert: "½" },
  // Grouping
  { label: "( )", insert: "()", cursorBack: 1, title: "parentheses" },
  { label: "[ ]", insert: "[]", cursorBack: 1, title: "brackets" },
  // Logic / sets
  { label: "∧", insert: "∧", title: "logical AND" },
  { label: "∨", insert: "∨", title: "logical OR" },
  { label: "¬", insert: "¬", title: "logical NOT" },
  { label: "∈", insert: "∈", title: "element of" },
  { label: "∉", insert: "∉", title: "not element of" },
  { label: "∀", insert: "∀", title: "for all" },
  { label: "∃", insert: "∃", title: "there exists" },
  // Sequences / sums
  { label: "Σ", insert: "Σ", title: "sum" },
  { label: "Π", insert: "Π", title: "product" },
  { label: "…", insert: "…", title: "ellipsis (and so on)" },
  { label: "O(n)", insert: "O(n)", title: "big-O notation" },
];

// ── Symbols / notation keyboard ────────────────────────────────────────────
// Every symbol and short token a student may need to type in assignments.
const CODE_KEYS: MathKey[] = [
  // ── Grouping / delimiters ────────────────────────────────────────────────
  { label: "(", insert: "(", title: "left parenthesis" },
  { label: ")", insert: ")", title: "right parenthesis" },
  { label: "( )", insert: "()", cursorBack: 1, title: "empty parentheses" },
  { label: "[", insert: "[", title: "left bracket (list literal / index)" },
  { label: "]", insert: "]", title: "right bracket" },
  { label: "[ ]", insert: "[]", cursorBack: 1, title: "empty list" },
  { label: "{", insert: "{", title: "left brace (dict / set)" },
  { label: "}", insert: "}", title: "right brace" },
  { label: "{ }", insert: "{}", cursorBack: 1, title: "empty dict / set" },
  { label: "\"\"", insert: '""', cursorBack: 1, title: "double-quoted string" },
  { label: "''", insert: "''", cursorBack: 1, title: "single-quoted string" },
  { label: 'f""', insert: 'f""', cursorBack: 1, title: "f-string (formatted string literal)" },
  { label: "\"\"\"\"\"\"", insert: '""""""', cursorBack: 3, title: "triple-quoted string / docstring" },
  // ── Assignment operators ──────────────────────────────────────────────────
  { label: "=", insert: " = ", title: "assignment" },
  { label: "+=", insert: " += ", title: "increment and assign" },
  { label: "-=", insert: " -= ", title: "decrement and assign" },
  { label: "*=", insert: " *= ", title: "multiply and assign" },
  { label: "/=", insert: " /= ", title: "divide and assign" },
  { label: "//=", insert: " //= ", title: "floor-divide and assign" },
  { label: "%=", insert: " %= ", title: "modulo and assign" },
  { label: "**=", insert: " **= ", title: "exponentiate and assign" },
  // ── Arithmetic operators ──────────────────────────────────────────────────
  { label: "+", insert: "+", title: "addition / string concat" },
  { label: "-", insert: "-", title: "subtraction / negation" },
  { label: "*", insert: "*", title: "multiplication / repetition" },
  { label: "/", insert: "/", title: "true division" },
  { label: "//", insert: "//", title: "floor division (integer result)" },
  { label: "**", insert: "**", title: "exponentiation (x**2 = x squared)" },
  { label: "%", insert: "%", title: "modulo (remainder)" },
  // ── Comparison operators ──────────────────────────────────────────────────
  { label: "==", insert: " == ", title: "equality test" },
  { label: "!=", insert: " != ", title: "not equal" },
  { label: "<", insert: " < ", title: "less than" },
  { label: ">", insert: " > ", title: "greater than" },
  { label: "<=", insert: " <= ", title: "less than or equal" },
  { label: ">=", insert: " >= ", title: "greater than or equal" },
  // ── Boolean / membership operators ───────────────────────────────────────
  { label: "and", insert: " and ", title: "logical AND" },
  { label: "or", insert: " or ", title: "logical OR" },
  { label: "not", insert: "not ", title: "logical NOT" },
  { label: "in", insert: " in ", title: "membership test" },
  { label: "not in", insert: " not in ", title: "non-membership test" },
  { label: "is", insert: " is ", title: "identity test" },
  { label: "is not", insert: " is not ", title: "non-identity test" },
  // ── Punctuation ───────────────────────────────────────────────────────────
  { label: ":", insert: ":", title: "colon (ends if/for/while/def header)" },
  { label: ",", insert: ", ", title: "comma (separator)" },
  { label: ".", insert: ".", title: "dot (attribute access / method call)" },
  { label: "#", insert: "# ", title: "comment" },
  { label: "_", insert: "_", title: "underscore (variable name / ignored value)" },
  { label: "\\", insert: "\\", title: "backslash (line continuation / escape)" },
  { label: "\\n", insert: "\\n", title: "newline escape in a string" },
  { label: "\\t", insert: "\\t", title: "tab escape in a string" },
  // ── Digits ────────────────────────────────────────────────────────────────
  { label: "0", insert: "0" }, { label: "1", insert: "1" },
  { label: "2", insert: "2" }, { label: "3", insert: "3" },
  { label: "4", insert: "4" }, { label: "5", insert: "5" },
  { label: "6", insert: "6" }, { label: "7", insert: "7" },
  { label: "8", insert: "8" }, { label: "9", insert: "9" },
  // ── Control-flow keywords ─────────────────────────────────────────────────
  { label: "if", insert: "if ", title: "if statement" },
  { label: "elif", insert: "elif ", title: "else-if branch" },
  { label: "else:", insert: "else:", title: "else branch" },
  { label: "while", insert: "while ", title: "while loop" },
  { label: "for", insert: "for ", title: "for loop" },
  { label: "break", insert: "break", title: "break out of loop" },
  { label: "continue", insert: "continue", title: "skip to next iteration" },
  { label: "pass", insert: "pass", title: "no-op placeholder" },
  { label: "return", insert: "return ", title: "return from function" },
  // ── Definition / import ───────────────────────────────────────────────────
  { label: "def", insert: "def ", title: "define a function" },
  { label: "class", insert: "class ", title: "define a class" },
  { label: "import", insert: "import ", title: "import a module" },
  { label: "from", insert: "from ", title: "from ... import ..." },
  { label: "as", insert: " as ", title: "alias (import ... as ...)" },
  // ── Exception handling ────────────────────────────────────────────────────
  { label: "try:", insert: "try:", title: "try block" },
  { label: "except", insert: "except ", title: "except clause" },
  { label: "finally:", insert: "finally:", title: "finally clause" },
  { label: "raise", insert: "raise ", title: "raise an exception" },
  { label: "with", insert: "with ", title: "context manager" },
  // ── Built-in constants ────────────────────────────────────────────────────
  { label: "True", insert: "True", title: "boolean True" },
  { label: "False", insert: "False", title: "boolean False" },
  { label: "None", insert: "None", title: "None (null value)" },
  // ── Built-in functions ────────────────────────────────────────────────────
  { label: "print()", insert: "print()", cursorBack: 1, title: "print to console" },
  { label: "input()", insert: "input()", cursorBack: 1, title: "read user input (returns string)" },
  { label: "int()", insert: "int()", cursorBack: 1, title: "convert to integer" },
  { label: "float()", insert: "float()", cursorBack: 1, title: "convert to float" },
  { label: "str()", insert: "str()", cursorBack: 1, title: "convert to string" },
  { label: "bool()", insert: "bool()", cursorBack: 1, title: "convert to boolean" },
  { label: "len()", insert: "len()", cursorBack: 1, title: "length of sequence / collection" },
  { label: "range()", insert: "range()", cursorBack: 1, title: "generate a range of integers" },
  { label: "list()", insert: "list()", cursorBack: 1, title: "convert to list" },
  { label: "dict()", insert: "dict()", cursorBack: 1, title: "create a dictionary" },
  { label: "tuple()", insert: "tuple()", cursorBack: 1, title: "convert to tuple" },
  { label: "set()", insert: "set()", cursorBack: 1, title: "create a set" },
  { label: "type()", insert: "type()", cursorBack: 1, title: "get type of a value" },
  { label: "abs()", insert: "abs()", cursorBack: 1, title: "absolute value" },
  { label: "max()", insert: "max()", cursorBack: 1, title: "maximum value" },
  { label: "min()", insert: "min()", cursorBack: 1, title: "minimum value" },
  { label: "sum()", insert: "sum()", cursorBack: 1, title: "sum of iterable" },
  { label: "sorted()", insert: "sorted()", cursorBack: 1, title: "return sorted list" },
  { label: "enumerate()", insert: "enumerate()", cursorBack: 1, title: "iterate with index" },
  { label: "zip()", insert: "zip()", cursorBack: 1, title: "iterate over multiple sequences" },
  { label: "open()", insert: 'open("", "r")', cursorBack: 5, title: 'open a file: open("filename", mode)' },
  { label: "round()", insert: "round()", cursorBack: 1, title: "round to nearest integer / decimal" },
];

type TabId = "math" | "code";

interface MathKeyboardProps {
  onInsert: (text: string, cursorBack?: number) => void;
  /** Provide custom keys to replace the default set (legacy prop). */
  keys?: MathKey[];
  className?: string;
}

/**
 * A two-tab symbol palette: Math (common mathematical notation) and
 * Symbols (additional operators, tokens, and notation). Buttons use
 * onMouseDown + preventDefault so the associated textarea keeps focus
 * and its caret position when a symbol is inserted.
 */
export function MathKeyboard({ onInsert, keys, className }: MathKeyboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("math");

  // Legacy path: if custom keys were explicitly supplied, render a single flat row
  const customKeys = keys && keys !== MATH_KEYS ? keys : null;
  if (customKeys) {
    return <KeyRow keys={customKeys} onInsert={onInsert} className={className} />;
  }

  const activeKeys = activeTab === "math" ? MATH_KEYS : CODE_KEYS;

  return (
    <div className={`flex flex-col gap-0 ${className || ""}`}>
      {/* Tab bar */}
      <div className="flex gap-1" role="tablist" aria-label="Keyboard type">
        {(["math", "code"] as TabId[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onMouseDown={(e) => {
              e.preventDefault();
              setActiveTab(tab);
            }}
            className={`px-3 h-7 text-xs font-semibold rounded-t-md border border-b-0 transition-colors select-none ${
              activeTab === tab
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {tab === "math" ? "Math" : "Symbols"}
          </button>
        ))}
      </div>

      {/* Key grid */}
      <div
        className="flex flex-wrap gap-1 p-1.5 rounded-b-md rounded-tr-md border border-input bg-muted/30"
        role="group"
        aria-label={activeTab === "math" ? "Math symbol keyboard" : "Symbol keyboard"}
        data-testid="math-keyboard"
      >
        {activeKeys.map((k) => (
          <button
            key={k.label + k.insert}
            type="button"
            title={k.title || k.label}
            aria-label={k.title || k.label}
            onMouseDown={(e) => {
              e.preventDefault();
              onInsert(k.insert, k.cursorBack);
            }}
            className="min-w-[2.25rem] h-8 px-2 flex items-center justify-center rounded-md border border-input bg-card text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors select-none"
          >
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Internal: flat single-row of keys for legacy custom-key call-sites. */
function KeyRow({
  keys,
  onInsert,
  className,
}: {
  keys: MathKey[];
  onInsert: (t: string, cb?: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap gap-1 ${className || ""}`}
      role="group"
      aria-label="Symbol keyboard"
      data-testid="math-keyboard"
    >
      {keys.map((k) => (
        <button
          key={k.label + k.insert}
          type="button"
          title={k.title || k.label}
          aria-label={k.title || k.label}
          onMouseDown={(e) => {
            e.preventDefault();
            onInsert(k.insert, k.cursorBack);
          }}
          className="min-w-[2.25rem] h-9 px-2 flex items-center justify-center rounded-md border border-input bg-card text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors select-none"
        >
          {k.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Splices `text` into a textarea at the current caret/selection and returns the
 * resulting value together with the caret position that should follow.
 */
export function insertAtTextareaCursor(
  el: HTMLTextAreaElement,
  text: string,
  cursorBack = 0,
): { value: string; cursor: number } {
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  const value = el.value.slice(0, start) + text + el.value.slice(end);
  const cursor = start + text.length - cursorBack;
  return { value, cursor };
}
