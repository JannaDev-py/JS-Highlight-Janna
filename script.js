const keywords = [
    "abstract", "arguments", "await", "boolean", "break", "byte", "case", 
    "catch", "char", "class", "const", "continue", "debugger", "default", 
    "delete", "do", "double", "else", "enum", "eval", "export", "extends", 
    "false", "final", "finally", "float", "for", "function", "goto", "if", 
    "implements", "import", "in", "instanceof", "int", "interface", "let", 
    "long", "native", "new", "null", "package", "private", "protected", 
    "public", "return", "short", "static", "super", "switch", "synchronized", 
    "this", "throw", "throws", "transient", "true", "try", "typeof", "var", 
    "void", "volatile", "while", "with", "yield", "constructor", "Array", 
    "Date", "eval", "function", "hasOwnProperty", "Infinity", "isFinite", 
    "isNaN", "isPrototypeOf", "length", "Math", "NaN", "Number", 
    "Object", "prototype", "String", "toString", "undefined", "valueOf"
];


document.addEventListener("DOMContentLoaded", function() {
    const code = document.querySelectorAll(".code"); //make an node list for all the code elements
    const symbolRegex = /(?<!<[^>]*)[;=+\-{}\[\]\(\)$]/g;   
    const stringRegex = /(?<!<[^>]*)["'`](.*?)["'`]/g;
    const commentRegex = /\/\/.*/g;


    if(code){
        code.forEach(async function(el){
            //get all codes and highlight them
            const keywordHTMLCodeHighlight = keywordHighlight(el);
            const methodHTMLCodeHighlight = methodHighlight(keywordHTMLCodeHighlight);
            const symbolHTMLCodeHighlight = simpleHighlight(methodHTMLCodeHighlight, symbolRegex, "symbol");
            const commentHTMLCodeHighlight = simpleHighlight(symbolHTMLCodeHighlight, commentRegex, "comment");
            el.innerHTML = commentHTMLCodeHighlight; 
            
            const stringHTMLCodeHighlight = simpleHighlight(symbolHTMLCodeHighlight, stringRegex, "string");

        })
    }
});

//make functions that highlight the code by sections, per can search for the changes on each section
function keywordHighlight(code){
    let codeHTML = code.innerHTML;
    for(const keyword of keywords){
        const regexKeyword = new RegExp(`(?<!\\{)\\b${keyword}\\b`, "g");
        if(codeHTML.includes(keyword)){
            codeHTML = codeHTML.replace(regexKeyword, `<span class="highlight-keyword">${keyword}</span>`);
        }
    }

    return codeHTML;
}

function methodHighlight(code){
    const methodRegex = /\w+\.\w+\(/g; //returns "console.log("
    const matchMethod = code.match(methodRegex);
    let codeHTML = code;

        if(matchMethod){
            for(const matchMethodsArray of matchMethod){
                const matchMethodWithoutParenthesis = matchMethodsArray.replace(/[(]/g, ""); //take off parenthesis
                const matchMethodSecondWord = matchMethodWithoutParenthesis.split(".")[1];
                const dinamicMethodRegex = new RegExp(`\\b${matchMethodSecondWord}\\b`, "g");
                codeHTML = codeHTML.replace(dinamicMethodRegex, `<span class="highlight-method">${matchMethodSecondWord}</span>`);
            }
        }

    return codeHTML;
}

function simpleHighlight(code, regex, highlightName){
    let codeHTML = code;
    
    codeHTML = codeHTML.replace(regex, match => `<span class="highlight-${highlightName}">${match}</span>`);

    return codeHTML
}