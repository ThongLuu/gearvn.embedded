(function () {
  let theme = localStorage.getItem('theme') || 'gearvn';
  if (theme === 'null') theme = 'gearvn';
  const themeLink = document.getElementById('app-theme');
  const themeCustomLink = document.getElementById('app-theme-custom');
  if (themeLink) {
    themeLink.href = `/assets/themes/${theme}/theme.css`;
  }
  if (themeCustomLink) {
    switch (theme) {
      case 'gearvn':
      case 'bootstrap4-light-blue':
      case 'bootstrap4-light-purple':
      case 'fluent-light':
      case 'lara-light-blue':
      case 'lara-light-indigo':
      case 'lara-light-purple':
      case 'lara-light-teal':
      case 'mdc-light-indigo':
      case 'mdc-light-deeppurple':
      case 'md-light-indigo':
      case 'md-light-deeppurple':
      case 'nova':
      case 'nova-accent':
      case 'nova-alt':
      case 'rhea':
      case 'saga-blue':
      case 'saga-green':
      case 'saga-orange':
      case 'saga-purple':
      case 'tailwind-light':
        themeCustomLink.href = `/assets/themes/light.css`;
        localStorage.setItem('themeJson', 'rjv-default');
        break;
      default:
        themeCustomLink.href = `/assets/themes/dark.css`;
        localStorage.setItem('themeJson', 'codeschool');
    }
  }
})();
