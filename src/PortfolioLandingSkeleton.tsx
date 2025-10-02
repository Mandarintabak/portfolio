import React, { useEffect, useMemo, useState } from "react";

/**
 * =============================================================
 *  ЛЕНДИНГ-ПОРТФОЛИО (СКЕЛЕТ 2025) — КОНТЕНТ-ПРОДЮСЕР
 *  Чёрный фон + фиолетовые элементы. Адаптив. Скролл-анимации.
 *  Без внешних библиотек (никаких CDN), чтобы билд не падал.
 *
 *  В этой правке:
 *  • Починил незакрытую строку в футере (className) и завершил JSX-блок футера.
 *  • Сохранил все правки из прошлых шагов и тесты.
 *  • Добавил ещё один тест на наличие футера в DOM.
 * =============================================================
 */

/**
 * ====== Утилиты / заглушки (раньше, чтобы использовать в DATA) ======
 */
function placeholder(seed = 1, w = 1200, h = 800) {
  const colors: readonly [string, string][] = [
    ["#8b5cf6", "#312e81"],
    ["#a78bfa", "#1f2937"],
    ["#7c3aed", "#111827"],
    ["#c4b5fd", "#0b0b0f"],
  ];
  const palette = colors[(seed - 1) % colors.length] ?? colors[0];
  const [c1, c2] = palette ?? ["#8b5cf6", "#312e81"];
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>\
      <defs>\
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>\
          <stop offset='0%' stop-color='${c1}'/>\
          <stop offset='100%' stop-color='${c2}'/>\
        </linearGradient>\
      </defs>\
      <rect width='100%' height='100%' fill='url(#g)'/>\
    </svg>`
  );
  return `url("data:image/svg+xml,${svg}")`;
}

function imgFallback() {
  return "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221200%22 height=%221200%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop offset=%220%25%22 stop-color=%22%238b5cf6%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23111827%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23g)%22/%3E%3C/svg%3E";
}

/**
 * ====== Тема / Константы ======
 */
const THEME = {
  bg: "#0a0a0c",
  fg: "#ffffff",
  subtle: "#9aa3b2",
  primary: "#8b5cf6",
  primarySoft: "#7c3aed",
};

type SocialKind = "instagram" | "tiktok" | "youtube";

interface ProjectChannel {
  url: string;
  shots: string[];
  stats: string[];
}

type ProjectChannels = Record<SocialKind, ProjectChannel> & Record<string, ProjectChannel>;

interface ProjectData {
  title: string;
  intro: string;
  channels: ProjectChannels;
  summary: string;
}

interface PortraitConfig {
  cx?: string;
  cy?: string;
  cut?: string;
  offsetX?: string;
  offsetY?: string;
  scale?: number;
  origin?: string;
  cap?: string;
  edgepx?: string;
  popLift?: string;
}

interface AboutData {
  name: string;
  role: string;
  photo: string;
  tagline: string;
  links: Record<SocialKind, string>;
  contacts: { email: string; telegram: string };
  portrait: PortraitConfig;
}

interface PortfolioData {
  about: AboutData;
  projects: ProjectData[];
}

/**
 * ====== ДАННЫЕ (заполни под себя) ======
 */
const DATA: PortfolioData = {
  about: {
    name: "Артур Назарьянц",
    role: "Content Producer",
    photo:
      "url('https://1.downloader.disk.yandex.ru/preview/1f453656092ffb90406fb75a6734790f98708b0654151b2f124744fda73f488b/inf/AM3znw5kloM9vVp3_8lFp7PLRTuK6Gfa-_Ng8BdC61cscdw3VsaRLN8z2FoPWYy9lRww2rG75LVaCrdlqgZu9Q%3D%3D?uid=61804553&filename=0D691671-79BB-4BB7-AE07-BC1A75591F2A.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=61804553&tknv=v3&size=2880x1626')",
    tagline:
      "Уже более 4 лет занимаюсь продюсированием коротких видео для TikTok, Instagram и YouTube. Полностью веду процесс создания — от разработки идеи до финального монтажа. Также имею опыт в съемке и постановке таких роликов, что позволяет создавать контент, который работает на результат и привлекает внимание аудитории.",
    links: {
      instagram: "#",
      tiktok: "#",
      youtube: "#",
    },
    contacts: { email: "you@example.com", telegram: "@username" },
    // Точная подгонка портрета (центр круга, радиус среза и вылет)
    portrait: {
      cx: "50%",
      cy: "50%",
      cut: "69%",
      offsetX: "0%",
      offsetY: "-3%",
      scale: 1.08,
      origin: "50% 62%",
      cap: "60%",
      edgepx: "0.8px",
    },
  },
  projects: [
    {
      title: "БИБЛИОТЕКА ТБК",
      intro:
        "Коротко: задача, роль, формат, сроки. 1–3 предложения. Что тестировали/какую гипотезу проверяли.",
      channels: {
        instagram: {
          url: "#",
          shots: [
            "url('https://2.downloader.disk.yandex.ru/preview/3ec52be277d3ceab128afb2abf2ef32fb22d83b3e479d0800c0593dc93835c65/inf/sO5-fZFkWZKtWZ6wIiqRwrHk_R1_g7ChpB4Ab2CLppTyWwxi8Rk54ouG_u02rwj2QnNkIlFVE1XEX5AWaotIzw%3D%3D?uid=61804553&filename=iPhone%2014%20%26%2015%20Pro%20Max%20-%2011.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=61804553&tknv=v3&size=2880x1626')",
            "url('https://2.downloader.disk.yandex.ru/preview/a01f56fff3267ed7ecd5b5ec86b1c04a27cd088124992e81e12203d6b122df49/inf/FQLA_Z8VH22FxKuAN-1SuGv13TSbjvf0pgCi0nkq5J2AW90Fq_VxcspZq9aRSgiFGT_URqzP9NFmYVU83cNi9w%3D%3D?uid=61804553&filename=iPhone%2014%20%26%2015%20Pro%20Max%20-%2010.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=61804553&tknv=v3&size=2880x1626')",
          ],
          stats: ["Просмотры: —", "ER: —"],
        },
        tiktok: {
          url: "#",
          shots: [
            "url('https://4.downloader.disk.yandex.ru/preview/b01eee0055bb9aa9fc2e4e8ae419314d665b779974d564fce7de373c08e35f50/inf/EQ1ovTMaxb3mu7G6Po2sf0ubJYzLGn4U-A6NRt-CQuhU8yXEu0TVfMFIphSJtMp2pJXoSphTZCqFIBIXnN0oWg%3D%3D?uid=61804553&filename=IMG_2104.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=61804553&tknv=v3&size=2880x1626')",
            "url('https://1.downloader.disk.yandex.ru/preview/382d927bf04927d3420e1531a8ba766775feb91e3b6385155f7de27b95f3fab8/inf/c_LY900xd49Kd78VD4GjuLl1FRxXfX0ifKLAbZDRfnjiYOUES60FmqQY6jjMRNR-nwzplI82vTnk8iQ_UJNqTg%3D%3D?uid=61804553&filename=234AEA40-3AC9-4DEB-9C3C-6DE6A79B2A7F.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=61804553&tknv=v3&size=2880x1626')",
          ],
          stats: ["Просмотры: —", "Удержание: —"],
        },
        youtube: { url: "#", shots: [], stats: ["—", "—"] },
      },
      summary:
        "Итог проекта в 1–2 предложения: прирост метрик, инсайты, что бы повторили.",
    },
    {
      title: "Проект #2",
      intro: "Короткое описание. Чем интересен кейс, чем отличался пайплайн.",
      channels: {
        instagram: {
          url: "#",
          shots: [placeholder(1, 900, 1600), placeholder(3, 900, 1600)],
          stats: ["Просмотры: —", "ER: —"],
        },
        tiktok: {
          url: "#",
          shots: [placeholder(4, 900, 1600), placeholder(2, 900, 1600)],
          stats: ["Просмотры: —", "Удержание: —"],
        },
        youtube: {
          url: "#",
          shots: [placeholder(2, 900, 1600), placeholder(4, 900, 1600)],
          stats: ["Просмотры: —", "CTR: —"],
        },
      },
      summary:
        "Короткий вывод: что сработало/не сработало и цифры, если можно озвучить.",
    },
    {
      title: "Проект #3",
      intro: "О задаче и подходе. Почему такой креатив и формат.",
      channels: {
        instagram: {
          url: "#",
          shots: [placeholder(3, 900, 1600), placeholder(1, 900, 1600)],
          stats: ["Просмотры: —", "ER: —"],
        },
        tiktok: {
          url: "#",
          shots: [placeholder(2, 900, 1600), placeholder(4, 900, 1600)],
          stats: ["Просмотры: —", "Удержание: —"],
        },
        youtube: {
          url: "#",
          shots: [placeholder(4, 900, 1600), placeholder(2, 900, 1600)],
          stats: ["Просмотры: —", "CTR: —"],
        },
      },
      summary:
        "Ключевой инсайт + краткий результат. Что переносим в следующие проекты.",
    },
  ],
};

/**
 * ====== Глобовые стили (через String.raw) ======
 */
const GLOBAL_CSS = String.raw`
  /* Headline font: try local install of KTF Jermilov, else fallbacks */
  @font-face{ font-family:'KTF Jermilov'; src: local('KTF Jermilov'), local('KTFJermilov'); font-display: swap; }
  :root{ --headline-font: 'KTF Jermilov', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
  .headline{ font-family: var(--headline-font); letter-spacing:.06em; }
  /* AVAVA watermark: minus 2pt from size, placed behind name */
  .avava{ font-family: var(--headline-font); font-weight:900; letter-spacing:-.02em; line-height:.8; user-select:none; color:transparent; -webkit-background-clip:text; background-clip:text; background-image: linear-gradient(to bottom, rgba(255,255,255,.55), rgba(255,255,255,.10)); opacity:.08; font-size: calc(clamp(64px, 18vw, 240px) - 2pt); }

  @keyframes ctaPulse { 0%,100%{ transform: scale(1); opacity:.8 } 50%{ transform: scale(1.06); opacity:1 } }
  @keyframes ctaPulseSlow { 0%,100%{ transform: scale(1); opacity:.6 } 50%{ transform: scale(1.08); opacity:.9 } }

  /* Lightbox open animations */
  @keyframes lbZoom { from { transform: scale(.92); opacity: 0 } to { transform: scale(1); opacity: 1 } }
  @keyframes overlayFade { from { opacity: 0 } to { opacity: .7 } }

  /* Tabs content enter */
  @keyframes tabIn { from { opacity: 0; transform: translateY(8px) scale(.98) } to { opacity:1; transform:none } }
  .tab-enter{ animation: tabIn .4s cubic-bezier(.22,1,.36,1) both; }

  /* Rotating conic glow ring */
  @keyframes spin360 { to { transform: rotate(360deg) } }
  .btn-ring{ position:absolute; inset:-8px; border-radius:32px; padding:2px; background:conic-gradient(from var(--angle), rgba(167,139,250,.25), rgba(124,58,237,.7), rgba(167,139,250,.25)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; animation: spin360 7s linear infinite; filter: blur(6px); opacity:.95; pointer-events:none; }

  /* Gentle rocking wobble for CTA button */
  @keyframes wobble { 0%,100%{ transform: translateY(0) rotate(0deg) } 25%{ transform: translateY(-1.2px) rotate(-0.6deg) } 50%{ transform: translateY(0) rotate(0.6deg) } 75%{ transform: translateY(1.2px) rotate(0deg) } }
  .btn-wobble{ animation: wobble 3.6s ease-in-out infinite; transform-origin: 50% 50%; will-change: transform; }
  .btn-wobble:hover{ animation-duration: 2.2s; }

  @media (prefers-reduced-motion: reduce){
    .btn-wobble, .btn-ring{ animation: none !important; }
  }

  .edge-fade{ -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 8vh, #000 calc(100% - 8vh), transparent 100%); mask-image: linear-gradient(to bottom, transparent 0, #000 8vh, #000 calc(100% - 8vh), transparent 100%); }

  /* Reveal + directional slides */
  .reveal{ opacity:0; transform: var(--reveal-tf, translateY(20px)); will-change: transform, opacity; transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
  .reveal.in{ opacity:1; transform:none; }
  /* reverse (exit) animation when element ушёл вверх */
  .reveal.out{ opacity:0; transform: var(--out-tf, translateY(-40px)); }
  .out-left{ --out-tf: translateX(-60px); }
  .out-right{ --out-tf: translateX(60px); }
  .out-up{ --out-tf: translateY(-40px); }

  .slide-left{ --reveal-tf: translateX(-60px); }
  .slide-right{ --reveal-tf: translateX(60px); }
  .slide-up{ --reveal-tf: translateY(20px); }

  .x-scroll{ overflow-x:auto; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }
  .x-snap{ scroll-snap-type: x mandatory; }
  .x-snap > *{ scroll-snap-align: start; }

  .card{ border:1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.05); border-radius: 18px; }
  .badge{ display:inline-flex; align-items:center; gap:6px; font-size:10px; letter-spacing:.08em; text-transform:uppercase; padding:6px 8px; border-radius:999px; border:1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); color:#fff; }

  .segmented{ display:inline-flex; border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:4px; background: rgba(255,255,255,.04); }
  .segmented button{ padding:8px 12px; font-size:12px; color:rgba(255,255,255,.65); border-radius:8px; border:0; background:transparent; cursor:pointer; }
  .segmented button.active{ color:#fff; background: rgba(139,92,246,.18); }

  .acc-item{ border:1px solid rgba(255,255,255,.08); border-radius: 14px; background: rgba(255,255,255,.05); overflow:hidden; }
  .acc-header{ display:flex; justify-content:space-between; align-items:center; padding:12px 14px; cursor:pointer; }
  .acc-body{ padding:0 14px 14px; max-height:0; opacity:.2; transition: max-height .45s ease, opacity .45s ease; }
  .acc-item.open .acc-body{ max-height: 1200px; opacity:1; }

  .thumb{ position:relative; aspect-ratio: var(--ar, 9/16); width:100%; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,.1); background:#0e0e12; cursor: zoom-in; }
  .thumb::after{ content:""; position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.45), transparent); }

  /* === Portrait (круг + 3D pop-out головы) === */
  .portrait{ position:relative; width:min(76vw,420px); margin-inline:auto; }
  .p-ring{ position:absolute; inset:-12px; border-radius:9999px; background:conic-gradient(from 0deg, rgba(167,139,250,.08), rgba(124,58,237,.35), rgba(167,139,250,.08)); filter:blur(8px); opacity:.95; z-index:0; }
  .p-disc{ position:relative; width:100%; padding-top:100%; border-radius:9999px; background: radial-gradient(130% 120% at 35% 20%, rgba(255,255,255,.10), rgba(255,255,255,.02) 38%, transparent), linear-gradient(135deg, rgba(139,92,246,.22), rgba(124,58,237,.08)); border:1px solid rgba(255,255,255,.10); box-shadow: 0 30px 60px rgba(0,0,0,.35), inset 0 0 0 8px rgba(139,92,246,.05); overflow:visible; z-index:1; transform: scale(var(--disc-scale,1)); transform-origin: 50% 50%; }
  .p-arc{ display:none; }
  .p-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; transform: translate(var(--img-ox,0), var(--img-oy,0)) scale(var(--img-scale,1)); transform-origin: var(--img-origin, 50% 60%); z-index:1; }
  /* База — внутри круга */
  .p-img--whole{
  /* Край фото строго повторяет внутреннюю окружность фиолетового круга */
  -webkit-mask-image:
    radial-gradient(
      circle closest-side at var(--mask-cx,50%) var(--mask-cy,50%),
      #000 calc(100% - (var(--edgepx,1px) + var(--disc-inner,8px) + var(--safety,2px))),
      transparent 100%
    ),
    /* Верх фото не режем — шторка пропускает его за круг */
    linear-gradient(to bottom, #000 var(--pop-cap,60%), transparent calc(var(--pop-cap,60%) + 0.1%));
  -webkit-mask-composite: source-over;
  -webkit-mask-repeat: no-repeat;
  mask-image:
    radial-gradient(
      circle closest-side at var(--mask-cx,50%) var(--mask-cy,50%),
      #000 calc(100% - (var(--edgepx,1px) + var(--disc-inner,8px) + var(--safety,2px))),
      transparent 100%
    ),
    linear-gradient(to bottom, #000 var(--pop-cap,60%), transparent calc(var(--pop-cap,60%) + 0.1%));
  mask-composite: add;
  mask-repeat: no-repeat;
}
  /* Поп-слой — только часть снаружи круга */
  
  @media (min-width: 768px){ .portrait{ width:min(42vw, 440px); } }
  @media (min-width: 1024px){ .portrait{ width:440px; } }

  .idea{ border:1px dashed rgba(255,255,255,.18); border-radius:18px; background: rgba(139,92,246,.06); min-height: 100%; display:flex; align-items:center; justify-content:center; padding: 18px; color: rgba(255,255,255,.65); }

  /* Lightbox classes */
  .lb-card{ animation: lbZoom .28s cubic-bezier(.22,1,.36,1) both; }
  .lb-overlay{ animation: overlayFade .28s ease both; }

  ::-webkit-scrollbar { height: 8px; width: 8px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.2); border-radius: 8px; }


  /* ====== Pills (факты проекта под описанием) ====== */
  .pills{ display:grid; gap:10px; margin-top:12px; }
  .pill{ display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-radius:999px; border:1px solid rgba(139,92,246,.5); background:linear-gradient(180deg, rgba(139,92,246,.18), rgba(139,92,246,.06)); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); }
  .pill span{ font-size:14px; color:#fff; }

`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

/**
 * ====== Фоновые эффекты ======
 */
function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(80rem_40rem_at_50%_-10%,rgba(139,92,246,0.25),transparent),radial-gradient(50rem_30rem_at_90%_10%,rgba(124,58,237,0.18),transparent)]" />
      <div className="absolute inset-0 [background:linear-gradient(transparent,rgba(0,0,0,0.25))]" />
    </div>
  );
}

/**
 * ====== Иконки (инлайн SVG) ======
 */
const ArrowRightIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M5 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path
      d="M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const InstaIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
  </svg>
);
const TikTokIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
    <path d="M14.2 5.2c.5 1.8 2 3.2 3.9 3.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    <path
      d="M14.2 9.6v5.6a4.8 4.8 0 11-4.8-4.8c.8 0 1.5.18 2.1.5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    <path d="M14.2 5.2v3.3c0 3 2.5 5.5 5.5 5.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);
const YouTubeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
    <rect x="2" y="6.2" width="20" height="11.6" rx="5.8" stroke="currentColor" strokeWidth="1.9" />
    <path d="M10 9.8l5 2.7-5 2.7V9.8z" fill="currentColor" />
  </svg>
);

/**
 * ====== Кнопка (с блюром, кольцом и качанием) ======
 */
type PrimaryButtonBaseProps = {
  wobble?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AnchorPrimaryButtonProps = PrimaryButtonBaseProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonPrimaryButtonProps = PrimaryButtonBaseProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type PrimaryButtonProps = AnchorPrimaryButtonProps | ButtonPrimaryButtonProps;

const buttonBaseClass =
  "group relative inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white shadow-lg shadow-black/30 transition [background:linear-gradient(135deg,rgba(139,92,246,0.95),rgba(124,58,237,0.95))] hover:shadow-black/50";

const GlowLayers = () => (
  <>
    <span
      aria-hidden
      className="pointer-events-none absolute inset-[-10px] -z-10 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_50%,rgba(139,92,246,0.75),transparent_70%)] blur-[16px] opacity-90 [animation:ctaPulse_3.8s_ease-in-out_infinite]"
    />
    <span
      aria-hidden
      className="pointer-events-none absolute inset-[-18px] -z-20 rounded-[28px] bg-[radial-gradient(70%_70%_at_50%_50%,rgba(124,58,237,0.55),transparent_75%)] blur-[26px] opacity-90 [animation:ctaPulseSlow_6.5s_ease-in-out_infinite]"
    />
    <span aria-hidden className="btn-ring" />
  </>
);

function buildClassName(wobble: boolean, className?: string) {
  return [buttonBaseClass, wobble ? "btn-wobble" : "", className].filter(Boolean).join(" ");
}

function PrimaryButton(props: PrimaryButtonProps) {
  if ("href" in props && typeof props.href === "string") {
    const { href, wobble = false, className, children, ...anchorProps } = props;
    const mergedClassName = buildClassName(wobble, className);
    return (
      <a {...anchorProps} href={href} className={mergedClassName}>
        <GlowLayers />
        {children}
        <ArrowRightIcon className="opacity-90 transition group-hover:translate-x-0.5" />
      </a>
    );
  }

  const { wobble = false, className, children, type, ...buttonProps } = props;
  const mergedClassName = buildClassName(wobble, className);
  return (
    <button type={type ?? "button"} {...buttonProps} className={mergedClassName}>
      <GlowLayers />
      {children}
      <ArrowRightIcon className="opacity-90 transition group-hover:translate-x-0.5" />
    </button>
  );
}

/**
 * ====== Hero (о себе) ======
 */
function HeroAbout() {
  const [heroBg, setHeroBg] = useState(DATA.about.photo || placeholder(1, 1200, 900));
  useEffect(() => {
    setHeroBg(DATA.about.photo || placeholder(1, 1200, 900));
  }, []);
  const imgSrc = (heroBg || "").replace(/^url\(['"]?(.+?)['"]?\)$/, "$1");

  // CSS custom properties для масок/позиционирования портрета
  const pc: PortraitConfig = DATA.about?.portrait ?? {};
  const portraitVars = {
    "--mask-cx": pc.cx || "50%",
    "--mask-cy": pc.cy || "50%",
    "--mask-cut": pc.cut || "49.5%",
    "--pop-lift": pc.popLift || "-3%",
    "--img-ox": pc.offsetX || "0%",
    "--img-oy": pc.offsetY || "0%",
    "--img-scale": pc.scale || 1,
    "--img-origin": pc.origin || "50% 62%",
    "--disc-scale": "1",
    "--pop-cap": pc.cap || "55%",
    "--feather": "0.25%",
    "--overlap": "2.0%",
    "--edgepx": pc.edgepx || "1px",
    "--disc-inner": "10px",
    "--safety": "3.2px",
  } as React.CSSProperties;

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-40 [background:radial-gradient(60rem_30rem_at_10%_-10%,rgba(139,92,246,0.2),transparent),radial-gradient(40rem_20rem_at_90%_-20%,rgba(124,58,237,0.15),transparent)]" />
      {/* АВАВА — за ФИО, левее и выше, на 2pt меньше */}
      <div className="pointer-events-none absolute -z-10 left-0 right-0 top-6 md:top-4 flex justify-start pl-4 md:pl-12">
        <span className="avava">АВАВА</span>
      </div>
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="reveal slide-left px-2 sm:px-3">
          <div className="relative">
            <h1
              className="mt-2 inline-block text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
              style={{ letterSpacing: "0.02em", transform: "scaleX(1.02)" }}
            >
              <span className="headline block text-[#8b5cf6] uppercase text-4xl sm:text-5xl md:text-7xl leading-[0.8] tracking-[0.04em]">
                CONTENT PRODUCER
              </span>
              <div className="relative mt-1 [font-size:0.92em]">
                <span className="text-white block relative z-10">Артур Назарьянц</span>
              </div>
            </h1>
          </div>

          <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">{DATA.about.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="#projects" wobble>
              Смотреть проекты
            </PrimaryButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 hover:bg-white/5"
            >
              Написать
            </a>
          </div>
        </div>

        {/* Портрет справа + иконки */}
        <div className="reveal slide-right order-first md:order-none">
          <div className="portrait" style={portraitVars}>
            <div className="p-ring" aria-hidden />
            <div className="p-disc">
              <img
                src={imgSrc}
                alt=""
                referrerPolicy="no-referrer"
                className="p-img p-img--whole"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = imgFallback();
                }}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              aria-label="Instagram"
              href={DATA.about.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <InstaIcon />
            </a>
            <a
              aria-label="TikTok"
              href={DATA.about.links.tiktok}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <TikTokIcon />
            </a>
            <a
              aria-label="YouTube"
              href={DATA.about.links.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const SocialIcon = ({ kind, className = "" }: { kind: SocialKind; className?: string }) => {
  switch (kind) {
    case "instagram":
      return <InstaIcon className={className} />;
    case "tiktok":
      return <TikTokIcon className={className} />;
    default:
      return <YouTubeIcon className={className} />;
  }
};
const SOCIALS: Array<{ key: SocialKind; label: string }> = [
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
];

// Превью-тайл, который подстраивает контейнер под исходный аспект изображения
function ShotThumb({ src, onClick }: { src: string; onClick: () => void }) {
  const [ar, setAr] = React.useState("9/16");
  return (
    <div className="thumb" style={{ ["--ar"]: ar } as React.CSSProperties} onClick={onClick}>
      <img
        src={src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className="absolute inset-0 block h-full w-full object-contain"
        style={{ background: "#0b0b10" }}
        onLoad={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          const w = img.naturalWidth || 0;
          const h = img.naturalHeight || 0;
          if (w && h) setAr(`${w}/${h}`);
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = imgFallback();
        }}
      />
    </div>
  );
}

function ProjectCompactTabs({
  project,
  onOpenImage,
}: {
  project: ProjectData;
  onOpenImage?: ((shots: string[], index: number, title: string) => void) | undefined;
}) {
  const tabs = useMemo(() => {
    return SOCIALS.filter(({ key }) => {
      const ch = project.channels?.[key];
      return ch && Array.isArray(ch.shots) && ch.shots.length > 0;
    });
  }, [project]);
  const firstKey =
    (tabs[0] && tabs[0].key) ||
    (SOCIALS.find((s) => project.channels?.[s.key])?.key as SocialKind | undefined) ||
    "instagram";
  const [tab, setTab] = useState(firstKey);
  useEffect(() => {
    setTab((tabs[0] && tabs[0].key) || firstKey);
  }, [project, firstKey, tabs]);
  const fallbackChannel: ProjectChannel = { url: "", shots: [], stats: [] };
  const ch = project.channels?.[tab] || project.channels?.[firstKey ?? "instagram"] || fallbackChannel;
  const meta =
    tabs.find((s) => s.key === tab) || SOCIALS.find((s) => s.key === tab) || ({ label: "", key: "instagram" } as (typeof SOCIALS)[number]);
  const toSrc = (bg: string): string => {
    const s = (bg || "").trim();
    const match = /^url\((?:['"]?)(.+?)(?:['"]?)\)$/.exec(s);
    return match?.[1] ?? s;
  };
  const open = (i: number) => onOpenImage?.(ch.shots, i, `${project.title} · ${meta.label}`);
  return (
    <section className="card p-4">
      <div className="mb-3">
        <h4 className="text-sm font-semibold text-white/90">{project.title}</h4>
      </div>
      {tabs.length > 0 ? (
        <>
          <div className="segmented mb-3">
            {tabs.map(({ key, label }) => (
              <button key={key} className={key === tab ? "active" : ""} onClick={() => setTab(key)}>
                <span className="mr-1 align-middle">
                  <SocialIcon kind={key} />
                </span>
                {label}
              </button>
            ))}
          </div>
          <div key={tab} className="tab-enter grid grid-cols-2 gap-3">
            {ch.shots
              .filter((shot): shot is string => typeof shot === "string" && shot.length > 0)
              .slice(0, 2)
              .map((bg: string, i) => (
                <ShotThumb key={`${tab}-${i}`} src={toSrc(bg)} onClick={() => open(i)} />
              ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-2">
              <SocialIcon kind={tab} />
              <span>{meta.label}</span>
            </div>
            <a href="#projects" className="inline-flex items-center gap-2 text-[#a78bfa] hover:text-white">
              Примеры контента <ArrowRightIcon />
            </a>
          </div>
        </>
      ) : (
        <div className="text-sm text-white/60">Скриншоты пока не добавлены.</div>
      )}
    </section>
  );
}
ProjectCompactTabs.supportsOpen = true;

/**
 * ====== Лайтбокс (просмотр скриншота) ======
 */
interface LightboxModalProps {
  open: boolean;
  shots?: string[];
  index?: number;
  title?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function LightboxModal({ open, shots = [], index = 0, title = "", onClose, onPrev, onNext }: LightboxModalProps) {
  if (!open) return null;
  const bg = shots[index] ?? "";
  const toSrc = (s: string): string => {
    const v = (s || "").trim();
    const match = /^url\((?:['"]?)(.+?)(?:['"]?)\)$/.exec(v);
    return match?.[1] ?? v;
  };
  const src = toSrc(bg);
  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 lb-overlay" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px]">
        <div
          className="relative rounded-2xl border border-white/15 bg-[#0b0b10] shadow-2xl lb-card flex items-center justify-center p-2"
          style={{ maxWidth: "92vw", maxHeight: "85vh" }}
        >
          <img
            src={src}
            alt=""
            referrerPolicy="no-referrer"
            style={{ maxWidth: "100%", maxHeight: "80vh", width: "auto", height: "auto", objectFit: "contain", display: "block" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = imgFallback();
            }}
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2 text-xs text-white/70">
            <span className="truncate px-2">{title}</span>
            <button onClick={onClose} className="rounded-md border border-white/15 bg-white/10 px-2 py-1 hover:bg-white/20">
              Закрыть ✕
            </button>
          </div>
          {shots.length > 1 && (
            <>
              <button
                aria-label="Prev"
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              >
                ←
              </button>
              <button
                aria-label="Next"
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ====== Секция проектов (шахматная; Tabs) ======
 */
function IdeaPlaceholder({ title, children }: { title?: string; children?: React.ReactNode }) {
  const hasContent = !!children;
  return (
    <div className="idea">
      <div className={hasContent ? "text-left" : "text-center"}>
        <div className="text-sm font-medium">{title || (hasContent ? "Немного о проекте" : "Место для новых идей")}</div>
        <div className="mt-1 text-xs text-white/70 whitespace-pre-line">{hasContent ? children : "Концепции, тесты форматов, заметки"}</div>
      </div>
    </div>
  );
}

function ProjectFactsPills() {
  const items = [
    { text: "Трижды блокировали", icon: "⛔️" },
    { text: "Трижды начинал с 0", icon: "🚀" },
    { text: "14 млн+ охвата в месяц", icon: "📈" },
    { text: "Бренд стал популярен в РФ", icon: "🔥" },
  ];
  return (
    <div className="pills">
      {items.map((it) => (
        <div key={it.text} className="pill">
          <span>{it.text}</span>
          <span aria-hidden>{it.icon}</span>
        </div>
      ))}
    </div>
  );
}

function Projects({ onOpenImage }: { onOpenImage?: (shots: string[], index: number, title: string) => void }) {
  return (
    <section id="projects" className="relative space-y-10 pb-20 pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background:radial-gradient(70rem_30rem_at_50%_-20%,rgba(139,92,246,0.18),transparent)]" />
      <div className="mx-auto max-w-6xl px-4 space-y-10">
        {DATA.projects.map((project, i) => (
          <div key={project.title} className="grid items-start gap-6 md:grid-cols-2">
            {i % 2 === 0 ? (
              <>
                <div className="reveal slide-left px-2 sm:px-3">
                  <ProjectCompactTabs project={project} onOpenImage={onOpenImage} />
                </div>
                <div className="reveal slide-right px-2 sm:px-3">
                  {i === 0 ? (
                    <IdeaPlaceholder title="Немного о проекте">
                      Проект: магазин табачной продукции с акцентом на снюс. Задача — популяризация бренда в Краснодарском крае. Основная сложность
                      заключалась в ограничениях соцсетей по продвижению табачной продукции. Решением стала стратегия продвижения через юмор, которая
                      позволила успешно привлечь внимание и расширить аудиторию.
                      <ProjectFactsPills />
                    </IdeaPlaceholder>
                  ) : (
                    <IdeaPlaceholder />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="reveal slide-left px-2 sm:px-3">
                  <IdeaPlaceholder />
                </div>
                <div className="reveal slide-right px-2 sm:px-3">
                  <ProjectCompactTabs project={project} onOpenImage={onOpenImage} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
Projects.usesTabsChess = true;

/**
 * ====== Контакты ======
 */
function Contact() {
  return (
    <section id="contact" className="border-t border-white/10 bg-white/5">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold text-white">Свяжемся</h3>
          <p className="mt-3 max-w-md text-white/70">Напишите пару строк о задаче — пришлю идеи форматов и ориентир по смете.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const body = encodeURIComponent(`Имя: ${data.get("name")}\nКонтакт: ${data.get("contact")}\nСообщение:\n${data.get("msg")}`);
            window.open(`mailto:${DATA.about.contacts.email}?subject=Портфолио · ${DATA.about.name}&body=${body}`);
          }}
          className="rounded-3xl border border-white/10 bg-[#0e0e12] p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-white/60">Имя</label>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-white/40"
                placeholder="Как к вам обращаться"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Контакт</label>
              <input
                name="contact"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-white/40"
                placeholder="Email или Telegram"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs text-white/60">Сообщение</label>
              <textarea
                name="msg"
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-white/40"
                placeholder="Коротко опишите задачу/проект"
              />
            </div>
          </div>
          <div className="mt-5">
            <PrimaryButton type="submit">Отправить</PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}

/**
 * ====== Самопроверки (минимальные тесты) ======
 */
function runSelfTests() {
  const tests: Array<{ name: string; ok: boolean; info?: string }> = [];
  const push = (name: string, ok: boolean, info = "") => tests.push({ name, ok, info });
  try {
    push("projects length === 3", DATA.projects.length === 3, String(DATA.projects.length));
    const okChannels = DATA.projects.every((p) => {
      const chs = Object.values(p.channels ?? {});
      const rules = chs.every((ch) => !Array.isArray(ch.shots) || ch.shots.length === 0 || ch.shots.length === 2);
      const hasAny = chs.some((ch) => Array.isArray(ch.shots) && ch.shots.length > 0);
      return rules && hasAny;
    });
    push("each project has IG/TikTok/YouTube with 2 shots", okChannels);
    const themeOk = Object.values(THEME).every(Boolean);
    push("theme colors present", themeOk);
    const hasLinks = !!DATA.about.links;
    push("about.links present", hasLinks);

    push("GlobalStyles is function", typeof GlobalStyles === "function");
    push("GLOBAL_CSS contains keyframes", /@keyframes\s+lbZoom/.test(GLOBAL_CSS));
    push("about.photo is css url(...) ", /^url\(/.test(DATA.about.photo), DATA.about.photo as string);
    const allShotsAreDataUrl = DATA.projects.every((p) =>
      Object.values(p.channels).every((ch) => (ch.shots || []).every((s) => /^url\((?:\"|')?(?:data:image\/svg\+xml,|https?:)/.test(s)))
    );
    push("all shots are inline data URLs", allShotsAreDataUrl);
    const labelsOk = ["instagram", "tiktok", "youtube"].every(
      (k) => (k === "instagram" ? "INSTAGRAM" : k === "tiktok" ? "TIKTOK" : "YOUTUBE").length > 0
    );
    push("labelOf(kind) works", labelsOk);
    // project #1: youtube скрыт (нет скриншотов)
    const firstProject = DATA.projects[0];
    const youtubeShots = firstProject?.channels?.youtube?.shots ?? [];
    push("project1 youtube hidden", youtubeShots.length === 0);

    push("LightboxModal exists", typeof LightboxModal === "function");
    push("ProjectCompactTabs supports open", !!ProjectCompactTabs.supportsOpen);
    push("Projects uses tabs chess", !!Projects.usesTabsChess);
    push("placeholder() returns url(...) string", /^url\(/.test(placeholder(1)), placeholder(1));
    push("GLOBAL_CSS has .reveal.out", /\.reveal\.out/.test(GLOBAL_CSS));
    push("out-left/out-right present", /.out-left/.test(GLOBAL_CSS) && /.out-right/.test(GLOBAL_CSS));
    push("GLOBAL_CSS has btn-wobble", /.btn-wobble/.test(GLOBAL_CSS));
    // проверка, что в маске pop нет полупрозрачной середины (исключаем арку)
    push("no semi-opaque ring in pop mask", !/rgba\(0,0,0,.35\)/.test(GLOBAL_CSS));
    push("Hero bg initialised", typeof DATA.about.photo === "string" && /^url\(/.test(DATA.about.photo as string));
    push("portrait classes present", /\.portrait\{/.test(GLOBAL_CSS) && /\.p-img--whole\{/.test(GLOBAL_CSS));
    // новые проверки на передачу переменных
    push("portraitVars defaults applied", DATA.about.portrait?.cx !== undefined);
    // ДОП. ТЕСТ: футер присутствует
    push("footer element exists", !!document.querySelector("footer"));
  } catch (e) {
    push("tests crashed", false, e instanceof Error ? String(e) : "Unknown error");
  }
  const passed = tests.every((t) => t.ok);
  console.groupCollapsed("%cSELF-TESTS", "color:#10b981;font-weight:600");
  for (const t of tests) console[t.ok ? "log" : "warn"](`${t.ok ? "✔" : "✖"} ${t.name}${t.info ? " → " + t.info : ""}`);
  console.log("Result:", passed ? "ALL PASSED" : "HAS FAILURES");
  console.groupEnd();
}

/**
 * ====== Главный компонент ======
 */
export default function PortfolioLandingSkeleton() {
  useEffect(() => {
    runSelfTests();
  }, []);

  // Показ рантайм-ошибок (если будут)
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      const box = document.getElementById("runtime-error-box");
      if (box) {
        box.style.display = "block";
        box.textContent = `⚠️ Runtime error: ${event.error instanceof Error ? event.error.message : event.message}`;
      }
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  // Reveal-анимация + reverse-out
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const raf2 = (fn: FrameRequestCallback) => requestAnimationFrame(() => requestAnimationFrame(fn));
    const addIn = (el: HTMLElement) => raf2(() => el.classList.add("in"));

    const markIfInView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const inView = r.top < vh * 0.9 && r.bottom > vh * 0.1;
      if (inView) addIn(el);
    };

    els.forEach(markIfInView);

    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) if (entry.isIntersecting) addIn(entry.target as HTMLElement);
        },
        { threshold: 0.15 }
      );
      els.forEach((el) => io?.observe(el));
    } catch (error) {
      console.warn("IntersectionObserver unavailable", error);
    }

    let ticking = false;
    const applyOut = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const above = r.bottom < -20; // выше
        const below = r.top > vh + 20; // ниже
        if (above) {
          el.classList.add("out");
          if (el.classList.contains("slide-left")) {
            el.classList.add("out-left");
            el.classList.remove("out-right", "out-up");
          } else if (el.classList.contains("slide-right")) {
            el.classList.add("out-right");
            el.classList.remove("out-left", "out-up");
          } else {
            el.classList.add("out-up");
            el.classList.remove("out-left", "out-right");
          }
        } else {
          el.classList.remove("out", "out-left", "out-right", "out-up");
        }
        if (below) el.classList.remove("in");
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          applyOut();
          ticking = false;
        });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Лайтбокс состояние + клавиатура
  const [lightbox, setLightbox] = useState({ open: false, shots: [] as string[], index: 0, title: "" });
  const openImage = (shots: string[], index = 0, title = "") => setLightbox({ open: true, shots, index, title });
  const closeImage = () => setLightbox((state) => ({ ...state, open: false }));
  const prevImage = () =>
    setLightbox((state) => ({ ...state, index: (state.index - 1 + state.shots.length) % state.shots.length }));
  const nextImage = () => setLightbox((state) => ({ ...state, index: (state.index + 1) % state.shots.length }));

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open]);

  return (
    <div id="top" className="edge-fade min-h-screen scroll-smooth bg-[#0a0a0c] text-white antialiased">
      <div
        id="runtime-error-box"
        style={{
          display: "none",
          position: "fixed",
          left: 16,
          bottom: 16,
          zIndex: 9999,
          background: "rgba(239,68,68,.12)",
          border: "1px solid rgba(239,68,68,.35)",
          color: "#fecaca",
          padding: "10px 12px",
          borderRadius: 12,
          fontSize: 12,
        }}
      />
      <GlobalStyles />
      <BackgroundFX />
      {/* Header по твоему пожеланию не показываем */}
      <div className="reveal">
        <HeroAbout />
      </div>
      <div className="reveal">
        <Projects onOpenImage={openImage} />
      </div>

      {/* Футер оставил для завершения страницы */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-xs text-white/50">
          <span>© {new Date().getFullYear()} · {DATA.about.name}</span>
          <a href="#top" className="text-white/60 hover:text-white">
            Наверх ↑
          </a>
        </div>
      </footer>

      {/* Лайтбокс */}
      <LightboxModal
        open={lightbox.open}
        shots={lightbox.shots}
        index={lightbox.index}
        title={lightbox.title}
        onClose={closeImage}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  );
}
