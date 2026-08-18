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
 * (topband, logo, nav link states, Training dropdown, Donate button,
 * mobile hamburger) so it reads as real site chrome during review.
 *
 * Self-limiting: renders nothing when the page is loaded inside an
 * iframe (window.self !== window.top), so it stays invisible once
 * these pages are embedded in the live Wix site even if this script
 * tag is accidentally left in place.
 * ============================================================ */
(function () {
  if (window.self !== window.top) return; // inside the Wix iframe — stay invisible

  var HOME = 'nphti-home-bright-geometric.html';
  var TRAINING_ITEMS = [
    { href: 'nphti-training-calendar-bright-geometric.html', label: 'Training Calendar', hue: '#424c9a' },
    { href: 'nphti-annual-workshops-bright-geometric.html', label: 'Annual Workshops', hue: '#3290a4' },
    { href: 'nphti-mid-year-meetup-bright-geometric.html', label: 'Mid-Year Meetup', hue: '#90a1d7' },
    { href: 'nphti-webinars-bright-geometric.html', label: 'Webinars', hue: '#4da9bc' },
    { href: 'nphti-training-archive-bright-geometric.html', label: 'Training Archive', hue: '#424c9a' }
  ];
  var NAV = [
    { href: 'nphti-about-bright-geometric.html', label: 'About' },
    { training: true, label: 'Training' },
    { href: 'nphti-find-a-provider-bright-geometric.html', label: 'Find a Provider' },
    { href: 'nphti-training-resources-bright-geometric.html', label: 'Training Resources' },
    { href: 'nphti-contact-bright-geometric.html', label: 'Contact' }
  ];

  var here = location.pathname.split('/').pop() || HOME;
  var trainingHrefs = TRAINING_ITEMS.map(function (i) { return i.href; });
  var trainingActive = trainingHrefs.indexOf(here) !== -1;

  var style = document.createElement('style');
  style.textContent = [
    '#dn-root *{box-sizing:border-box;}',
    '#dn-root{font-family:"DM Sans",sans-serif;}',
    '#dn-topband{display:flex;width:100%;height:6px;}',
    '#dn-topband span{flex:1;}',
    '#dn-header{display:flex;align-items:center;justify-content:space-between;background:#f1f4fb;border-bottom:2px solid #161b38;padding:18px clamp(20px,4vw,40px) 16px;position:relative;}',
    '#dn-logo{display:flex;align-items:center;}',
    '#dn-logo img{height:56px;width:auto;display:block;}',
    '#dn-links{display:flex;align-items:center;gap:22px;}',
    '.dn-link{font-family:"DM Sans",sans-serif;font-weight:500;font-size:13.5px;color:#5b618c;text-decoration:none;white-space:nowrap;}',
    '.dn-link:hover,.dn-link.dn-current{color:#161b38;}',
    '.dn-trig{display:inline-flex;align-items:center;gap:6px;font-family:"DM Sans",sans-serif;font-weight:500;font-size:13.5px;color:#5b618c;background:none;border:none;cursor:pointer;padding:0;white-space:nowrap;}',
    '.dn-trig:hover,.dn-trig.dn-current{color:#161b38;}',
    '.dn-trig svg{width:11px;height:11px;transition:transform .15s ease;}',
    '.dn-trig[aria-expanded="true"] svg{transform:rotate(180deg);}',
    '#dn-donate{background:#424c9a;color:#fff;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:500;text-decoration:none;font-family:"DM Sans",sans-serif;}',
    '#dn-donate:hover{background:#353f85;}',
    '#dn-dropdown{display:none;position:absolute;top:100%;left:0;margin-top:14px;min-width:240px;background:#fff;border:1.5px solid #dbe1f4;border-radius:10px;box-shadow:0 18px 44px rgba(22,27,56,.16);padding:8px;z-index:2;}',
    '#dn-dropdown.dn-open{display:block;}',
    '#dn-dropdown a{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:7px;font-family:"DM Sans",sans-serif;font-weight:500;font-size:13.5px;color:#161b38;text-decoration:none;}',
    '#dn-dropdown a:hover{background:#e7ecf8;}',
    '#dn-dropdown a.dn-current{background:#eef0fa;}',
    '#dn-dropdown i{width:8px;height:8px;border-radius:2px;transform:rotate(45deg);flex:0 0 auto;}',
    '#dn-hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;width:30px;height:30px;flex-direction:column;justify-content:center;gap:6px;}',
    '#dn-hamburger span{display:block;width:100%;height:2px;background:#161b38;transition:transform .2s ease,opacity .2s ease;}',
    '#dn-hamburger.dn-open span:nth-child(1){transform:translateY(8px) rotate(45deg);}',
    '#dn-hamburger.dn-open span:nth-child(2){opacity:0;}',
    '#dn-hamburger.dn-open span:nth-child(3){transform:translateY(-8px) rotate(-45deg);}',
    '#dn-mobile{display:none;background:#fff;border-bottom:2px solid #161b38;}',
    '#dn-mobile.dn-open{display:block;}',
    '#dn-mobile .dn-mrow{display:block;padding:15px clamp(20px,4vw,40px);font-size:15px;color:#161b38;text-decoration:none;border-top:1px solid #dbe1f4;font-family:"DM Sans",sans-serif;}',
    '#dn-mobile .dn-mtrig{display:flex;align-items:center;justify-content:space-between;width:100%;padding:15px clamp(20px,4vw,40px);font-size:15px;color:#161b38;background:none;border:none;border-top:1px solid #dbe1f4;text-align:left;cursor:pointer;font-family:"DM Sans",sans-serif;}',
    '#dn-mobile .dn-mtrig svg{width:12px;height:12px;transition:transform .15s ease;}',
    '#dn-mobile .dn-mtrig[aria-expanded="true"] svg{transform:rotate(180deg);}',
    '#dn-mobile .dn-msub{display:none;background:#f7f9fd;}',
    '#dn-mobile .dn-msub.dn-open{display:block;}',
    '#dn-mobile .dn-msub a{display:flex;align-items:center;gap:10px;padding:13px clamp(20px,4vw,40px) 13px calc(clamp(20px,4vw,40px) + 14px);font-size:14px;color:#161b38;text-decoration:none;border-top:1px solid #dbe1f4;}',
    '#dn-mobile .dn-msub i{width:7px;height:7px;border-radius:2px;transform:rotate(45deg);flex:0 0 auto;}',
    '#dn-mobile .dn-mdonate{display:block;margin:16px clamp(20px,4vw,40px) 20px;background:#424c9a;color:#fff;text-align:center;padding:12px;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;}',
    '@media(max-width:900px){#dn-links{display:none;}#dn-hamburger{display:flex;}}',
    '#dn-flag{position:fixed;bottom:10px;right:10px;z-index:99999;font-family:"DM Sans",sans-serif;font-size:9.5px;color:#a9b0d9;background:rgba(22,27,56,.85);padding:3px 8px;border-radius:4px;pointer-events:none;letter-spacing:.02em;}'
  ].join('');
  document.head.appendChild(style);

  function diamond(hue) {
    return '<i style="background:' + hue + '"></i>';
  }

  var dropdownHtml = TRAINING_ITEMS.map(function (item) {
    var cur = item.href === here ? ' dn-current' : '';
    return '<a class="' + cur.trim() + '" href="' + item.href + '">' + diamond(item.hue) + item.label + '</a>';
  }).join('');

  var linksHtml = NAV.map(function (item) {
    if (item.training) {
      return '<div style="position:relative;">' +
        '<button type="button" class="dn-trig' + (trainingActive ? ' dn-current' : '') + '" id="dn-trig" aria-expanded="false">Training ' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '<div id="dn-dropdown">' + dropdownHtml + '</div>' +
      '</div>';
    }
    var cur = item.href === here ? ' dn-current' : '';
    return '<a class="dn-link' + cur + '" href="' + item.href + '">' + item.label + '</a>';
  }).join('');

  var mobileHtml = NAV.map(function (item) {
    if (item.training) {
      var subItems = TRAINING_ITEMS.map(function (t) {
        var cur = t.href === here ? ' dn-current' : '';
        return '<a class="' + cur.trim() + '" href="' + t.href + '">' + diamond(t.hue) + t.label + '</a>';
      }).join('');
      return '<button type="button" class="dn-mtrig" id="dn-mtrig" aria-expanded="false">Training ' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>' +
        '<div class="dn-msub" id="dn-msub">' + subItems + '</div>';
    }
    var cur = item.href === here ? ' dn-current' : '';
    return '<a class="dn-mrow' + cur + '" href="' + item.href + '">' + item.label + '</a>';
  }).join('');

  var root = document.createElement('div');
  root.id = 'dn-root';
  root.innerHTML =
    '<div id="dn-topband"><span style="background:#424c9a"></span><span style="background:#3290a4"></span><span style="background:#90a1d7"></span><span style="background:#4da9bc"></span></div>' +
    '<div id="dn-header">' +
      '<a id="dn-logo" href="' + HOME + '"><img src="nphti-logo.png" alt="NPHTI"></a>' +
      '<div id="dn-links">' + linksHtml + '<a id="dn-donate" href="nphti-donate-bright-geometric.html">Donate</a></div>' +
      '<button id="dn-hamburger" type="button" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<div id="dn-mobile">' + mobileHtml + '<a class="dn-mdonate" href="nphti-donate-bright-geometric.html">Donate</a></div>' +
    '<div id="dn-flag">Preview build &middot; final menu will be native Wix</div>';

  document.body.insertBefore(root, document.body.firstChild);

  // Desktop Training dropdown
  var trig = document.getElementById('dn-trig');
  var dropdown = document.getElementById('dn-dropdown');
  if (trig) {
    trig.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dropdown.classList.toggle('dn-open');
      trig.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target) && e.target !== trig) {
        dropdown.classList.remove('dn-open');
        trig.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Mobile hamburger + accordion
  var hamburger = document.getElementById('dn-hamburger');
  var mobile = document.getElementById('dn-mobile');
  hamburger.addEventListener('click', function () {
    var open = mobile.classList.toggle('dn-open');
    hamburger.classList.toggle('dn-open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  var mtrig = document.getElementById('dn-mtrig');
  var msub = document.getElementById('dn-msub');
  if (mtrig) {
    mtrig.addEventListener('click', function () {
      var open = msub.classList.toggle('dn-open');
      mtrig.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
