'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Yelp-style hero carousel — city-aware.
 * A Houston | Dallas toggle updates all CTA links so users land in their city.
 */

interface Slide {
  src: string;
  phrase: string;
  ctaLabel: string;
  filterSuffix: string; // appended to /{city}, e.g. '' | '?lang=spanish'
  attribution: string;
  position?: string;
}

const SLIDES: Slide[] = [
  {
    src: '/hero/01.jpg',
    phrase: 'Family-trusted home care.',
    ctaLabel: 'Browse agencies',
    filterSuffix: '',
    attribution: 'Photo: Gustavo Fring · Pexels',
  },
  {
    src: '/hero/02.jpg',
    phrase: 'Caregivers who speak your language.',
    ctaLabel: 'Spanish-speaking',
    filterSuffix: '?lang=spanish',
    attribution: 'Photo: Ivan Samkov · Pexels',
  },
  {
    src: '/hero/03.jpg',
    phrase: 'Skilled nursing, at home.',
    ctaLabel: 'Skilled nursing',
    filterSuffix: '?svc=skilled-nursing',
    attribution: 'Photo: Jsme MILA · Pexels',
  },
  {
    src: '/hero/04.jpg',
    phrase: 'Personal care that fits your day.',
    ctaLabel: 'Personal care',
    filterSuffix: '?svc=personal-care',
    attribution: 'Photo: Jsme MILA · Pexels',
  },
];

const STATE_CITIES: Record<string, { slug: string; label: string }[]> = {
  TX: [
    { slug: 'houston',     label: 'Houston'      },
    { slug: 'dallas',      label: 'Dallas'       },
    { slug: 'san-antonio', label: 'San Antonio'  },
    { slug: 'el-paso',     label: 'El Paso'      },
    { slug: 'austin',      label: 'Austin'       },
    { slug: 'fort-worth',  label: 'Fort Worth'   },
  ],
  CA: [
    { slug: 'los-angeles',    label: 'Los Angeles'    },
    { slug: 'glendale-ca',    label: 'Glendale'       },
    { slug: 'van-nuys',       label: 'Van Nuys'       },
    { slug: 'burbank',        label: 'Burbank'        },
    { slug: 'pasadena-ca',    label: 'Pasadena'       },
    { slug: 'north-hollywood',label: 'North Hollywood'},
    { slug: 'sherman-oaks',   label: 'Sherman Oaks'   },
    { slug: 'encino',         label: 'Encino'         },
    { slug: 'woodland-hills', label: 'Woodland Hills' },
    { slug: 'northridge',     label: 'Northridge'     },
    { slug: 'san-diego',      label: 'San Diego'      },
    { slug: 'fresno',         label: 'Fresno'         },
    { slug: 'sacramento',     label: 'Sacramento'     },
    { slug: 'san-jose',       label: 'San Jose'       },
    { slug: 'san-francisco',  label: 'San Francisco'  },
    { slug: 'oakland',        label: 'Oakland'        },
    { slug: 'long-beach',     label: 'Long Beach'     },
    { slug: 'riverside-ca',   label: 'Riverside'      },
    { slug: 'santa-ana',      label: 'Santa Ana'      },
  ],
  FL: [
    { slug: 'miami',           label: 'Miami'          },
    { slug: 'tampa',           label: 'Tampa'          },
    { slug: 'jacksonville-fl', label: 'Jacksonville'   },
    { slug: 'orlando',         label: 'Orlando'        },
    { slug: 'fort-lauderdale', label: 'Fort Lauderdale'},
    { slug: 'hialeah',         label: 'Hialeah'        },
    { slug: 'boca-raton',      label: 'Boca Raton'     },
    { slug: 'west-palm-beach', label: 'West Palm Beach'},
    { slug: 'clearwater',      label: 'Clearwater'     },
    { slug: 'fort-myers',      label: 'Fort Myers'     },
    { slug: 'doral',           label: 'Doral'          },
    { slug: 'hollywood-fl',    label: 'Hollywood'      },
    { slug: 'boynton-beach',   label: 'Boynton Beach'  },
    { slug: 'miami-lakes',     label: 'Miami Lakes'    },
    { slug: 'sarasota',        label: 'Sarasota'       },
  ],
  IL: [
    { slug: 'chicago',          label: 'Chicago'         },
    { slug: 'des-plaines',      label: 'Des Plaines'     },
    { slug: 'skokie',           label: 'Skokie'          },
    { slug: 'lincolnwood',      label: 'Lincolnwood'     },
    { slug: 'northbrook',       label: 'Northbrook'      },
    { slug: 'lombard',          label: 'Lombard'         },
    { slug: 'tinley-park',      label: 'Tinley Park'     },
    { slug: 'arlington-heights',label: 'Arlington Heights'},
    { slug: 'schaumburg',       label: 'Schaumburg'      },
    { slug: 'naperville',       label: 'Naperville'      },
  ],
};

const SERVICES = [
  { value: '',                  label: 'All services'      },
  { value: '?lang=spanish',     label: 'Spanish-speaking'  },
  { value: '?lang=vietnamese',  label: 'Vietnamese'        },
  { value: '?lang=chinese',     label: 'Chinese'           },
  { value: '?ins=medicaid',     label: 'Accepts Medicaid'  },
  { value: '?svc=dementia',     label: 'Dementia care'     },
  { value: '?svc=hospice',      label: 'Hospice'           },
  { value: '?svc=skilled-nursing', label: 'Skilled nursing'},
  { value: '?svc=personal-care',   label: 'Personal care'  },
];

