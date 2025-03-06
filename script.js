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


document.addEventListener("DOMContentLoaded", ()=>{ updateCodeHighlight()});

function updateCodeHighlight(){
    const code = document.querySelectorAll(".code"); //make an node list for all the code elements

    if(code){
        code.forEach(function(el){
            if(el.getAttribute("contenteditable")){
                //if user put contenteditable on the code, then we need make the content highlighted editable
                //then we need to make a div with the content of the element and highlight it
                el.appendChild(document.createElement("DIV"));
                const div = el.querySelector("div");
                div.innerHTML = el.textContent;
                div.innerHTML = setHighlight(div.textContent);
                
                //what is being editable is the element that has the contenteditable attribute and we get that content constantly to put it highlighted on the div that show the code, because it works with a div that be behind the element and the principal element it is in front but with content color transparent, per shows only the div with the highlighted code
                el.addEventListener("input", ()=>{
                    const contentRegex =/((?:[^<]|<(?!div\b[^>]*>))*)/;
                    const contentWithoutEditableDiv = el.innerHTML.match(contentRegex)[0];  
                    const contentHighlighted = setHighlight(contentWithoutEditableDiv);
                    div.innerHTML = contentHighlighted;
                })        
            }else {
                el.innerHTML = setHighlight(el.textContent);
                el.style.color = "var(--based-color-text)";
            }
        });
    }
}
function setHighlight(el){
    const symbolRegex = /(?<!<[^>]*)[;=+\-{}\[\]\(\)$]|(&gt;)|(&lt;)/g;   // symbols "><" there no like that in the code are &gt; and &lt;
    const stringRegex = /["'`](.*?)["'`]/g;
    const commentRegex = /\/\/.*/g;        
    //get all codes and highlight them
    const stringHTMLCodeHighlight = simpleHighlight(el, stringRegex, "string");
    const keywordHTMLCodeHighlight = keywordHighlight(stringHTMLCodeHighlight);
    const methodHTMLCodeHighlight = methodHighlight(keywordHTMLCodeHighlight);
    const symbolHTMLCodeHighlight = simpleHighlight(methodHTMLCodeHighlight, symbolRegex, "symbol");
    const commentHTMLCodeHighlight = simpleHighlight(symbolHTMLCodeHighlight, commentRegex, "comment");
    return commentHTMLCodeHighlight;
}

//make functions that highlight the code by sections, per can search for the changes on each section
function keywordHighlight(code){
    let codeHTML = code;
    for(const keyword of keywords){
        const regexKeyword = new RegExp(`(?<!<[^>]*)\\b${keyword}\\b(?!([^<]*>))`, "g");
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