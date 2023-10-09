const htmlCode = document.getElementById("html-text");
const cssCode = document.getElementById("css-text");
const jsCode = document.getElementById("js-text");
const iframe = document.getElementById("iframe");

// Load saved code from localStorage or set to empty string if no data
htmlCode.value = localStorage.getItem("html") || "";
cssCode.value = localStorage.getItem("css") || "";
jsCode.value = localStorage.getItem("js") || "";

htmlCode.addEventListener("input", updateIframe);
cssCode.addEventListener("input", updateIframe);
jsCode.addEventListener("input", updateIframe);

function dataStored(element, storageValue) {
  let newValue = element.value;
  localStorage.setItem(storageValue, newValue);
}

function updateIframe() {
  const htmlValue = htmlCode.value;
  const cssValue = cssCode.value;
  const jsValue = jsCode.value;

  dataStored(htmlCode, "html");
  dataStored(cssCode, "css");
  dataStored(jsCode, "js");

  const iframeContent = `
        <html>
        <head>
            <style>${cssValue}</style>
        </head>
        <body>
            ${htmlValue}
            <script>${jsValue}</script>
        </body>
        </html>
    `;

  iframe.setAttribute("srcdoc", iframeContent);
}

const textareas = document.querySelectorAll(".tabbable-textarea");

textareas.forEach((textarea) => {
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent the default tab behavior (focus change)

      // Insert a tab character at the current cursor position
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentText = textarea.value;
      const tabbedText = currentText.substring(0, start) + "\t" + currentText.substring(end);
      textarea.value = tabbedText;

      // Set the cursor position after the inserted tab
      textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
  });
});

window.addEventListener("load", updateIframe);