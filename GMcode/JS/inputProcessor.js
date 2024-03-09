function processInputTag(fileContent) {
  for (var i = 0; i < fileContent.length; i++) {
    if (fileContent[i].includes("^input")) {
      var inputIndex = i;
      var inputElement = document.createElement("textarea"); // Yeni bir textarea oluştur
      while (++i < fileContent.length) {
        if (fileContent[i].startsWith("type")) {
          var inputType = fileContent[i].match(/type=(\S+)/)[1].replace(/\*/g, "");
          if (inputType === "file") {
            inputElement.type = "file";
          } else if (inputType === "text" || inputType.startsWith("text[")) {
            inputElement.type = "text";
            var attributes = inputType.match(/\[(.*?)\]/)[1].split("/");
            for (var j = 0; j < attributes.length; j++) {
              if (attributes[j].startsWith("resize")) {
                var resizeOption = attributes[j].split("_")[1];
                if (resizeOption === "none") {
                  inputElement.style.resize = "none";
                } else if (resizeOption === "user") {
                  inputElement.style.resize = "both";
                }
              } else if (attributes[j].startsWith("placeholder")) {
                var placeholderValue = attributes[j].split("[")[1].split("]")[0];
                inputElement.placeholder = placeholderValue;
              }
            }
          }
          document.body.appendChild(inputElement);
          break; // Döngüyü sonlandır
        }
      }
    }
  }
}
