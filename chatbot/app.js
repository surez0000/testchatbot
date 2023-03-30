$(document).ready(function () {
    $("#sendRequest").click(async function () {
      const userInput = $("#userInput").val();
      const response = await fetchChatGPT4(userInput);
      displayResponse(response);
    });
  });
  
  async function fetchChatGPT4(inputText) {
    const url = "https://api.openai.com/v4/engines/davinci-codex/completions";
    const apiKey = "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";
  
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };
  
    const body = JSON.stringify({
      prompt: inputText,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5
    });
  
    try {
      const response = await fetch(url, { method: "POST", headers, body });
  
      if (response.ok) {
        const json = await response.json();
        return json.choices[0].text;
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return `Error: ${response.status} - ${response.statusText}`;
      }
    } catch (error) {
      console.error("Error:", error);
      return `Error: ${error}`;
    }
  }
  
  function displayResponse(responseText) {
    const responseView = $("#responseView");
    responseView.html("");
  
    if (responseText.startsWith("```") && responseText.endsWith("```")) {
      const codeSnippet = responseText.slice(3, -3);
      const pre = $("<pre>").text(codeSnippet);
      const copyButton = $("<button>").text("Click to Copy").click(function () {
        navigator.clipboard.writeText(codeSnippet);
      });
  
      responseView.append(pre, copyButton);
    } else {
      responseView.text(responseText);
    }
  }
  