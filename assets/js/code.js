// Adds a title bar with the language and a copy button to highlighted code blocks.
(function () {
  var canCopy = Boolean(navigator.clipboard && window.isSecureContext);

  document.querySelectorAll('.prose div.highlighter-rouge').forEach(function (block) {
    var match = block.className.match(/language-(\S+)/);
    var bar = document.createElement('div');
    bar.className = 'code-bar';

    var lang = document.createElement('span');
    lang.className = 'lang';
    lang.textContent = match ? match[1] : 'text';
    bar.appendChild(lang);

    if (canCopy) {
      var status = document.createElement('span');
      status.className = 'sr-only';
      status.setAttribute('role', 'status');

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy';
      button.textContent = 'Copy';
      button.addEventListener('click', function () {
        var code = block.querySelector('pre');
        navigator.clipboard.writeText(code.innerText).then(function () {
          button.textContent = 'Copied';
          status.textContent = 'Code copied';
          setTimeout(function () {
            button.textContent = 'Copy';
            status.textContent = '';
          }, 1500);
        }, function () {
          button.textContent = 'Failed';
        });
      });

      bar.appendChild(button);
      bar.appendChild(status);
    }

    block.insertBefore(bar, block.firstChild);
  });
})();
