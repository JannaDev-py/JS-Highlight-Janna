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
    const code = document.querySelectorAll(".code");
    const methodRegex = /\w+\.\w+\(/g;
    const stringRegex = /["'`](.*?)["'`]/g;
    const symbolRegex = /=/g;
    const commentRegex = /\/\/.*/g;
    
    code.forEach(function(el) {

        for(const keyword of keywords){
            const regexKeyword = new RegExp(`(?<!\\{)\\b${keyword}\\b`, "g");
            if(el.innerHTML.includes(keyword)){
                el.innerHTML = el.innerHTML.replace(regexKeyword, `<span class="highlight-keyword">${keyword}</span>`);
            }
        }

        const matchString = el.textContent.match(stringRegex)
        if(matchString){
            for(let i = 0; i < matchString.length; i++){
                el.innerHTML = el.innerHTML.replace(matchString[i], `<span class="highlight-string">${matchString[i]}</span>`);
            }
        }

        const matchMethod = el.innerHTML.match(methodRegex);
        if(matchMethod){
            for(const matchMethodsArray of matchMethod){
                const matchMethodWithoutParenthesis = matchMethodsArray.replace(/[(]/g, "");
                const matchMethodSecondWord = matchMethodWithoutParenthesis.split(".")[1];
                const dinamicMethodRegex = new RegExp(`\\b${matchMethodSecondWord}\\b`, "g");
                el.innerHTML = el.innerHTML.replace(dinamicMethodRegex, `<span class="highlight-method">${matchMethodSecondWord}</span>`);
            }
        }
        
    });
});
