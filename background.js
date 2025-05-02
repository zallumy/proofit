
    chrome.contextMenus.create({
        title: "ProofIt!!",
        id: "contextMenu1",
        contexts: ["page"]
    }, () => chrome.runtime.lastError);


    
    chrome.contextMenus.onClicked.addListener(function(clickData) {
        
        if (clickData.menuItemId === "contextMenu1") {
 
            var currentURL

            chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, 
            function(tabs){
                getCurrentURL(tabs[0].url)
                
            });
            
            function getCurrentURL(tab){
                currentURL = tab
                console.log(currentURL)
                let newURL = currentURL.toString()
                console.log(newURL)
                let splitURL = newURL
                console.log(newURL.length)
                let newsplitURL = splitURL.substr(-36)
                console.log(newsplitURL)
                let finalURL = 'https://idt.vcs.cimpress.io/api/v1/proofs?immediate=true&template-id='+newsplitURL
                chrome.tabs.create({ url: finalURL });
                
            }
            
            async function getData(finalURL) {
                try {
                    const response = await fetch(finalURL);
                    const resJson = await response.json();
            
                    return resJson;
                } catch (error) {
                    console.warn('getData error', error);
                }
            
                return null;
            }
            
            getData().then(data => console.log(data));
 
        } 
    })

    