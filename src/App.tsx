import React, { useState, useRef } from 'react';
import {
  Check,
  Download,
  Eye,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight,
  Lock,
  Layers,
  Maximize2,
  CheckCircle2,
  HeartHandshake,
  Brain,
  Dumbbell,
  Users,
  FileImage,
  X,
} from 'lucide-react';

type ViewMode = 'website' | 'banner-only' | 'case-study';
type BannerVariant = 'clean-800' | 'watermarked-800' | 'clean-1080' | 'live-dom';

const BASE = import.meta.env.BASE_URL;

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('website');
  const [bannerVariant, setBannerVariant] = useState<BannerVariant>('clean-800');
  const [showReviewBar, setShowReviewBar] = useState(true);
  const [sliderPos, setSliderPos] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Checkout preview state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coupon, setCoupon] = useState('');
  const [enrolledPreview, setEnrolledPreview] = useState(false);

  const bannerFiles: Record<
    Exclude<BannerVariant, 'live-dom'>,
    {
      png: string;
      jpg: string;
      label: string;
      dimensions: string;
      ratio: string;
      description: string;
    }
  > = {
    'clean-800': {
      png: `${BASE}assets/the-strong-collective-banner-1920x800.png`,
      jpg: `${BASE}assets/the-strong-collective-banner-1920x800.jpg`,
      label: 'Standard Desktop Banner (Clean)',
      dimensions: '1920 × 800 px',
      ratio: '2.4 : 1 Wide Desktop Hero',
      description:
        'Unstretched 1:1 subject proportions, extended sunlit warm ivory editorial wall, retouched realism, and crisp Cormorant Garamond + Lato typography.',
    },
    'watermarked-800': {
      png: `${BASE}assets/the-strong-collective-banner-watermarked-1920x800.png`,
      jpg: `${BASE}assets/the-strong-collective-banner-watermarked-1920x800.jpg`,
      label: 'Watermarked Application Preview',
      dimensions: '1920 × 800 px',
      ratio: '2.4 : 1 Wide Desktop Hero',
      description:
        'Includes a subtle, brand-harmonized bottom-right watermark badge for application submission preview.',
    },
    'clean-1080': {
      png: `${BASE}assets/the-strong-collective-banner-1920x1080.png`,
      jpg: `${BASE}assets/the-strong-collective-banner-1920x1080.jpg`,
      label: 'Full HD Widescreen Hero (16:9)',
      dimensions: '1920 × 1080 px',
      ratio: '16 : 9 Full-Bleed Hero',
      description:
        'Full-height 16:9 desktop hero banner with expanded negative space on the left wall so typography never crowds the doorway or subject.',
    },
  };

  const activeStaticBanner =
    bannerVariant === 'live-dom' ? bannerFiles['clean-800'] : bannerFiles[bannerVariant];

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderFromEvent(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderFromEvent(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const updateSliderFromEvent = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(4, Math.min(96, raw)));
  };

  const pillars = [
    {
      icon: Dumbbell,
      title: 'Movement That Fits Your Life',
      body: 'Live and on-demand workouts you can do from home, without making fitness another job.',
      tag: 'LIVE + ON-DEMAND',
    },
    {
      icon: HeartHandshake,
      title: 'Accountability That Keeps You Moving',
      body: "Real support to help you follow through when motivation isn't enough.",
      tag: 'KASH CONNECT',
    },
    {
      icon: Brain,
      title: 'Mindset That Disrupts the Pattern',
      body: 'Build self-trust, stronger habits and the mindset to stop starting over.',
      tag: 'TRAIN THE MIND',
    },
    {
      icon: Users,
      title: 'Women Who Get It',
      body: 'A community of women choosing to show up for themselves, right alongside you.',
      tag: 'AGES 35–65 COMMUNITY',
    },
  ];

  const includedFeatures = [
    'Live virtual workouts',
    'Full replay + on-demand library',
    'Kash Connect accountability + Q&A',
    'Mindset + wellness resources',
    'Challenges, guides + masterclasses',
    'The Strong Collective community',
  ];

  return (
    <div className="min-h-screen bg-[#F7F3E8] text-[#183D2D] flex flex-col">
      {/* Sticky Application Showcase Toolbar for Employer */}
      {showReviewBar ? (
        <header className="sticky top-0 z-50 bg-[#183D2D]/95 backdrop-blur-md text-[#F7F3E8] border-b border-[#B59645]/30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase bg-[#DDF20A] text-[#183D2D]">
                <Sparkles className="w-3 h-3" />
                Application Design Sample
              </span>
              <span className="hidden md:inline text-xs tracking-[0.12em] uppercase text-[#F7F3E8]/80">
                The Strong Collective • Website Banner &amp; Homepage Redesign
              </span>
            </div>

            {/* Mode Switcher */}
            <nav
              aria-label="Presentation view mode"
              className="flex items-center bg-[#292C29]/90 p-1 rounded-full border border-[#B59645]/25"
            >
              <button
                type="button"
                onClick={() => setViewMode('website')}
                className={`btn-press px-3.5 py-1.5 rounded-full text-xs font-medium tracking-[0.08em] uppercase flex items-center gap-1.5 ${
                  viewMode === 'website'
                    ? 'bg-[#F7F3E8] text-[#183D2D] font-bold shadow-xs'
                    : 'text-[#F7F3E8]/80 hover:text-[#F7F3E8]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Website + Banner</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('banner-only')}
                className={`btn-press px-3.5 py-1.5 rounded-full text-xs font-medium tracking-[0.08em] uppercase flex items-center gap-1.5 ${
                  viewMode === 'banner-only'
                    ? 'bg-[#F7F3E8] text-[#183D2D] font-bold shadow-xs'
                    : 'text-[#F7F3E8]/80 hover:text-[#F7F3E8]'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Banner Preview Only</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('case-study')}
                className={`btn-press px-3.5 py-1.5 rounded-full text-xs font-medium tracking-[0.08em] uppercase flex items-center gap-1.5 ${
                  viewMode === 'case-study'
                    ? 'bg-[#F7F3E8] text-[#183D2D] font-bold shadow-xs'
                    : 'text-[#F7F3E8]/80 hover:text-[#F7F3E8]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Before / After &amp; Specs</span>
              </button>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <a
                href={activeStaticBanner.png}
                download
                className="btn-press inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase bg-[#B59645] text-[#F7F3E8] hover:bg-[#c4a44e]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </a>
              <a
                href={activeStaticBanner.jpg}
                download
                className="btn-press hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-[0.1em] uppercase border border-[#B59645]/50 text-[#F7F3E8] hover:bg-[#F7F3E8]/10"
              >
                <FileImage className="w-3.5 h-3.5" />
                <span>JPG</span>
              </a>
              <button
                type="button"
                onClick={() => setShowReviewBar(false)}
                title="Hide review bar to preview uninterrupted website"
                className="btn-press p-1.5 rounded-full text-[#F7F3E8]/60 hover:text-[#F7F3E8] hover:bg-[#F7F3E8]/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      ) : (
        <button
          type="button"
          onClick={() => setShowReviewBar(true)}
          className="btn-press fixed top-4 right-4 z-50 px-3.5 py-2 rounded-full bg-[#183D2D]/90 text-[#F7F3E8] text-xs font-bold tracking-[0.12em] uppercase shadow-lg border border-[#B59645]/40 flex items-center gap-2 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DDF20A]" />
          <span>Show Employer Review Bar</span>
        </button>
      )}

      {/* =====================================================================
          HERO BANNER SECTION (Shown in 'website' and 'banner-only' modes)
         ===================================================================== */}
      {(viewMode === 'website' || viewMode === 'banner-only') && (
        <section aria-label="Redesigned Website Banner" className="relative w-full bg-[#F7F3E8]">
          {/* Variant switcher bar when in Banner-Only mode */}
          {viewMode === 'banner-only' && (
            <div className="bg-[#F7F3E8] border-b border-[#183D2D]/10 py-4 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B59645]">
                    REDESIGNED DESKTOP WEBSITE BANNER • VIEW-ONLY LINK &amp; DIRECT DOWNLOAD
                  </p>
                  <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#183D2D] mt-0.5">
                    {bannerVariant === 'live-dom'
                      ? 'Responsive Live HTML/CSS Hero Banner'
                      : activeStaticBanner.label}{' '}
                    <span className="text-base font-lato font-normal text-[#183D2D]/70 ml-2">
                      ({bannerVariant === 'live-dom' ? 'Fluid Responsive' : activeStaticBanner.dimensions})
                    </span>
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      ['clean-800', '1920×800 Desktop Banner'],
                      ['watermarked-800', '1920×800 Watermarked'],
                      ['clean-1080', '1920×1080 Full HD (16:9)'],
                      ['live-dom', 'Live Responsive HTML/CSS'],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBannerVariant(key)}
                      className={`btn-press px-3.5 py-2 rounded-lg text-xs tracking-[0.1em] uppercase font-bold border ${
                        bannerVariant === key
                          ? 'bg-[#183D2D] text-[#F7F3E8] border-[#183D2D]'
                          : 'bg-white/80 text-[#183D2D] border-[#183D2D]/15 hover:border-[#B59645]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DESKTOP & TABLET BANNER RENDERING */}
          {bannerVariant !== 'live-dom' ? (
            <div className="relative w-full overflow-hidden bg-[#EBE5D5]">
              {/* Desktop Static Master Banner Preview (Exact 1920x800 or 1920x1080 pixel composition) */}
              <div className={viewMode === 'banner-only' ? 'max-w-[1920px] mx-auto shadow-2xl' : 'w-full'}>
                <img
                  src={activeStaticBanner.png}
                  alt="The Strong Collective — Your Strong Starts Here. Train the mind. The body follows."
                  className="w-full h-auto block select-none"
                  loading="eager"
                />
              </div>
            </div>
          ) : (
            /* LIVE RESPONSIVE DOM HERO BANNER */
            <div className="relative w-full min-h-[540px] lg:min-h-[680px] xl:min-h-[760px] flex items-center overflow-hidden bg-[#EBE5D5]">
              <img
                src={`${BASE}assets/hero-clean-base-1920x800.jpg`}
                alt="Nadia Kashouh seated gracefully on a deep green yoga mat in a warm sunlit room"
                className="absolute inset-0 w-full h-full object-cover object-[72%_center] sm:object-center"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(247,243,232,0.92) 0%, rgba(247,243,232,0.72) 42%, rgba(247,243,232,0.05) 68%)',
                }}
              />
              <div className="relative z-10 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-24 py-16 lg:py-24">
                <div className="max-w-2xl">
                  <p className="font-lato text-xs sm:text-sm md:text-base lg:text-[19px] font-normal tracking-[0.40em] uppercase text-[#183D2D] mb-5 lg:mb-8">
                    THE STRONG COLLECTIVE
                  </p>
                  <h1 className="font-cormorant font-normal uppercase text-[#183D2D] text-5xl sm:text-7xl lg:text-[108px] xl:text-[122px] leading-[0.90] tracking-[0.012em] mb-6 lg:mb-8 -ml-1">
                    <span className="block mb-1">YOUR</span>
                    <span className="block mb-1.5">STRONG</span>
                    <span className="block text-[0.91em] bg-gradient-to-r from-[#9E7E2F] via-[#B59645] to-[#9A7B2C] bg-clip-text text-transparent">
                      STARTS HERE.
                    </span>
                  </h1>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-[#B59645] to-[#DDF20A] mb-5" />
                  <p className="font-lato text-xs sm:text-sm md:text-base lg:text-[19px] font-normal tracking-[0.25em] uppercase text-[#183D2D]">
                    TRAIN THE MIND. THE BODY FOLLOWS.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Unobtrusive Banner Format Bar below the hero banner when Review Bar is visible */}
          {viewMode === 'website' && showReviewBar && (
            <div className="bg-[#EFE9D8] border-b border-[#183D2D]/10 py-2.5 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#183D2D]/70 mr-1">
                    Banner Preview Format:
                  </span>
                  {(
                    [
                      ['clean-800', '1920×800 Desktop Banner (Clean)'],
                      ['watermarked-800', '1920×800 Watermarked'],
                      ['clean-1080', '1920×1080 Full HD (16:9)'],
                      ['live-dom', 'Live Responsive HTML/CSS'],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBannerVariant(key)}
                      className={`btn-press text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        bannerVariant === key
                          ? 'bg-[#183D2D] text-[#F7F3E8] shadow-2xs'
                          : 'bg-white/70 text-[#183D2D]/80 hover:bg-white hover:text-[#183D2D]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <a
                  href="#design-sample-breakdown"
                  className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#183D2D] hover:text-[#B59645] underline underline-offset-4"
                >
                  View Before / After Comparison ↓
                </a>
              </div>
            </div>
          )}

          {/* Download & Spec Card Panel when in 'banner-only' mode */}
          {viewMode === 'banner-only' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {(
                  [
                    ['clean-800', bannerFiles['clean-800'], 'Recommended Application Asset'],
                    ['watermarked-800', bannerFiles['watermarked-800'], 'Watermarked Preview Option'],
                    ['clean-1080', bannerFiles['clean-1080'], 'Full HD 16:9 Option'],
                  ] as const
                ).map(([key, info, badge]) => (
                  <div
                    key={key}
                    className={`rounded-2xl p-6 border transition-all ${
                      bannerVariant === key
                        ? 'bg-white border-[#B59645] shadow-md ring-1 ring-[#B59645]/40'
                        : 'bg-white/75 border-[#183D2D]/12'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-[#183D2D]/8 text-[#183D2D]">
                        {badge}
                      </span>
                      <span className="text-xs font-bold text-[#B59645]">{info.dimensions}</span>
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-[#183D2D] mb-1">
                      {info.label}
                    </h3>
                    <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#91A989] mb-3">
                      {info.ratio}
                    </p>
                    <p className="text-sm text-[#292C29]/80 leading-relaxed mb-6">{info.description}</p>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={info.png}
                        download
                        className="btn-press flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#183D2D] text-[#F7F3E8] text-xs font-bold tracking-[0.14em] uppercase hover:bg-[#1f4d39]"
                      >
                        <Download className="w-3.5 h-3.5 text-[#DDF20A]" />
                        <span>Download PNG</span>
                      </a>
                      <a
                        href={info.jpg}
                        download
                        className="btn-press inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#183D2D]/20 text-[#183D2D] text-xs font-bold tracking-[0.14em] uppercase hover:border-[#B59645]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>JPG</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* =====================================================================
          FULL REDESIGNED WEBSITE CONTENT (strongstartstoday.com/home-page)
         ===================================================================== */}
      {viewMode === 'website' && (
        <main className="flex-1">
          {/* SECTION 1: ENROLLMENT INTRO & TWO-COLUMN 14-DAY STRONG START OFFER */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F3E8] border-b border-[#183D2D]/10">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
                <p className="font-lato text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-[#B59645] mb-3">
                  You&apos;re One Step Away From Your Strong Start.
                </p>
                <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#183D2D] leading-[1.08]">
                  Complete Your Enrollment
                </h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-[#B59645] to-[#DDF20A] mx-auto mt-6" />
              </div>

              {/* Two-Column Enrollment Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* Left Column: Deep Green Offer Card */}
                <div className="lg:col-span-6 bg-[#183D2D] text-[#F7F3E8] rounded-3xl p-8 sm:p-11 lg:p-12 shadow-xl border border-[#B59645]/30 flex flex-col justify-between relative overflow-hidden">
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-15"
                    style={{
                      background: 'radial-gradient(circle, #B59645 0%, transparent 70%)',
                    }}
                  />

                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F3E8]/10 border border-[#B59645]/40 mb-6">
                      <span className="w-2 h-2 rounded-full bg-[#DDF20A]" />
                      <span className="font-lato text-xs font-bold tracking-[0.24em] uppercase text-[#F7F3E8]">
                        YOUR 14-DAY STRONG START
                      </span>
                    </div>

                    <h3 className="font-cormorant text-4xl sm:text-5xl font-semibold text-[#DDF20A] leading-[1.06] mb-5">
                      You&apos;re In the Right Place.
                    </h3>

                    <p className="font-lato text-base sm:text-lg text-[#F7F3E8]/90 leading-relaxed mb-8">
                      For the next 14 days, you get full access to{' '}
                      <strong className="font-bold text-white">
                        The Strong Collective Premium experience
                      </strong>{' '}
                      and the support to start showing up for yourself differently.
                    </p>

                    <div className="border-t border-[#F7F3E8]/15 pt-7 mb-8">
                      <p className="font-lato text-xs font-bold tracking-[0.24em] uppercase text-[#B59645] mb-5">
                        YOUR ACCESS INCLUDES:
                      </p>
                      <ul className="space-y-3.5">
                        {includedFeatures.map((item) => (
                          <li key={item} className="flex items-start gap-3.5 text-base text-[#F7F3E8]/95">
                            <span className="mt-0.5 w-5 h-5 rounded-full bg-[#DDF20A]/15 border border-[#DDF20A]/60 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3.5 h-3.5 text-[#DDF20A]" />
                            </span>
                            <span className="font-lato">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price & Guarantee Box */}
                  <div className="bg-[#292C29]/70 rounded-2xl p-6 border border-[#B59645]/30">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <span className="font-cormorant text-3xl sm:text-4xl font-bold text-[#D7DF21] tracking-wide">
                        $49.97 TODAY
                      </span>
                      <span className="font-lato text-xs font-bold tracking-[0.18em] uppercase text-[#B59645]">
                        14-Day Full Access
                      </span>
                    </div>
                    <p className="font-lato text-sm font-bold text-[#F7F3E8] mb-3">
                      One payment. No automatic renewal.
                    </p>
                    <p className="font-lato text-sm text-[#F7F3E8]/80 leading-relaxed mb-2">
                      At the end of your 14 days, <strong className="text-white">you decide</strong> if
                      you want to continue.
                    </p>
                    <p className="font-cormorant italic text-lg text-[#B59645]">
                      No pressure. No starting over. Just your next step.
                    </p>
                  </div>
                </div>

                {/* Right Column: Clean, Elevated Enrollment Form Card */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-11 lg:p-12 shadow-lg border border-[#183D2D]/12 flex flex-col justify-between">
                  <div>
                    <div className="mb-8">
                      <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#183D2D] mb-2">
                        Let’s Get You Started
                      </h3>
                      <p className="font-lato text-base text-[#292C29]/75">
                        Your Strong Start is just a few clicks away.
                      </p>
                    </div>

                    {/* Step 1: Contact Information */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setEnrolledPreview(true);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block font-lato text-xs font-bold tracking-[0.14em] uppercase text-[#183D2D]/80 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8]/60 border border-[#183D2D]/15 text-[#183D2D] placeholder-[#183D2D]/35 text-sm focus:outline-none focus:border-[#183D2D]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-lato text-xs font-bold tracking-[0.14em] uppercase text-[#183D2D]/80 mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8]/60 border border-[#183D2D]/15 text-[#183D2D] placeholder-[#183D2D]/35 text-sm focus:outline-none focus:border-[#183D2D]"
                          />
                        </div>
                        <div>
                          <label className="block font-lato text-xs font-bold tracking-[0.14em] uppercase text-[#183D2D]/80 mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(555) 234-5678"
                            className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8]/60 border border-[#183D2D]/15 text-[#183D2D] placeholder-[#183D2D]/35 text-sm focus:outline-none focus:border-[#183D2D]"
                          />
                        </div>
                      </div>

                      {/* Order Summary Table */}
                      <div className="mt-6 pt-6 border-t border-[#183D2D]/10">
                        <p className="font-lato text-xs font-bold tracking-[0.16em] uppercase text-[#183D2D]/70 mb-3">
                          Order Summary
                        </p>
                        <div className="rounded-2xl bg-[#F7F3E8]/75 p-4 border border-[#183D2D]/10 space-y-3">
                          <div className="flex items-center justify-between text-xs font-bold tracking-wider uppercase text-[#183D2D]/60 pb-2 border-b border-[#183D2D]/10">
                            <span>Item</span>
                            <span>Quantity</span>
                            <span>Amount</span>
                          </div>
                          <div className="flex items-center justify-between text-sm font-medium text-[#183D2D]">
                            <span className="font-bold">14-Day Strong Start</span>
                            <span>1</span>
                            <span className="font-bold">$49.97</span>
                          </div>

                          {/* Coupon row */}
                          <div className="flex gap-2 pt-2">
                            <input
                              type="text"
                              value={coupon}
                              onChange={(e) => setCoupon(e.target.value)}
                              placeholder="Coupon code (optional)"
                              className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-[#183D2D]/15 text-xs text-[#183D2D] focus:outline-none focus:border-[#183D2D]"
                            />
                            <button
                              type="button"
                              className="btn-press px-4 py-2 rounded-lg bg-[#183D2D]/10 text-[#183D2D] text-xs font-bold tracking-wider uppercase hover:bg-[#183D2D]/15"
                            >
                              Apply
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#183D2D]/10 text-base font-bold text-[#183D2D]">
                            <span>Order Total Today</span>
                            <span className="font-cormorant text-2xl text-[#183D2D]">$49.97</span>
                          </div>
                        </div>
                      </div>

                      {/* Submit CTA */}
                      <div className="pt-3">
                        <button
                          type="submit"
                          className="btn-press w-full py-4 px-6 rounded-xl bg-[#D7DF21] hover:bg-[#DDF20A] text-[#183D2D] font-lato font-bold text-sm sm:text-base tracking-[0.16em] uppercase shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
                        >
                          <span>Start My 14-Day Strong Start</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      {enrolledPreview && (
                        <div className="p-3.5 rounded-xl bg-[#183D2D]/8 border border-[#183D2D]/20 text-xs text-[#183D2D] flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#183D2D] flex-shrink-0" />
                          <span>
                            Interactive enrollment preview — connects directly to The Strong Collective
                            Stripe checkout on production.
                          </span>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* Trust Footer */}
                  <div className="mt-6 pt-4 border-t border-[#183D2D]/10 flex items-center justify-center gap-2 text-xs text-[#292C29]/70 text-center">
                    <Lock className="w-3.5 h-3.5 text-[#B59645] flex-shrink-0" />
                    <span>Secure checkout • $49.97 one-time payment • No automatic renewal</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: THIS IS YOUR FIRST STEP & THE 4 PILLARS */}
          <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F3E8]">
            <div className="max-w-6xl mx-auto">
              {/* First Step Statement Box */}
              <div className="bg-[#183D2D] text-[#F7F3E8] rounded-3xl p-10 sm:p-14 lg:p-16 text-center max-w-4xl mx-auto mb-20 shadow-lg border border-[#B59645]/30 relative overflow-hidden">
                <p className="font-lato text-xs font-bold tracking-[0.3em] uppercase text-[#B59645] mb-4">
                  THE STRONG COLLECTIVE PHILOSOPHY
                </p>
                <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F7F3E8] mb-6">
                  This Is Your First Step.
                </h2>
                <p className="font-lato text-lg sm:text-xl text-[#F7F3E8]/90 max-w-2xl mx-auto leading-relaxed">
                  You don&apos;t have to figure out the next 14 days today. Just make the decision to
                  show up for yourself today.{' '}
                  <span className="text-[#DDF20A] font-semibold">We&apos;ll help you with the rest.</span>
                </p>
              </div>

              {/* Subhead */}
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="font-lato text-xs font-bold tracking-[0.26em] uppercase text-[#B59645] mb-3">
                  BUILT FOR WOMEN AGES 35–65
                </p>
                <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#183D2D]">
                  And You&apos;ll Have What You Need to Keep Going.
                </h3>
              </div>

              {/* 4 Pillar Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="hover-lift bg-white rounded-2xl p-8 sm:p-10 border border-[#183D2D]/10 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-[#183D2D] text-[#DDF20A] flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="font-lato text-[11px] font-bold tracking-[0.22em] uppercase text-[#B59645]">
                            {pillar.tag}
                          </span>
                        </div>
                        <h4 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#183D2D] mb-3">
                          {pillar.title}
                        </h4>
                        <p className="font-lato text-base text-[#292C29]/80 leading-relaxed">
                          {pillar.body}
                        </p>
                      </div>
                      <div className="w-12 h-[2px] bg-[#B59645]/40 mt-8" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 3: AUTHENTIC BRAND PHOTOGRAPHY & THE KASH METHOD */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#183D2D]/10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <p className="font-lato text-xs font-bold tracking-[0.28em] uppercase text-[#B59645]">
                    TRAIN THE MIND. THE BODY FOLLOWS.
                  </p>
                  <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-[#183D2D] leading-[1.08]">
                    You’ve spent years being strong for everyone else.
                  </h2>
                  <p className="font-cormorant italic text-2xl sm:text-3xl text-[#B59645] leading-snug">
                    Now it’s your turn to build a different kind of strong.
                  </p>
                  <p className="font-lato text-base text-[#292C29]/80 leading-relaxed">
                    Founded by Coach, Speaker, and Author <strong>Nadia Kashouh</strong>, The Strong
                    Collective is a supportive virtual wellness community built on{' '}
                    <strong>The KASH Method®</strong> — a practical framework that retrains thinking,
                    strengthens habits, and creates lasting transformation from the inside out.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {[
                      ['K — KEY', 'Unlock the truth. Identity, awareness & ownership.'],
                      ['A — ALIGN', 'Train the mind. The body follows.'],
                      ['S — SUSTAIN', 'Build what lasts. Consistency & habits.'],
                      ['H — HOLD', 'Hold the standard. Boundaries & vision.'],
                    ].map(([title, desc]) => (
                      <div
                        key={title}
                        className="p-4 rounded-xl bg-[#F7F3E8] border border-[#B59645]/25"
                      >
                        <p className="font-cormorant text-lg font-bold text-[#183D2D]">{title}</p>
                        <p className="font-lato text-xs text-[#292C29]/75 mt-1 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Authentic Brand Photos Collage (100% unstretched natural proportions) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="space-y-6">
                    <div className="rounded-2xl overflow-hidden shadow-md border border-[#183D2D]/10 bg-[#F7F3E8]">
                      <img
                        src={`${BASE}assets/brand-photo-community-workout.jpg`}
                        alt="Nadia Kashouh training with a member in the studio"
                        className="w-full h-auto object-cover block"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md border border-[#183D2D]/10 bg-[#F7F3E8]">
                      <img
                        src={`${BASE}assets/brand-kash-method-framework.jpg`}
                        alt="The KASH Method proprietary framework"
                        className="w-full h-auto object-cover block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="rounded-2xl overflow-hidden shadow-md border border-[#183D2D]/10 bg-[#183D2D]">
                      <img
                        src={`${BASE}assets/brand-photo-mindset-reset.jpg`}
                        alt="Reset. Restore. Rebuild. Mindful breathing on yoga mat"
                        className="w-full h-auto object-cover block"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded-2xl p-6 bg-[#183D2D] text-[#F7F3E8] border border-[#B59645]/30">
                      <p className="font-cormorant italic text-2xl text-[#DDF20A] mb-2">
                        “You’re strong, we’re stronger together.”
                      </p>
                      <p className="font-lato text-xs tracking-[0.2em] uppercase text-[#F7F3E8]/75">
                        THE STRONG COLLECTIVE • VIRTUAL WELLNESS COMMUNITY
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          APPLICATION DESIGN SAMPLE: BEFORE / AFTER & BRAND GUIDELINES SHOWCASE
          (Always shown in 'case-study' mode, and also included at the bottom of 'website' mode)
         ===================================================================== */}
      {(viewMode === 'case-study' || viewMode === 'website') && (
        <section
          id="design-sample-breakdown"
          className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#EFE9D8] border-t border-[#183D2D]/15"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183D2D] text-[#DDF20A] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Application Design Sample • Visual &amp; Proportional Audit</span>
                </div>
                <h2 className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#183D2D]">
                  Banner Redesign: Before vs. After
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={bannerFiles['clean-800'].png}
                  download
                  className="btn-press inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#183D2D] text-[#F7F3E8] text-xs font-bold tracking-[0.14em] uppercase shadow-sm hover:bg-[#214f3b]"
                >
                  <Download className="w-4 h-4 text-[#DDF20A]" />
                  <span>Download 1920×800 PNG</span>
                </a>
                <a
                  href={bannerFiles['clean-800'].jpg}
                  download
                  className="btn-press inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#183D2D]/20 text-[#183D2D] text-xs font-bold tracking-[0.14em] uppercase shadow-xs hover:border-[#B59645]"
                >
                  <Download className="w-4 h-4 text-[#B59645]" />
                  <span>Download 1920×800 JPG</span>
                </a>
              </div>
            </div>

            {/* Interactive Drag Comparison Slider (clip-path hardware accelerated) */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-[#183D2D]/12 mb-12">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#183D2D]">
                  <SlidersHorizontal className="w-4 h-4 text-[#B59645]" />
                  <span>Drag slider to compare Reference vs. Redesigned Desktop Banner (1920 × 800)</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#183D2D]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#183D2D]" />
                    Left: Redesigned Banner (Unstretched 1:1 Subject)
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#292C29]/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B59645]" />
                    Right: Reference Banner Stretched to Wide Aspect Ratio
                  </span>
                </div>
              </div>

              <div
                ref={sliderRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="relative w-full aspect-[1920/800] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#EBE5D5]"
              >
                {/* Bottom Layer: Reference Banner Stretched to 1920x800 */}
                <img
                  src={`${BASE}assets/reference-banner-stretched-1920x800.jpg`}
                  alt="Before: Reference banner stretched horizontally across desktop banner width"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
                <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#292C29]/80 text-[#F7F3E8] text-[11px] font-bold tracking-[0.16em] uppercase backdrop-blur-xs">
                  BEFORE • Stretched Reference + AI Artifacts
                </span>

                {/* Top Layer: Redesigned Banner clipped via hardware-accelerated clip-path */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                  }}
                >
                  <img
                    src={bannerFiles['clean-800'].jpg}
                    alt="After: Redesigned 1920x800 desktop website banner with natural proportions"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#183D2D]/90 text-[#DDF20A] text-[11px] font-bold tracking-[0.16em] uppercase backdrop-blur-xs border border-[#B59645]/40">
                    AFTER • Redesigned (1:1 Proportions + Cormorant Garamond &amp; Lato)
                  </span>
                </div>

                {/* Divider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#DDF20A] shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#183D2D] text-[#DDF20A] border-2 border-[#DDF20A] shadow-lg flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Live Site Stretch Diagnostic Note */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#F7F3E8] rounded-2xl p-5 border border-[#183D2D]/10">
                <div className="lg:col-span-5 rounded-xl overflow-hidden border border-[#183D2D]/15">
                  <img
                    src={`${BASE}assets/reference-banner-live-site-stretch.jpg`}
                    alt="How strongstartstoday.com/home-page currently squishes the 1824x1024 image with fill-width-height"
                    className="w-full h-auto block"
                  />
                </div>
                <div className="lg:col-span-7 space-y-2">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#B59645]">
                    WHY THE ORIGINAL BANNER APPEARED STRETCHED ON STRONGSTARTSTODAY.COM
                  </p>
                  <p className="text-sm text-[#183D2D] font-bold">
                    Root Cause Identified: 16:9 Image (`1824×1024`) Forced into a Wide Short Section via{' '}
                    <code className="px-1.5 py-0.5 rounded bg-[#183D2D]/10 text-xs">
                      .fill-width-height (background-size: 100% 100%)
                    </code>
                  </p>
                  <p className="text-xs sm:text-sm text-[#292C29]/80 leading-relaxed">
                    On <code className="text-xs">strongstartstoday.com/home-page</code>, the top hero
                    section (<code className="text-xs">#section-4NIpGBYHpL</code>) has an empty spacer row
                    that collapses to ~320px tall while spanning 100% of the desktop viewport width,
                    stretching the 16:9 image horizontally. Furthermore, in the reference file itself, the
                    baked-in text nearly collided with the doorway edge, and AI generation left anatomical
                    distortions on the outstretched foot and fingers.
                  </p>
                </div>
              </div>
            </div>

            {/* 5-Point Design Improvements & Brand Style Alignment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-7 border border-[#183D2D]/10 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#183D2D] text-[#DDF20A] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-[#183D2D] mb-2">
                  1. Proportions &amp; Realism Fixed
                </h3>
                <p className="font-lato text-sm text-[#292C29]/80 leading-relaxed">
                  Preserved 100% natural 1:1 facial features and body proportions while extending the warm
                  ivory architectural space on the left to fit a standard wide desktop banner (
                  <code>1920×800</code>). Retouched the AI errors on the outstretched foot/toes and right
                  hand fingers for natural realism.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#183D2D]/10 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#183D2D] text-[#DDF20A] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-[#183D2D] mb-2">
                  2. Typography &amp; Intentional Spacing
                </h3>
                <p className="font-lato text-sm text-[#292C29]/80 leading-relaxed">
                  Replaced the crowded AI-baked text with authentic{' '}
                  <strong>Cormorant Garamond</strong> for the primary headline (
                  <em>YOUR STRONG STARTS HERE.</em>) and <strong>Lato</strong> for supporting text (
                  <em>THE STRONG COLLECTIVE</em> &amp; <em>TRAIN THE MIND. THE BODY FOLLOWS.</em>), leaving
                  over 220px of clean breathing room before the doorway edge.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-7 border border-[#183D2D]/10 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#183D2D] text-[#DDF20A] flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-[#183D2D] mb-2">
                  3. Exact Brand Color System
                </h3>
                <div className="space-y-2.5 mt-3">
                  {[
                    ['#183D2D', 'Deep Green (Primary)', 'bg-[#183D2D] text-white'],
                    ['#F7F3E8', 'Warm Ivory (Primary)', 'bg-[#F7F3E8] text-[#183D2D] border border-[#183D2D]/20'],
                    ['#B59645', 'Subtle Gold (Accent)', 'bg-[#B59645] text-white'],
                    ['#DDF20A', 'Chartreuse (Accent)', 'bg-[#DDF20A] text-[#183D2D]'],
                  ].map(([hex, name, cls]) => (
                    <div key={hex} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#292C29]">{name}</span>
                      <span className={`px-2.5 py-0.5 rounded-md font-mono font-bold ${cls}`}>{hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Download Bar for All Banner Variants */}
            <div className="bg-[#183D2D] text-[#F7F3E8] rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 border border-[#B59645]/30">
              <div>
                <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#DDF20A] mb-1">
                  READY FOR APPLICATION SUBMISSION
                </p>
                <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold">
                  Download Standalone Banner Previews (PNG &amp; JPG)
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F3E8]/80 mt-1">
                  Available in 1920×800 Standard Desktop Banner (Clean &amp; Watermarked) and 1920×1080
                  Full HD Hero.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={bannerFiles['clean-800'].png}
                  download
                  className="btn-press px-4 py-2.5 rounded-xl bg-[#DDF20A] text-[#183D2D] text-xs font-bold tracking-[0.12em] uppercase flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>1920×800 PNG</span>
                </a>
                <a
                  href={bannerFiles['clean-800'].jpg}
                  download
                  className="btn-press px-4 py-2.5 rounded-xl bg-[#B59645] text-[#F7F3E8] text-xs font-bold tracking-[0.12em] uppercase flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>1920×800 JPG</span>
                </a>
                <a
                  href={bannerFiles['watermarked-800'].jpg}
                  download
                  className="btn-press px-4 py-2.5 rounded-xl bg-white/10 border border-[#F7F3E8]/25 text-[#F7F3E8] text-xs font-bold tracking-[0.12em] uppercase flex items-center gap-2 hover:bg-white/15"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Watermarked JPG</span>
                </a>
                <a
                  href={bannerFiles['clean-1080'].png}
                  download
                  className="btn-press px-4 py-2.5 rounded-xl bg-white/10 border border-[#F7F3E8]/25 text-[#F7F3E8] text-xs font-bold tracking-[0.12em] uppercase flex items-center gap-2 hover:bg-white/15"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>1920×1080 PNG</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          BRAND FOOTER
         ===================================================================== */}
      <footer className="bg-[#183D2D] text-[#F7F3E8] py-14 px-4 sm:px-6 lg:px-8 border-t border-[#B59645]/25">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="font-cormorant text-3xl sm:text-4xl text-[#B59645] italic">
            You are a Different Kind of Strong.
          </p>
          <div className="w-12 h-[1px] bg-[#B59645]/40 mx-auto" />
          <p className="font-lato text-xs tracking-[0.18em] uppercase text-[#F7F3E8]/80">
            © 2026 The KASH Method. All Rights Reserved. | The Strong Collective
          </p>
          <p className="font-lato text-xs tracking-[0.14em] uppercase text-[#91A989]">
            <em>Train the mind. The body follows.</em> &nbsp;|&nbsp;{' '}
            <a
              href="https://strongstartstoday.com/home-page"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-[#DDF20A]"
            >
              Terms &amp; Conditions
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
