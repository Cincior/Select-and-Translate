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
      popup.style.left = (event.pageX - 150) + "px";
      popup.style.top = (event.pageY - 150) + "px";
      popup.style.transform = "translate(-50%, -100%)";
      popup.innerText = translated;
      popup.style.padding = "40px"
      popup.style.backgroundColor = "red";
      popup.style.color = "yellow";
      popup.style.zIndex = 9999;

      document.body.appendChild(popup);

      setTimeout(() => {popup.remove()}, 4000)
   }