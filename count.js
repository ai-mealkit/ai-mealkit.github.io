/* 방문 집계(AI 밀키트 자체) — 쿠키·개인 정보 없이 "어느 페이지 · 무슨 일 · 어디서 왔나 · 오늘 처음인가"만 구글 설문 응답 1줄로 보낸다.
   설문 주소·칸 번호가 비어 있으면 아무것도 보내지 않는다. 놀이터 미리보기(다른 페이지 안에 뜬 앱)는 세지 않는다. */
(() => {
  const F = { url: "https://docs.google.com/forms/d/e/1FAIpQLScpZrbsnDsgX2Z9-qsTTLhjh3Rhixme9nKoNMerbviPTQJbuw/formResponse",
    e: "entry.331128116", p: "entry.559559811", s: "entry.1383172374", n: "entry.695912344" };   // 설문 「AI 밀키트 놀이터 방문 기록」(구글 bigboombs02)
  if (window.top !== window) { window.mkCount = () => {}; return; }
  const page = location.pathname.replace(/^\/+|\/+$/g, "") || "home";
  const ua = navigator.userAgent, ref = document.referrer || "";
  const from = /Instagram/i.test(ua) ? "instagram" : /FBAN|FBAV|FB_IAB/.test(ua) ? "facebook"
    : /musical_ly|TikTok|BytedanceWebview/i.test(ua) ? "tiktok" : /youtube|youtu\.be/i.test(ref) ? "youtube"
    : /threads/i.test(ua + ref) ? "threads" : ref.includes(location.host) ? "inside" : ref ? "other" : "direct";
  function first(key) {                       // 같은 사람(같은 브라우저)의 오늘 첫 번째인가 — 날짜만 저장
    try { const d = new Date().toISOString().slice(0, 10), k = "mk_" + key;
      if (localStorage.getItem(k) === d) return "0"; localStorage.setItem(k, d); return "1"; } catch (e) { return "?"; }
  }
  function send(ev, p) {
    if (!F.url) return;
    p = p || page;
    const q = new URLSearchParams({ [F.e]: ev, [F.p]: p, [F.s]: from, [F.n]: first(ev + ":" + p), submit: "Submit" });
    try { fetch(F.url + "?" + q, { mode: "no-cors", keepalive: true }); } catch (e) { new Image().src = F.url + "?" + q; }
  }
  window.mkCount = send;
  send("view");
})();
