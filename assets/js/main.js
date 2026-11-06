/* Page behavior. Pictures and project details come from data.js (loaded first). */

var scenes = Array.prototype.slice.call(document.querySelectorAll('.scene'));
var links = Array.prototype.slice.call(document.querySelectorAll('nav a'));
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

function setActive(id) {
  links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-link') === id); });
}

if ('IntersectionObserver' in window) {
  var steps = []; for (var s = 0; s <= 20; s++) steps.push(s / 20);
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var need = Math.min(innerHeight * 0.3, en.boundingClientRect.height * 0.3);
      if (en.isIntersecting && en.intersectionRect.height >= need) {
        en.target.classList.add('in'); setActive(en.target.id);
      } else if (!en.isIntersecting) {
        en.target.classList.remove('in');
      }
    });
  }, { threshold: steps });
  scenes.forEach(function (sc) { io.observe(sc); });
} else {
  scenes.forEach(function (sc) { sc.classList.add('in'); });
}

/* Scene swap: the scene that is leaving or arriving is dimmed a little. */
var ticking = false;
function dim() {
  ticking = false;
  var vh = innerHeight;
  scenes.forEach(function (sc) {
    var r = sc.getBoundingClientRect();
    var overlap = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    var f = Math.max(0, overlap) / Math.min(vh, r.height);
    var t = Math.min(1, Math.max(0, (f - 0.15) / 0.55));
    sc.style.opacity = (0.25 + 0.75 * t).toFixed(3);
  });
}
if (!reduce) {
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(dim); } }, { passive: true });
  addEventListener('resize', dim);
  dim();
}

/* ---------- Slider (used by Projects and Certificates) ---------- */
function $(id) { return document.getElementById(id); }
function pad(n) { return ('0' + n).slice(-2); }
function carousel(o) {
  var sl = o.slider, items = Array.prototype.slice.call(o.track.children);
  var idx = 0, i0 = 0, ticking = false, dragging = false, moved = false, barActive = false, sx = 0, s0 = 0, dx = 0, settle = 0;
  var smooth = reduce ? 'auto' : 'smooth';
  o.bar.max = 1000; o.bar.step = 1;
  function posFor(i) { var c = items[i]; return c.offsetLeft + c.offsetWidth / 2 - sl.clientWidth / 2; }
  function goTo(i, b) { i = Math.max(0, Math.min(items.length - 1, i)); sl.scrollTo({ left: posFor(i), behavior: b || smooth }); }
  function update() {
    ticking = false;
    var mid = sl.scrollLeft + sl.clientWidth / 2, best = 0, bd = 1e9;
    items.forEach(function (c, k) {
      var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) / c.offsetWidth;
      if (d < bd) { bd = d; best = k; }
      if (!reduce) { var t = Math.min(1, d); c.style.opacity = (1 - 0.65 * t).toFixed(3); c.style.transform = 'scale(' + (1 - 0.07 * t).toFixed(3) + ')'; }
    });
    idx = best;
    o.prev.disabled = idx === 0; o.next.disabled = idx === items.length - 1;
    o.count.textContent = pad(idx + 1) + ' / ' + pad(items.length);
    if (!barActive) o.bar.value = Math.round(sl.scrollLeft / Math.max(1, sl.scrollWidth - sl.clientWidth) * 1000);
    if (o.onChange) { clearTimeout(settle); settle = setTimeout(function () { o.onChange(idx); }, 180); }
  }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  sl.addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', function () { goTo(idx, 'auto'); queue(); });
  addEventListener('load', function () { goTo(idx, 'auto'); queue(); });
  o.prev.addEventListener('click', function () { goTo(idx - 1); });
  o.next.addEventListener('click', function () { goTo(idx + 1); });
  o.bar.addEventListener('input', function () {
    barActive = true; sl.style.scrollSnapType = 'none';
    sl.scrollLeft = o.bar.value / 1000 * (sl.scrollWidth - sl.clientWidth);
  });
  o.bar.addEventListener('change', function () { barActive = false; sl.style.scrollSnapType = ''; goTo(idx); });
  sl.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(idx - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(idx + 1); }
  });
  /* Mouse drag (touch and trackpad already scroll natively) */
  sl.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = false; i0 = idx; sx = e.clientX; s0 = sl.scrollLeft; dx = 0;
  });
  sl.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 6) {
      moved = true; sl.style.scrollSnapType = 'none'; sl.classList.add('drag');
      try { sl.setPointerCapture(e.pointerId); } catch (err) {}
    }
    if (moved) sl.scrollLeft = s0 - dx;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false; sl.classList.remove('drag');
    if (!moved) return;
    sl.style.scrollSnapType = '';
    var t = idx;
    if (t === i0) { if (dx < -40) t = i0 + 1; else if (dx > 40) t = i0 - 1; }
    goTo(t);
  }
  sl.addEventListener('pointerup', endDrag);
  sl.addEventListener('pointercancel', endDrag);
  sl.addEventListener('pointerleave', endDrag);
  update();
  return { show: goTo, items: items, index: function () { return idx; }, moved: function () { return moved; } };
}
/* ---------- Build the project and certificate cards from data.js ---------- */
var EXTS = (typeof IMAGE_EXTENSIONS !== 'undefined') ? IMAGE_EXTENSIONS : [(typeof IMAGE_EXTENSION !== 'undefined') ? IMAGE_EXTENSION : '.png'];
var PEXT = EXTS[0], CEXT = EXTS[0];   /* file type found for project pictures / certificates */
function imgUrl(path, ext) { return encodeURI(path + (ext || PEXT)); }
function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
/* Tries addresses one after the other; the callback gets the index of the first one that loads, or -1. */
function firstWorking(urls, cb) {
  var i = 0;
  (function next() {
    if (i >= urls.length) { cb(-1); return; }
    var k = i++, im = new Image();
    im.onload = function () { cb(k); };
    im.onerror = next;
    im.src = urls[k];
  })();
}
function setImage(box, url, alt, fit, pos) {
  var im = new Image(); im.alt = alt || ''; im.draggable = false; im.decoding = 'async';
  im.style.cssText = 'width:100%;height:100%;display:block;object-fit:' + (fit || 'cover') + (pos ? ';object-position:' + pos : '');
  im.onload = function () { box.textContent = ''; box.appendChild(im); box.style.border = '0'; };
  im.src = url;
}
var PROJECT_ROOT = PROJECT_ROOTS[0], CERT_ROOT = CERT_ROOTS[0];

