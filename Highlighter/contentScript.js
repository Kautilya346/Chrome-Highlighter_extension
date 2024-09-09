console.log('Content script running');

function changeSelectedTextColor(color) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    span.style.color="black";
    range.surroundContents(span);
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.color) {
        changeSelectedTextColor(request.color);
    } else {
        sendResponse({status: "failure"});
    }
});






// TO SAVE THE CHANGES (FROM CHATGPT AND NOT TESTED)




// console.log('Content script running');

// // Save highlights to Chrome storage
// function saveHighlight(text, color, range) {
//     chrome.storage.local.get({highlights: []}, function(result) {
//         const highlights = result.highlights;

//         // Save the highlight details
//         highlights.push({
//             text: text,
//             color: color,
//             startOffset: range.startOffset,
//             endOffset: range.endOffset,
//             startContainer: getXPath(range.startContainer),
//             endContainer: getXPath(range.endContainer)
//         });

//         chrome.storage.local.set({highlights: highlights});
//     });
// }

// // Apply a highlight and save it
// function changeSelectedTextColor(color) {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return;

//     const range = selection.getRangeAt(0);
//     const text = range.toString();
//     const span = document.createElement("span");
//     span.style.backgroundColor = color;
//     range.surroundContents(span);

//     // Save the highlight
//     saveHighlight(text, color, range);
// }

// // Restore highlights
// function restoreHighlights() {
//     chrome.storage.local.get({highlights: []}, function(result) {
//         const highlights = result.highlights;
//         highlights.forEach((highlight) => {
//             const range = document.createRange();
//             range.setStart(getNodeFromXPath(highlight.startContainer), highlight.startOffset);
//             range.setEnd(getNodeFromXPath(highlight.endContainer), highlight.endOffset);

//             const span = document.createElement("span");
//             span.style.backgroundColor = highlight.color;
//             range.surroundContents(span);
//         });
//     });
// }

// // Utility function: Convert a DOM node to XPath
// function getXPath(node) {
//     let path = '';
//     while (node && node.nodeType === Node.ELEMENT_NODE) {
//         let index = 0;
//         let sibling = node.previousSibling;
//         while (sibling) {
//             if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === node.nodeName) {
//                 index++;
//             }
//             sibling = sibling.previousSibling;
//         }
//         const tagName = node.nodeName.toLowerCase();
//         const position = `[${index + 1}]`;
//         path = `/${tagName}${position}${path}`;
//         node = node.parentNode;
//     }
//     return path;
// }

// // Utility function: Convert XPath to a DOM node
// function getNodeFromXPath(xpath) {
//     const evaluator = new XPathEvaluator();
//     const result = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//     return result.singleNodeValue;
// }

// // Restore highlights when the content script runs
// restoreHighlights();

// // Listen for messages from popup.js
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.color) {
//         changeSelectedTextColor(request.color);
//         sendResponse({status: "success"}); // Optional response
//     } else {
//         sendResponse({status: "failure"});
//     }
// });
