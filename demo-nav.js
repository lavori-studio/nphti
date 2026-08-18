/* ============================================================
 * TEMPORARY — board-review navigation only. NOT the final site chrome.
 *
 * The real header/nav will be built natively in Wix per
 * WIX-HEADER-FOOTER-SPEC.md. This script exists only so the NPHTI
 * board can click between pages while reviewing on GitHub Pages,
 * standing in for the Wix header that isn't present in these files.
 *
 * TO REMOVE once Wix launch is live: delete this file, and delete the
 * `<script src="demo-nav.js"></script>` line (flagged with a matching
 * "TEMP nav" HTML comment) near the bottom of every nphti-*.html page.
 *
 * Styled to match WIX-HEADER-FOOTER-SPEC.md as closely as possible
 * (topband, logo, nav link states, dropdowns, Donate button, mobile
 * hamburger) so it reads as real site chrome during review. Faculty
 * and Leadership are nested under About, and Scholarship Campaign is
 * nested under Donate, per client request — not in the original spec
 * doc, added here for board-review convenience.
 *
 * Self-limiting: renders nothing when the page is loaded inside an
 * iframe (window.self !== window.top), so it stays invisible once
 * these pages are embedded in the live Wix site even if this script
 * tag is accidentally left in place.
 * ============================================================ */