/* Personal photo */
firstWorking(PHOTO_FILES.map(function (f) { return encodeURI(f); }), function (k) {
  var box = document.querySelector('[data-img=photo]');
  if (k >= 0 && box) setImage(box, encodeURI(PHOTO_FILES[k]), box.getAttribute('data-alt'), 'cover', '50% 20%');
});

/* Card picture: if any picture in the project's folders has "cover" in its name (any capital letters),
   the first one found (in folder order) is used. Otherwise the "cover" set in data.js is used. */
function autoCover(p) {
  var found = null;
  (function walk(groups) {
    groups.forEach(function (g) {
      if (found) return;
      (g.files || []).forEach(function (f) { if (!found && /cover/i.test(f)) found = g.dir + '/' + f; });
      if (!found) walk(g.children || []);
    });
  })(p.groups);
  return found || p.cover;
}
PROJECTS.forEach(function (p) { p.cover = autoCover(p); });

var coverBoxes = [], certBoxes = [];
PROJECTS.forEach(function (p) {
  var c = el('article', 'card'), ph = el('div', 'ph', 'Add image');
  c.appendChild(ph); c.appendChild(el('h3', '', p.title));
  if (p.place) c.appendChild(el('div', 'pl', p.place));
  c.appendChild(el('p', '', p.summary));
  var tg = el('div', 'tags'); (p.tags || []).forEach(function (t) { tg.appendChild(el('span', 'tag', t)); }); c.appendChild(tg);
  $('ptrack').appendChild(c); coverBoxes.push(ph);
});
CERTIFICATES.forEach(function (ct) {
  var c = el('article', 'card'), ph = el('div', 'ph', 'Add certificate image');
  c.appendChild(ph); c.appendChild(el('h3', '', ct.title)); c.appendChild(el('div', 'pl', ct.issuer));
  $('ctrack').appendChild(c); certBoxes.push(ph);
});
/* Find the folder that really holds the pictures, then fill the cards. */
function findRoot(roots, firstPath, done) {
  var urls = [], pairs = [];
  roots.forEach(function (r) { EXTS.forEach(function (x) { urls.push(imgUrl(r + firstPath, x)); pairs.push([r, x]); }); });
  firstWorking(urls, function (k) { var pr = pairs[k < 0 ? 0 : k]; done(pr[0], pr[1]); });
}
/* A project folder may also be doubled (ASTER Mall/ASTER Mall): both are accepted. */
function rootChoices(p) { var last = p.root.split('/').pop(); return [p.root, p.root + '/' + last]; }
(function () {
  var p0 = PROJECTS[0], urls = [], pairs = [];
  PROJECT_ROOTS.forEach(function (r) { rootChoices(p0).forEach(function (pr) { EXTS.forEach(function (x) { urls.push(imgUrl(r + pr + '/' + p0.cover, x)); pairs.push([r, x]); }); }); });
  firstWorking(urls, function (k) {
    if (k >= 0) { PROJECT_ROOT = pairs[k][0]; PEXT = pairs[k][1]; }
    PROJECTS.forEach(function (p, i) {
      var ch = rootChoices(p);
      firstWorking(ch.map(function (pr) { return imgUrl(PROJECT_ROOT + pr + '/' + p.cover); }), function (j) {
        if (j >= 0) { p.root = ch[j]; setImage(coverBoxes[i], imgUrl(PROJECT_ROOT + p.root + '/' + p.cover), p.title); }
      });
    });
  });
})();
findRoot(CERT_ROOTS, CERTIFICATES[0].file, function (root, x) {
  CERT_ROOT = root; CEXT = x;
  CERTIFICATES.forEach(function (ct, i) { setImage(certBoxes[i], imgUrl(root + ct.file, x), ct.title); });
});