const ADVANCE_MS = 7000;

export function HeroCarousel() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState<'TX' | 'CA' | 'FL' | 'IL'>('TX');
  const [city, setCity] = useState('houston');
  const [service, setService] = useState('');

  function switchState(s: 'TX' | 'CA' | 'FL' | 'IL') {
    setState(s);
    setCity(STATE_CITIES[s][0].slug);
  }

  function handleSearch() {
    router.push(`/${city}${service}`);
  }

  const cities = STATE_CITIES[state];
  const ticker = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    ticker.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ADVANCE_MS);
    return () => {
      if (ticker.current) clearInterval(ticker.current);
    };
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--ink)] border-b border-[var(--line)]"
      style={{ height: 'clamp(560px, 85vh, 820px)' }}
    >
      {/* Photo stack */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.phrase}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              objectPosition: s.position ?? 'center',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        ))}
        {/* Dark gradient — left heavier for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.45) 35%, rgba(10,10,10,0.10) 70%, rgba(10,10,10,0.05) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* Left rail: progress bars + pause + attribution */}
      <div className="absolute left-5 lg:left-8 top-0 bottom-0 z-20 flex flex-col justify-between py-10 lg:py-14 pointer-events-none">
        {/* Progress bars (clickable) */}
        <div className="flex flex-col gap-2 pointer-events-auto" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              className="w-[3px] rounded-full transition-all overflow-hidden"
              style={{
                height: 36,
                background: 'rgba(255,255,255,0.28)',
              }}
            >
              <span
                className="block w-full origin-top transition-transform"
                style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.95)',
                  transform: i === index ? 'scaleY(1)' : 'scaleY(0)',
                  transitionDuration: i === index && !paused ? `${ADVANCE_MS}ms` : '300ms',
                  transitionTimingFunction: 'linear',
                }}
              />
            </button>
          ))}
        </div>

        {/* Pause + attribution bottom */}
        <div className="space-y-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play' : 'Pause'}
            className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors"
            style={{
              borderColor: 'rgba(255,255,255,0.7)',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {paused ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            )}
          </button>
          <p
            className="font-mono uppercase tracking-[0.14em] text-[10.5px]"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {slide.attribution}
          </p>
        </div>
      </div>

      {/* Center-left: phrase + city toggle + CTA */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto max-w-[1320px] w-full px-6 lg:px-10 pl-16 lg:pl-24">
          {/* Eyebrow */}
          <p
            className="font-mono uppercase tracking-[0.16em] text-[11px] font-semibold mb-5"
            style={{ color: 'rgba(255,255,255,0.78)' }}
          >
            An honest home care directory · TX · CA · FL · IL
          </p>

          <h1
            className="font-display text-white max-w-[14ch]"
            style={{
              fontSize: 'clamp(40px, 6.5vw, 88px)',
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              fontWeight: 400,
              textShadow: '0 2px 24px rgba(0,0,0,0.35)',
            }}
          >
            {slide.phrase}
          </h1>

          {/* Search bar */}
          <div className="mt-8 w-full max-w-[620px]">
            <div
              className="flex rounded-2xl overflow-hidden"
              style={{ background: 'white', boxShadow: '0 8px 48px rgba(0,0,0,0.35)' }}
            >
              {/* State */}
              <div className="flex flex-col justify-center px-5 py-3.5 min-w-[90px]">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-0.5 cursor-pointer" htmlFor="hero-state">
                  State
                </label>
                <select
                  id="hero-state"
                  value={state}
                  onChange={(e) => switchState(e.target.value as 'TX' | 'CA' | 'FL' | 'IL')}
                  className="bg-transparent text-[var(--ink)] font-medium outline-none cursor-pointer appearance-none"
                  style={{ fontSize: 14 }}
                >
                  <option value="TX">Texas</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </select>
              </div>

              {/* Divider */}
              <div className="w-px bg-[var(--line)] my-3 shrink-0" />

              {/* City */}
              <div className="flex flex-col justify-center px-5 py-3.5 flex-1 min-w-0">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-0.5 cursor-pointer" htmlFor="hero-city">
                  City
                </label>
                <select
                  id="hero-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent text-[var(--ink)] font-medium outline-none cursor-pointer appearance-none truncate"
                  style={{ fontSize: 14 }}
                >
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="w-px bg-[var(--line)] my-3 shrink-0" />

              {/* Service */}
              <div className="flex flex-col justify-center px-5 py-3.5 flex-1 min-w-0">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-3)] mb-0.5 cursor-pointer" htmlFor="hero-service">
                  Service
                </label>
                <select
                  id="hero-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-transparent text-[var(--ink)] font-medium outline-none cursor-pointer appearance-none truncate"
                  style={{ fontSize: 14 }}
                >
                  {SERVICES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={handleSearch}
                aria-label="Search"
                className="flex items-center justify-center px-5 shrink-0 transition-colors"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>

            {/* Secondary link */}
            <div className="mt-4">
              <Link
                href="/for-agencies"
                className="inline-flex items-center gap-1.5 text-white/75 hover:text-white underline-offset-4 hover:underline"
                style={{ fontSize: 13.5, fontWeight: 500, textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}
              >
                For agencies
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
