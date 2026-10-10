// Filters a list rendered at build time by category, tag and title search.
// Shared by the blog and projects indexes; it only toggles `hidden` on list items.
// State mirrors the URL (?category=, ?tag=) so filtered views can be linked.
(function () {
  var list = document.getElementById('filter-list');
  if (!list) return;

  var items = Array.prototype.slice.call(list.children);
  var search = document.getElementById('filter-search');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var noun = count.dataset.noun || 'item';
  var categoryChips = document.querySelectorAll('.chip[data-category]');
  var tagChips = document.querySelectorAll('.chip[data-tag]');

  var params = new URLSearchParams(window.location.search);
  var state = {
    category: params.get('category') || '',
    tag: (params.get('tag') || '').toLowerCase(),
    query: ''
  };

  function matches(item) {
    var tags = (item.dataset.tags || '').split(',');
    if (state.category && item.dataset.category !== state.category) return false;
    if (state.tag && tags.indexOf(state.tag) === -1) return false;
    if (state.query && (item.dataset.title || '').indexOf(state.query) === -1) return false;
    return true;
  }

  function syncUrl() {
    var next = new URLSearchParams();
    if (state.category) next.set('category', state.category);
    if (state.tag) next.set('tag', state.tag);
    var qs = next.toString();
    history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
  }

  function render() {
    var shown = 0;
    items.forEach(function (item) {
      var show = matches(item);
      item.hidden = !show;
      if (show) shown++;
    });

    categoryChips.forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.dataset.category === state.category));
    });
    tagChips.forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.dataset.tag === state.tag));
    });

    count.textContent = shown + ' ' + noun + (shown === 1 ? '' : 's') + ' found';
    empty.hidden = shown !== 0;
    syncUrl();
  }

  categoryChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      state.category = chip.dataset.category;
      render();
    });
  });

  // Tags toggle: clicking the active tag clears it.
  tagChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      state.tag = state.tag === chip.dataset.tag ? '' : chip.dataset.tag;
      render();
    });
  });

  if (search) {
    search.addEventListener('input', function () {
      state.query = search.value.trim().toLowerCase();
      render();
    });
  }

  render();
})();