var pc = carousel({ slider: $('pslider'), track: $('ptrack'), prev: $('pprev'), next: $('pnext'), count: $('pcount'), bar: $('pbar') });
var cc = carousel({ slider: $('cslider'), track: $('ctrack'), prev: $('cprev'), next: $('cnext'), count: $('ccount'), bar: $('cbar') });
/* Click the next or previous certificate to bring it to the center */
cc.items.forEach(function (c, k) {
  c.setAttribute('role', 'button'); c.setAttribute('tabindex', '0');
  c.setAttribute('aria-label', 'Certificate: ' + c.querySelector('h3').textContent + '. Opens full screen');
  function go() { if (cc.index() !== k) cc.show(k); else openLb(CERTIFICATES.map(function (ct) { return imgUrl(CERT_ROOT + ct.file, CEXT); }), k); }
  c.addEventListener('click', function () { if (!cc.moved()) go(); });
  c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
});
var cards = pc.items;

/* ---------- Project windows (folders and pictures are set in assets/js/data.js) ---------- */
var dlg = $('dlg');
function addGallery(parent, p, g) {
  var files = g.files || [], gal = el('div', 'gal');
  var urls = files.map(function (f) { return imgUrl(PROJECT_ROOT + p.root + '/' + g.dir + '/' + f); });
  files.forEach(function (f, k) {
    var b = el('button', 'gi'); b.type = 'button'; b.title = f;
    b.setAttribute('aria-label', g.name + ', image ' + (k + 1) + ' of ' + files.length + '. Open full screen');
    var im = new Image(); im.alt = f; im.draggable = false; im.loading = 'lazy'; im.decoding = 'async';
    im.onerror = function () { b.className = 'ph gi'; b.disabled = true; b.textContent = 'Image not found: ' + f; };
    im.src = urls[k]; b.appendChild(im);
    b.addEventListener('click', function () { openLb(urls, k); });
    gal.appendChild(b);
  });
  parent.appendChild(gal);
}
function addGroup(box, p, g) {
  var se = el('section', 'dsec');
  se.appendChild(el('h4', '', g.label || g.name));
  if (g.files && g.files.length) addGallery(se, p, g);
  (g.children || []).forEach(function (c) {
    var sb = el('div', 'dsub'), h5 = el('h5', '', c.label || c.name);
    sb.appendChild(h5); addGallery(sb, p, c); se.appendChild(sb);
  });
  box.appendChild(se);
}
function openProject(i) {
  var p = PROJECTS[i];
  $('dPlace').textContent = p.place || ''; $('dPlace').hidden = !p.place;
  $('dTitle').textContent = p.title;
  $('dCo').textContent = p.company || ''; $('dCo').hidden = !p.company;
  var ul = $('dList'); ul.textContent = ''; ul.hidden = !(p.role && p.role.length);
  (p.role || []).forEach(function (t) { ul.appendChild(el('li', '', t)); });
  var box = $('dSecs'); box.textContent = '';
  var nested = p.groups.some(function (g) { return g.children && g.children.length; });
  if (!nested) {
    p.groups.forEach(function (g) { addGroup(box, p, g); });
  } else {
    /* one tab per folder (A02, B02, C02 ...), its sub-folders shown under it */
    var bar = el('div', 'dtabs'), panel = el('div', 'dpanel');
    bar.setAttribute('role', 'tablist');
    var select = function (k) {
      [].forEach.call(bar.children, function (t, j) { t.classList.toggle('on', j === k); t.setAttribute('aria-selected', j === k ? 'true' : 'false'); });
      panel.textContent = '';
      var g = p.groups[k];
      if (g.files && g.files.length) addGroup(panel, p, { name: g.name, label: g.label, dir: g.dir, files: g.files, children: [] });
      (g.children || []).forEach(function (c) { addGroup(panel, p, c); });
    };
    p.groups.forEach(function (g, k) {
      var t = el('button', 'dtab', g.label || g.name); t.type = 'button'; t.setAttribute('role', 'tab');
      t.addEventListener('click', function () { select(k); });
      bar.appendChild(t);
    });
    box.appendChild(bar); box.appendChild(panel); select(0);
  }
  dlg.scrollTop = 0;
  if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  dlg.scrollTop = 0;
  document.body.classList.add('lock');
}
cards.forEach(function (c, i) {
  c.setAttribute('role', 'button'); c.setAttribute('tabindex', '0');
  c.setAttribute('aria-label', 'Open project details: ' + PROJECTS[i].title);
  function go() { if (pc.index() !== i) pc.show(i); else openProject(i); }
  c.addEventListener('click', function () { if (!pc.moved()) go(); });
  c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
});
$('dClose').addEventListener('click', function () { dlg.close(); });
dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', function () { document.body.classList.remove('lock'); });

