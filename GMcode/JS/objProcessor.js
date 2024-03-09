function processRFCF(fileContent) {
  var color = "#000000"; // Varsayılan arka plan rengi
  var width = null;
  var height = null;
  var left = null;
  var top = null;
  var borderPX = null; // Varsayılan border kalınlığı
  var borderColor = null; // Varsayılan border rengi
  
  // RFCF dosyasını oku ve ^obj içindeki işlemleri gerçekleştir
  for (var i = 0; i < fileContent.length; i++) {
    if (fileContent[i].includes("^obj")) {
      // ^obj içindeki işlemleri gerçekleştir
      var objIndex = i;
      // Varsayılan değerlere dön
      color = "#000000";
      borderPX = null;
      borderColor = null;
      while (++i < fileContent.length) {
        if (fileContent[i].startsWith("sizeX")) {
          width = fileContent[i].match(/sizeX=(\S+)/)[1].replace(/\*/g, "") + "px";
        } else if (fileContent[i].startsWith("sizeY")) {
          height = fileContent[i].match(/sizeY=(\S+)/)[1].replace(/\*/g, "") + "px";
        } else if (fileContent[i].startsWith("X")) {
          left = fileContent[i].match(/X=(\S+)/)[1].replace(/\*/g, "") + "px";
        } else if (fileContent[i].startsWith("Y")) {
          top = fileContent[i].match(/Y=(\S+)/)[1].replace(/\*/g, "") + "px";
        } else if (fileContent[i].startsWith("color")) {
          color = fileContent[i].match(/color=(\S+)/)[1].replace(/\*/g, "");
        } else if (fileContent[i].startsWith("borderPX")) {
          borderPX = fileContent[i].match(/borderPX=(\S+)/)[1].replace(/\*/g, "") + "px";
        } else if (fileContent[i].startsWith("borderColor")) {
          borderColor = fileContent[i].match(/borderColor=(\S+)/)[1].replace(/\*/g, "");
        } else if (fileContent[i].includes("^^obj")) {
          // Yeni bir nesne oluştur
          var newObject = document.createElement("div");
          newObject.className = "object";
          newObject.style.width = width;
          newObject.style.height = height;
          newObject.style.backgroundColor = color;
          newObject.style.position = "absolute"; // Pozisyonu absolute olarak ayarla
          newObject.style.left = left;
          newObject.style.top = top;
          // Border kalınlığı ve rengi kontrol et
          if (borderPX && borderColor) {
            newObject.style.border = borderPX + " solid " + borderColor;
          } else if (borderPX) {
            newObject.style.borderWidth = borderPX;
            newObject.style.borderStyle = "solid";
          } else if (borderColor) {
            newObject.style.borderColor = borderColor;
            newObject.style.borderStyle = "solid";
          }
          document.body.appendChild(newObject);
          break; // Bir sonraki nesne başladığında döngüyü sonlandır
        }
      }
    }
  }
}
