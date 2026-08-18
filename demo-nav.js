/* NPHTI Bright Geometric — DEMO-ONLY preview navigation.
 * Not part of the final site. The real header/nav will be built natively
 * in Wix (see WIX-HEADER-FOOTER-SPEC.md). This script exists purely so
 * the board can click between pages when viewing them directly on
 * GitHub Pages, standing in for the Wix chrome that isn't present here.
 *
 * Safe to leave in place after Wix launch: it only renders when the page
 * is loaded as a top-level document. Inside the real Wix iframe embed
 * (window.self !== window.top) it does nothing. Still best practice to
 * remove the <script src="demo-nav.js"> line from each page once Wix
 * launch is live and this is no longer needed for review.
 */
(function () {
  if (window.self !== window.top) return; // inside the Wix iframe — stay invisible

  var PAGES = [
    { group: 'Main', items: [
      { href: 'nphti-home-bright-geometric.html', label: 'Home' },
      { href: 'nphti-about-bright-geometric.html', label: 'About' },
      { href: 'nphti-faculty-bright-geometric.html', label: 'Faculty' },
      { href: 'nphti-leadership-bright-geometric.html', label: 'Leadership' }
    ]},
    { group: 'Training', items: [
      { href: 'nphti-training-calendar-bright-geometric.html', label: 'Training Calendar' },
      { href: 'nphti-annual-workshops-bright-geometric.html', label: 'Annual Workshops' },
      { href: 'nphti-mid-year-meetup-bright-geometric.html', label: 'Mid-Year Meetup' },
      { href: 'nphti-webinars-bright-geometric.html', label: 'Webinars' },
      { href: 'nphti-training-archive-bright-geometric.html', label: 'Training Archive' },
      { href: 'nphti-training-resources-bright-geometric.html', label: 'Training Resources' },
      { href: 'nphti-find-a-provider-bright-geometric.html', label: 'Find a Provider' }
    ]},
    { group: 'Support NPHTI', items: [
      { href: 'nphti-donate-bright-geometric.html', label: 'Donate' },
      { href: 'nphti-scholarship-campaign-bright-geometric.html', label: 'Scholarship Campaign' },
      { href: 'nphti-contact-bright-geometric.html', label: 'Contact' }
    ]}
  ];

  var here = location.pathname.split('/').pop();

  var style = document.createElement('style');
  style.textContent = [
    '#dn-root{position:fixed;bottom:20px;right:20px;z-index:99999;font-family:"DM Sans",sans-serif;}',
    '#dn-toggle{display:flex;align-items:center;gap:8px;background:#161b38;color:#fff;border:none;border-radius:99px;padding:12px 18px 12px 16px;font-family:"DM Sans",sans-serif;font-size:13px;font-weight:500;cursor:pointer;box-shadow:0 10px 30px rgba(22,27,56,.35);}',
    '#dn-toggle:hover{background:#242b56;}',
    '#dn-toggle svg{width:16px;height:16px;flex:0 0 auto;}',
    '#dn-tag{display:inline-block;font-size:9px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;background:#f2b134;color:#3a2a00;border-radius:20px;padding:2px 7px;}',
    '#dn-panel{display:none;position:absolute;bottom:56px;right:0;width:260px;max-height:70vh;overflow-y:auto;background:#fff;border:1.5px solid #dbe1f4;border-radius:12px;box-shadow:0 20px 50px rgba(22,27,56,.25);padding:14px;}',
    '#dn-panel.open{display:block;}',
    '#dn-panel .dn-notice{font-size:10.5px;color:#5b618c;line-height:1.5;padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #dbe1f4;}',
    '#dn-panel .dn-notice b{color:#161b38;}',
    '#dn-panel h6{font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#3290a4;margin:14px 0 6px;}',
    '#dn-panel h6:first-of-type{margin-top:0;}',
    '#dn-panel a{display:block;font-size:13px;color:#161b38;text-decoration:none;padding:7px 8px;border-radius:7px;line-height:1.3;}',
    '#dn-panel a:hover{background:#f1f4fb;}',
    '#dn-panel a.dn-current{background:#eef0fa;color:#424c9a;font-weight:500;}'
  ].join('');
  document.head.appendChild(style);

  var panelHtml = '<div class="dn-notice"><b>Preview navigation</b><br>Demo aid only — the real site will use a Wix-native menu. Not part of the final design.</div>';
  PAGES.forEach(function (section) {
    panelHtml += '<h6>' + section.group + '</h6>';
    section.items.forEach(function (item) {
      var current = item.href === here ? ' dn-current' : '';
      panelHtml += '<a class="' + current.trim() + '" href="' + item.href + '">' + item.label + '</a>';
    });
  });

  var root = document.createElement('div');
  root.id = 'dn-root';
  root.innerHTML =
    '<div id="dn-panel">' + panelHtml + '</div>' +
    '<button id="dn-toggle" type="button" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' +
      'Site menu <span id="dn-tag">Preview</span>' +
    '</button>';
  document.body.appendChild(root);

  var toggle = document.getElementById('dn-toggle');
  var panel = document.getElementById('dn-panel');
  toggle.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (!root.contains(e.target)) panel.classList.remove('open');
  });
})();