(function () {
  if (window.self !== window.top) return; // inside the Wix iframe — stay invisible

  var HOME = 'nphti-home-bright-geometric.html';
  var ABOUT_HREF = 'nphti-about-bright-geometric.html';
  var DONATE_HREF = 'nphti-donate-bright-geometric.html';

  var ABOUT_ITEMS = [
    { href: ABOUT_HREF, label: 'About NPHTI', hue: '#424c9a' },
    { href: 'nphti-leadership-bright-geometric.html', label: 'Leadership', hue: '#3290a4' },
    { href: 'nphti-faculty-bright-geometric.html', label: 'Faculty', hue: '#90a1d7' }
  ];
  var DONATE_CHILDREN = [
    { href: 'nphti-scholarship-campaign-bright-geometric.html', label: 'Scholarship Campaign', hue: '#f2b134' }
  ];
  var TRAINING_ITEMS = [
    { href: 'nphti-training-calendar-bright-geometric.html', label: 'Training Calendar', hue: '#424c9a' },
    { href: 'nphti-annual-workshops-bright-geometric.html', label: 'Annual Workshops', hue: '#3290a4' },
    { href: 'nphti-mid-year-meetup-bright-geometric.html', label: 'Mid-Year Meetup', hue: '#90a1d7' },
    { href: 'nphti-webinars-bright-geometric.html', label: 'Webinars', hue: '#4da9bc' },
    { href: 'nphti-training-archive-bright-geometric.html', label: 'Training Archive', hue: '#424c9a' }
  ];
  var NAV = [
    { trigger: true, label: 'About', items: ABOUT_ITEMS },
    { trigger: true, label: 'Training', items: TRAINING_ITEMS },
    { href: 'nphti-find-a-provider-bright-geometric.html', label: 'Find a Provider' },
    { href: 'nphti-training-resources-bright-geometric.html', label: 'Training Resources' },
    { href: 'nphti-contact-bright-geometric.html', label: 'Contact' }
  ];

  var here = location.pathname.split('/').pop() || HOME;
  var chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';

  function hrefs(list) { return list.map(function (i) { return i.href; }); }
  function isActive(item) {
    if (item.trigger) return item.items.some(function (i) { return i.href === here; });
    if (item.children) return item.href === here || hrefs(item.children).indexOf(here) !== -1;
    return item.href === here;
  }

  var style = document.createElement('style');
  style.textContent = [
    '#dn-root *{box-sizing:border-box;}',
    '#dn-root{font-family:"DM Sans",sans-serif;}',
    '#dn-topband{display:flex;width:100%;height:6px;}',
    '#dn-topband span{flex:1;}',
    '#dn-header{display:flex;align-items:center;justify-content:space-between;background:#f1f4fb;border-bottom:2px solid #161b38;padding:18px clamp(20px,4vw,40px) 16px;position:relative;z-index:10000;}',
    '#dn-actions{display:flex;align-items:center;gap:14px;}',
    '#dn-login{background:transparent;color:#161b38;border:1.5px solid #dbe1f4;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:500;font-family:"DM Sans",sans-serif;cursor:pointer;white-space:nowrap;}',
    '#dn-login:hover{border-color:#424c9a;color:#424c9a;}',
    '#dn-logo{display:flex;align-items:center;}',
    '#dn-logo img{height:56px;width:auto;display:block;}',
    '#dn-links{display:flex;align-items:center;gap:20px;}',
    '.dn-item{position:relative;display:flex;align-items:center;}',
    '.dn-link{font-family:"DM Sans",sans-serif;font-weight:500;font-size:13.5px;color:#5b618c;text-decoration:none;white-space:nowrap;}',
    '.dn-link:hover,.dn-link.dn-current{color:#161b38;}',
    '.dn-trig{display:inline-flex;align-items:center;gap:6px;font-family:"DM Sans",sans-serif;font-weight:500;font-size:13.5px;color:#5b618c;background:none;border:none;cursor:pointer;padding:0;white-space:nowrap;}',
    '.dn-trig:hover,.dn-trig.dn-current{color:#161b38;}',
    '.dn-caret{display:inline-flex;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;padding:2px;color:#5b618c;margin-left:3px;}',
    '.dn-caret:hover,.dn-caret.dn-current{color:#161b38;}',
    '.dn-trig svg,.dn-caret svg{width:11px;height:11px;transition:transform .15s ease;}',
    '[aria-expanded="true"] svg{transform:rotate(180deg);}',
    '#dn-donate-wrap{display:flex;align-items:stretch;}',
    '#dn-donate{background:#424c9a;color:#fff;padding:9px 16px;font-size:13px;font-weight:500;text-decoration:none;font-family:"DM Sans",sans-serif;display:flex;align-items:center;border-radius:8px 0 0 8px;}',
    '#dn-donate:hover{background:#353f85;}',
    '.dn-donate-caret{background:#424c9a;color:#fff;border:none;border-left:1px solid rgba(255,255,255,.3);cursor:pointer;padding:9px 10px;display:flex;align-items:center;border-radius:0 8px 8px 0;}',
    '.dn-donate-caret:hover{background:#353f85;}',
    '#dd-donate{right:0;left:auto;}',
    '.dn-dropdown{display:none;position:absolute;top:100%;left:0;margin-top:14px;min-width:230px;background:#fff;border:1.5px solid #dbe1f4;border-radius:10px;box-shadow:0 18px 44px rgba(22,27,56,.16);padding:8px;z-index:2;}',
    '.dn-dropdown.dn-open{display:block;}',
    '.dn-dropdown a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:7px;font-family:"DM Sans",sans-serif;font-weight:500;font-size:13.5px;color:#161b38;text-decoration:none;}',
    '.dn-dropdown a:hover{background:#e7ecf8;}',
    '.dn-dropdown a.dn-current{background:#eef0fa;}',
    '.dn-dropdown i{width:8px;height:8px;border-radius:2px;transform:rotate(45deg);flex:0 0 auto;}',
    '#dn-hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;width:30px;height:30px;flex-direction:column;justify-content:center;gap:6px;}',
    '#dn-hamburger span{display:block;width:100%;height:2px;background:#161b38;transition:transform .2s ease,opacity .2s ease;}',
    '#dn-hamburger.dn-open span:nth-child(1){transform:translateY(8px) rotate(45deg);}',
    '#dn-hamburger.dn-open span:nth-child(2){opacity:0;}',
    '#dn-hamburger.dn-open span:nth-child(3){transform:translateY(-8px) rotate(-45deg);}',
    '#dn-mobile{display:none;background:#fff;border-bottom:2px solid #161b38;}',
    '#dn-mobile.dn-open{display:block;}',
    '.dn-mrow{display:block;padding:15px clamp(20px,4vw,40px);font-size:15px;color:#161b38;text-decoration:none;border-top:1px solid #dbe1f4;font-family:"DM Sans",sans-serif;}',
    '.dn-mtrig{display:flex;align-items:center;justify-content:space-between;width:100%;padding:15px clamp(20px,4vw,40px);font-size:15px;color:#161b38;background:none;border:none;border-top:1px solid #dbe1f4;text-align:left;cursor:pointer;font-family:"DM Sans",sans-serif;}',
    '.dn-mtrig svg{width:12px;height:12px;transition:transform .15s ease;}',
    '.dn-msplit{display:flex;align-items:stretch;border-top:1px solid #dbe1f4;}',
    '.dn-msplit .dn-mrow-link{flex:1;padding:15px clamp(20px,4vw,40px);font-size:15px;color:#161b38;text-decoration:none;font-family:"DM Sans",sans-serif;}',
    '.dn-msplit .dn-mcaret{background:none;border:none;padding:15px clamp(16px,3vw,28px);color:#5b618c;cursor:pointer;}',
    '.dn-msplit .dn-mcaret svg{width:12px;height:12px;transition:transform .15s ease;}',
    '.dn-msub{display:none;background:#f7f9fd;}',
    '.dn-msub.dn-open{display:block;}',
    '.dn-msub a{display:flex;align-items:center;gap:10px;padding:13px clamp(20px,4vw,40px) 13px calc(clamp(20px,4vw,40px) + 14px);font-size:14px;color:#161b38;text-decoration:none;border-top:1px solid #dbe1f4;}',
    '.dn-msub i{width:7px;height:7px;border-radius:2px;transform:rotate(45deg);flex:0 0 auto;}',
    '.dn-mdonate-wrap{display:flex;align-items:stretch;margin:16px clamp(20px,4vw,40px) 0;background:#424c9a;border-radius:8px;overflow:hidden;}',
    '.dn-mdonate{flex:1;text-align:center;padding:12px;color:#fff;font-size:14px;font-weight:500;text-decoration:none;font-family:"DM Sans",sans-serif;}',
    '.dn-mdonate-caret{background:none;border:none;border-left:1px solid rgba(255,255,255,.3);padding:12px 16px;color:#fff;cursor:pointer;}',
    '.dn-mdonate-caret svg{width:12px;height:12px;transition:transform .15s ease;}',
    '.dn-msub-donate{display:none;background:#f7f9fd;margin:0 clamp(20px,4vw,40px) 20px;border-radius:0 0 8px 8px;}',
    '.dn-msub-donate.dn-open{display:block;}',
    '.dn-msub-donate a{display:flex;align-items:center;gap:10px;padding:12px 14px;font-size:14px;color:#161b38;text-decoration:none;}',
    '.dn-msub-donate i{width:7px;height:7px;border-radius:2px;transform:rotate(45deg);flex:0 0 auto;background:#f2b134;}',
    '.dn-mlogin{display:block;width:calc(100% - clamp(40px,8vw,80px));margin:16px clamp(20px,4vw,40px) 0;background:transparent;color:#161b38;border:1.5px solid #dbe1f4;text-align:center;padding:11px;border-radius:8px;font-size:14px;font-weight:500;font-family:"DM Sans",sans-serif;cursor:pointer;}',
    '@media(max-width:900px){#dn-links{display:none;}#dn-actions.dn-desktop-only{display:none;}#dn-hamburger{display:flex;}}',
    '#dn-flag{position:fixed;bottom:10px;right:10px;z-index:99999;font-family:"DM Sans",sans-serif;font-size:9.5px;color:#a9b0d9;background:rgba(22,27,56,.85);padding:3px 8px;border-radius:4px;pointer-events:none;letter-spacing:.02em;}'
  ].join('');
  document.head.appendChild(style);

  function diamond(hue) { return '<i style="background:' + hue + '"></i>'; }
  function dropdownItems(items) {
    return items.map(function (item) {
      var cur = item.href === here ? ' dn-current' : '';
      return '<a class="' + cur.trim() + '" href="' + item.href + '">' + diamond(item.hue) + item.label + '</a>';
    }).join('');
  }

  // ---------- Desktop nav ----------
  var linksHtml = NAV.map(function (item, idx) {
    var active = isActive(item);
    if (item.trigger) {
      return '<div class="dn-item">' +
        '<button type="button" class="dn-trig' + (active ? ' dn-current' : '') + '" data-dd="dd' + idx + '" aria-expanded="false">' + item.label + ' ' + chev + '</button>' +
        '<div class="dn-dropdown" id="dd' + idx + '">' + dropdownItems(item.items) + '</div>' +
      '</div>';
    }
    if (item.children) {
      return '<div class="dn-item">' +
        '<a class="dn-link' + (active ? ' dn-current' : '') + '" href="' + item.href + '">' + item.label + '</a>' +
        '<button type="button" class="dn-caret' + (active ? ' dn-current' : '') + '" data-dd="dd' + idx + '" aria-expanded="false" aria-label="' + item.label + ' submenu">' + chev + '</button>' +
        '<div class="dn-dropdown" id="dd' + idx + '">' + dropdownItems(item.children) + '</div>' +
      '</div>';
    }
    var cur = item.href === here ? ' dn-current' : '';
    return '<a class="dn-link' + cur + '" href="' + item.href + '">' + item.label + '</a>';
  }).join('');

  var actionsHtml =
    '<div id="dn-actions" class="dn-desktop-only">' +
      '<button type="button" id="dn-login">Log In</button>' +
      '<div id="dn-donate-wrap" class="dn-item">' +
        '<a id="dn-donate" href="' + DONATE_HREF + '">Donate</a>' +
        '<button type="button" class="dn-donate-caret" data-dd="dd-donate" aria-expanded="false" aria-label="Donate submenu">' + chev + '</button>' +
        '<div class="dn-dropdown" id="dd-donate">' + dropdownItems(DONATE_CHILDREN) + '</div>' +
      '</div>' +
    '</div>';

  // ---------- Mobile nav ----------
  var mobileHtml = NAV.map(function (item, idx) {
    if (item.trigger) {
      return '<button type="button" class="dn-mtrig" data-msub="ms' + idx + '" aria-expanded="false">' + item.label + ' ' + chev + '</button>' +
        '<div class="dn-msub" id="ms' + idx + '">' + subRows(item.items) + '</div>';
    }
    if (item.children) {
      return '<div class="dn-msplit">' +
        '<a class="dn-mrow-link" href="' + item.href + '">' + item.label + '</a>' +
        '<button type="button" class="dn-mcaret" data-msub="ms' + idx + '" aria-expanded="false" aria-label="' + item.label + ' submenu">' + chev + '</button>' +
      '</div>' +
      '<div class="dn-msub" id="ms' + idx + '">' + subRows(item.children) + '</div>';
    }
    var cur = item.href === here ? ' dn-current' : '';
    return '<a class="dn-mrow' + cur + '" href="' + item.href + '">' + item.label + '</a>';
  }).join('');

  function subRows(items) {
    return items.map(function (t) {
      var cur = t.href === here ? ' dn-current' : '';
      return '<a class="' + cur.trim() + '" href="' + t.href + '">' + diamond(t.hue) + t.label + '</a>';
    }).join('');
  }

  var mobileActionsHtml =
    '<button type="button" class="dn-mlogin">Log In</button>' +
    '<div class="dn-mdonate-wrap">' +
      '<a class="dn-mdonate" href="' + DONATE_HREF + '">Donate</a>' +
      '<button type="button" class="dn-mdonate-caret" data-msub="ms-donate" aria-expanded="false" aria-label="Donate submenu">' + chev + '</button>' +
    '</div>' +
    '<div class="dn-msub-donate" id="ms-donate">' + subRows(DONATE_CHILDREN) + '</div>';

  // ---------- Assemble ----------
  var root = document.createElement('div');
  root.id = 'dn-root';
  root.innerHTML =
    '<div id="dn-topband"><span style="background:#424c9a"></span><span style="background:#3290a4"></span><span style="background:#90a1d7"></span><span style="background:#4da9bc"></span></div>' +
    '<div id="dn-header">' +
      '<a id="dn-logo" href="' + HOME + '"><img src="nphti-logo.png" alt="NPHTI"></a>' +
      '<div id="dn-links">' + linksHtml + '</div>' +
      actionsHtml +
      '<button id="dn-hamburger" type="button" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<div id="dn-mobile">' + mobileHtml + mobileActionsHtml + '</div>' +
    '<div id="dn-flag">Preview build &middot; final menu will be native Wix</div>';

  document.body.insertBefore(root, document.body.firstChild);

  // Desktop dropdown toggles (Training trigger + About/Donate carets)
  var openDropdowns = root.querySelectorAll('[data-dd]');
  openDropdowns.forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('data-dd'));
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !panel.classList.contains('dn-open');
      // close all other panels first
      root.querySelectorAll('.dn-dropdown.dn-open').forEach(function (p) { p.classList.remove('dn-open'); });
      root.querySelectorAll('[data-dd][aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      if (willOpen) {
        panel.classList.add('dn-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (!root.contains(e.target)) return;
    if (e.target.closest('[data-dd]') || e.target.closest('.dn-dropdown')) return;
    root.querySelectorAll('.dn-dropdown.dn-open').forEach(function (p) { p.classList.remove('dn-open'); });
    root.querySelectorAll('[data-dd][aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('click', function (e) {
    if (!root.contains(e.target)) {
      root.querySelectorAll('.dn-dropdown.dn-open').forEach(function (p) { p.classList.remove('dn-open'); });
    }
  });

  // Mobile hamburger
  var hamburger = document.getElementById('dn-hamburger');
  var mobile = document.getElementById('dn-mobile');
  hamburger.addEventListener('click', function () {
    var open = mobile.classList.toggle('dn-open');
    hamburger.classList.toggle('dn-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Mobile accordions (Training / About / Donate submenus)
  var msubToggles = root.querySelectorAll('[data-msub]');
  msubToggles.forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('data-msub'));
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('dn-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();
