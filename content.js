   let isSelected = false;
   const popup = document.createElement('div');
   
   document.addEventListener('mouseup', async (event) => {
      if(isSelected) {
         popup.remove();
         isSelected = false;
         return
      }
      const selectedText = window.getSelection().toString().trim();
      if(selectedText.length < 1) {
         return;
      }
      isSelected = true;
      const url = `https://api.mymemory.translated.net/get?q=${selectedText}&langpair=pl|en`;

      try {
         let response = await fetch(url);
         let data = await response.json();
         let translated = data.responseData.translatedText;
         if(translated.toLowerCase() == selectedText.toLowerCase()) {
            const url = `https://api.mymemory.translated.net/get?q=${selectedText}&langpair=en|pl`;
            response = await fetch(url);
            data = await response.json();
            translated = data.responseData.translatedText;
         }
         console.log('Tlumaczenie: ' + translated);
         showTranslation(translated,event);
      } catch (e) {
         console.log(e)
      }
   })


   function showTranslation(translated, event) {
      popup.style.position = "absolute";
      popup.style.left = (event.pageX) + "px";
      popup.style.top = (event.pageY - 75) + "px";
      // popup.style.transform = "translate(-50%, -100%)";
      popup.innerText = translated;
      popup.style.padding = "20px"
      popup.style.backgroundColor = "#aaa";
      popup.style.boxShadow = "2px, 2px, #111"
      popup.style.borderRadius = "10px"
      popup.style.color = "black";
      popup.style.fontSize = "24px"
      popup.style.fontFamily = "Arial"
      popup.style.zIndex = 9999;

      document.body.appendChild(popup);
   }