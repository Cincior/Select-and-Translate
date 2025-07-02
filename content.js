   document.addEventListener('mouseup', async (event) => {
      const selectedText = window.getSelection().toString().trim();
      if(selectedText.length < 1) {
         return;
      }

      const url = `https://api.mymemory.translated.net/get?q=${selectedText}&langpair=pl|en`;

      try {
         const response = await fetch(url);
         const data = await response.json();
         const translated = data.responseData.translatedText;
         console.log('Tlumaczenie: ' + translated);
         showTranslation(translated,event);
      } catch (e) {
         console.log(e)
      }
   })


   function showTranslation(translated, event) {
      const popup = document.createElement('div');
      
      popup.style.position = "absolute";
      popup.style.left = (event.clientX) + "px";
      popup.style.top = (event.clientY) + "px";
      // popup.style.transform = "translate(-50%, -100%)";
      popup.innerText = translated;
      popup.style.padding = "20px"
      popup.style.backgroundColor = "#aaa";
      popup.style.boxShadow = "2px, 2px, #bbb"
      popup.style.textShadow = "2px, 2px, #bbb"
      popup.style.borderRadius = "10px"
      popup.style.color = "black";
      popup.style.fontSize = "24px"
      popup.style.fontFamily = "Arial"
      popup.style.zIndex = 9999;

      document.body.appendChild(popup);

      setTimeout(() => {popup.remove()}, 4000)
   }