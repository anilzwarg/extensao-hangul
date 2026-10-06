document.getElementById("ativar").addEventListener("click", () => {
  chrome.runtime.sendMessage({acao: "converter"});
});

document.getElementById("reverter").addEventListener("click", () => {
  chrome.runtime.sendMessage({acao: "reverter"});
});