/* ---------- Full-screen image viewer with zoom ----------
   Mouse wheel or pinch: zoom.  Drag: move around.  Double-click: zoom in / back.
   Buttons: - + and fit.  Keys: left/right arrows, + - and 0. */
var lb = $('lb'), lbImg = $('lbImg'), lbList = [], lbI = 0;
var zs = 1, zx = 0, zy = 0, ZMAX = 8;
lbImg.draggable = false;
function applyZoom() {
  lbImg.style.transform = 'translate(' + zx + 'px,' + zy + 'px) scale(' + zs + ')';
  $('lbPct').textContent = Math.round(zs * 100) + '%';
  lb.classList.toggle('zoomed', zs > 1.001);
}
function clampPan() {
  var mx = Math.max(0, (lbImg.offsetWidth * zs - innerWidth) / 2 + 80);
  var my = Math.max(0, (lbImg.offsetHeight * zs - innerHeight) / 2 + 80);
  zx = Math.max(-mx, Math.min(mx, zx)); zy = Math.max(-my, Math.min(my, zy));
}
function zoomAt(s2, px, py) {
  s2 = Math.max(1, Math.min(ZMAX, s2));
  var r = lbImg.getBoundingClientRect();
  var cx = r.left + r.width / 2 - zx, cy = r.top + r.height / 2 - zy;
  if (px === undefined) { px = cx; py = cy; }
  zx = (px - cx) - (s2 / zs) * (px - cx - zx);
  zy = (py - cy) - (s2 / zs) * (py - cy - zy);
  zs = s2;
  if (zs <= 1.001) { zs = 1; zx = 0; zy = 0; } else clampPan();
  applyZoom();
}
function resetZoom() { zs = 1; zx = 0; zy = 0; applyZoom(); }
function lbShow(i) {
  lbI = (i + lbList.length) % lbList.length;
  resetZoom();
  var u = lbList[lbI];
  if (lbImg.getAttribute('src') !== u) { lbImg.style.opacity = 0; lbImg.onload = lbImg.onerror = function () { lbImg.style.opacity = 1; }; lbImg.src = u; } else { lbImg.style.opacity = 1; }
  $('lbCount').textContent = (lbI + 1) + ' / ' + lbList.length;
  var one = lbList.length < 2; $('lbPrev').hidden = one; $('lbNext').hidden = one;
}
function openLb(list, k) { lbList = list; lbShow(k); lb.showModal(); }
$('lbPrev').addEventListener('click', function () { lbShow(lbI - 1); });
$('lbNext').addEventListener('click', function () { lbShow(lbI + 1); });
$('lbClose').addEventListener('click', function () { lb.close(); });
$('lbIn').addEventListener('click', function () { zoomAt(zs * 1.5); });
$('lbOut').addEventListener('click', function () { zoomAt(zs / 1.5); });
$('lbFit').addEventListener('click', resetZoom);
lb.addEventListener('close', resetZoom);
lb.addEventListener('wheel', function (e) { e.preventDefault(); zoomAt(zs * Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY); }, { passive: false });
lbImg.addEventListener('dblclick', function (e) { if (zs > 1) resetZoom(); else zoomAt(2.5, e.clientX, e.clientY); });
var pts = {}, pinch0 = 0, pinchS = 1, panStart = null, lbMoved = false;
lb.addEventListener('pointerdown', function (e) {
  if (e.target.closest('button')) return;
  pts[e.pointerId] = { x: e.clientX, y: e.clientY };
  try { lb.setPointerCapture(e.pointerId); } catch (err) {}
  var ids = Object.keys(pts);
  if (ids.length === 1) { panStart = { x: e.clientX, y: e.clientY, zx: zx, zy: zy }; lbMoved = false; }
  if (ids.length === 2) { var a = pts[ids[0]], b = pts[ids[1]]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y); pinchS = zs; lbMoved = true; }
});
lb.addEventListener('pointermove', function (e) {
  if (!pts[e.pointerId]) return;
  pts[e.pointerId] = { x: e.clientX, y: e.clientY };
  var ids = Object.keys(pts);
  if (ids.length === 2 && pinch0) {
    var a = pts[ids[0]], b = pts[ids[1]];
    zoomAt(pinchS * Math.hypot(a.x - b.x, a.y - b.y) / pinch0, (a.x + b.x) / 2, (a.y + b.y) / 2);
  } else if (panStart) {
    var dx = e.clientX - panStart.x, dy = e.clientY - panStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) lbMoved = true;
    if (zs > 1) { zx = panStart.zx + dx; zy = panStart.zy + dy; clampPan(); applyZoom(); }
  }
});
function lbUp(e) {
  if (!pts[e.pointerId]) return;
  /* swipe left/right changes the picture when not zoomed */
  if (panStart && zs === 1 && Object.keys(pts).length === 1 && lbList.length > 1) {
    var dx = e.clientX - panStart.x;
    if (Math.abs(dx) > 60) lbShow(lbI + (dx < 0 ? 1 : -1));
  }
  delete pts[e.pointerId];
  var ids = Object.keys(pts);
  if (ids.length === 1) { var q = pts[ids[0]]; panStart = { x: q.x, y: q.y, zx: zx, zy: zy }; } else if (!ids.length) panStart = null;
  pinch0 = 0;
}
lb.addEventListener('pointerup', lbUp);
lb.addEventListener('pointercancel', lbUp);
lb.addEventListener('click', function (e) { if (e.target === lb && !lbMoved) lb.close(); });
addEventListener('resize', function () { if (lb.open) { clampPan(); applyZoom(); } });
lb.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') lbShow(lbI - 1);
  if (e.key === 'ArrowRight') lbShow(lbI + 1);
  if (e.key === '+' || e.key === '=') zoomAt(zs * 1.5);
  if (e.key === '-') zoomAt(zs / 1.5);
  if (e.key === '0') resetZoom();
});
