document.addEventListener('DOMContentLoaded', () => {
  if (typeof mermaid === 'undefined') {
    console.error('Mermaid is not available.');
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'default'
  });

  const diagramContainer = document.getElementById('mermaid-diagram');
  if (!diagramContainer) {
    return;
  }

  fetch('/assets/mermaid/genealogy.mmd')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load the genealogy diagram (${response.status}).`);
      }
      return response.text();
    })
    .then((graphDefinition) => mermaid.render('genealogy', graphDefinition))
    .then(({ svg }) => {
      diagramContainer.innerHTML = svg;
    })
    .catch((error) => {
      console.error(error);
      diagramContainer.innerHTML = '<p>Unable to load the genealogy diagram.</p>';
    });
});
