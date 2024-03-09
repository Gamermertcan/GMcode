function processBgTag(fileContent) {
  var backgroundColor = "#000000"; // Varsayılan arka plan rengi
  
  // RFCF dosyasını oku ve ^Bg içindeki işlemleri gerçekleştir
  for (var i = 0; i < fileContent.length; i++) {
    if (fileContent[i].includes("^Bg")) {
      // ^Bg içindeki işlemleri gerçekleştir
      var bgIndex = i;
      while (++i < fileContent.length) {
        if (fileContent[i].startsWith("color")) {
          backgroundColor = fileContent[i].match(/color=(\S+)/)[1].replace(/\*/g, "");
        } else if (fileContent[i].includes("^^Bg")) {
          // ^Bg işlemleri tamamlandığında döngüyü sonlandır
          break;
        }
      }
    }
  }
  
  // Arka plan rengini belirle
  document.body.style.backgroundColor = backgroundColor;
}


