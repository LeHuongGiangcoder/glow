/**
 * English copy — the default locale, and the source of truth for the dictionary
 * *shape*. `vi.ts` is typed as `Dictionary`, so a key added here fails the build
 * there until it is translated, which is the whole point of keeping one file
 * canonical rather than two loose objects.
 *
 * Tuples are written `as const` where a component destructures them
 * (`[keyword, rest]` bullets); everything else stays plain so `vi.ts` can
 * satisfy the type with its own strings.
 */

export const en = {
  /** `<title>` / `<meta>` per route. */
  meta: {
    siteName: 'Glow Wedding',
    titleDefault: 'Glow — Bespoke wedding websites and ready-made templates',
    titleTemplate: '%s · Glow',
    description:
      'Glow designs a wedding website for each couple: pick a ready-made template for a fast turnaround, or commission a bespoke design. Guest management and Smart RSVP included.',
    ogImageAlt: 'Glow Wedding — Bespoke wedding websites and ready-made templates',
    templates: {
      title: 'Ready-made wedding website templates',
      description:
        'Glow’s collection of wedding website templates. Public pricing, real demos, delivered in 7–10 days or 1–3 days on express.',
    },
    bespoke: {
      title: 'Bespoke — a wedding website designed from scratch',
      description:
        'A wedding website built from your own story, moodboard and style. Two packages, Memories and Lifelong, with pricing in the open.',
    },
    templateDetail: {
      /** `{name}` is the template's name. */
      title: '{name} template',
    },
    malaysia: {
      title: 'Wedding website templates for Malaysia',
      description:
        'Glow’s wedding website collection, priced in ringgit for couples marrying in Malaysia. Public pricing, real demos, delivered in 7–10 days or 1–3 days on express.',
    },
    book: {
      title: 'Book a call',
      description:
        'Book a 15-minute intro call over Google Meet with the two people who will build your wedding website.',
    },
    booked: {
      title: 'Booking confirmed',
    },
  },

  nav: {
    templates: 'Templates',
    bespoke: 'Bespoke',
    guestList: 'Guest management',
    faq: 'FAQ',
    start: 'Get started',
    /** `{current}` is the active locale, `{other}` the one clicking switches to. */
    languageLabel: 'Language: {current}. Switch to {other}',
    languageNames: {
      en: 'English',
      vi: 'Vietnamese',
    },
  },

  wordmark: {
    logoAlt: 'Glow Wedding logo',
    homeLabel: 'Glow — home',
  },

  footer: {
    copyright: '© 2026 Glow Studio, Vietnam',
  },

  common: {
    optional: 'optional',
    close: 'Close',
    backToHome: 'Back to home',
    viewBespoke: 'See Bespoke',
    browseTemplates: 'Browse templates',
    bookFifteen: 'Book 15 minutes',
  },

  loading: {
    default: 'Good things are worth a moment — Glow is on it…',
    templates: 'Loading the collection…',
    booking: 'Holding your slot…',
    logoAlt: 'Glow Wedding logo',
  },

  notFound: {
    eyebrow: '404',
    title: 'This page isn’t here yet.',
    body: 'The link may have changed, or this part of Glow is still being built.',
  },

  /** The four steps between choosing a template and going live. */
  process: {
    steps: [
      {
        title: 'Pick a template',
        alt: 'A wedding website template detail page, cursor pressing the Choose this template button',
        points: [
          ['Real demo', 'open it now, no guessing from a screenshot'],
          ['Public price', 'nothing to pay at this step'],
        ],
      },
      {
        title: '15-minute call',
        alt: 'The booking form for a 15-minute intro call over Google Meet',
        points: [
          ['Lock the details', 'names, date, venue, photos'],
          ['Your opening', 'what the page opens with'],
        ],
      },
      {
        title: 'Glow builds it',
        alt: 'An illustration of a chef tasting and seasoning a dish',
        points: [
          ['Your chosen template', 'not rebuilt from scratch'],
          ['Unlimited revisions', 'until you are both happy'],
        ],
      },
      {
        title: 'Handover',
        alt: 'A couple’s own domain in the address bar beside a guest list of replies',
        points: [
          ['Live website', 'with your guest dashboard'],
          ['7–10 days', '1–3 days on express'],
        ],
      },
    ],
  },

  home: {
    hero: {
      eyebrow: 'Wedding Website Studio',
      title: 'Share your wedding, your way.',
      points: [
        'Built around each couple’s own story',
        'Fast and smooth on every device',
        'Easy for you and for your guests',
      ],
      caption: 'Every couple opens with something of their own.',
      frameAlts: [
        'Two hands exchanging wedding rings',
        'A bride and groom beneath a veil catching the sunlight',
        'A bride and groom holding hands as they climb a staircase',
      ],
      stripAlts: [
        'A bride and groom close together in soft light',
        'A kiss against an open sky',
        'A bride and groom in a convertible',
        'The bride’s hands with her wedding ring',
        'A bride and groom silhouetted among falling petals',
        'The groom tying the bride’s shoe',
        'A bride and groom crossing the street',
        'Champagne poured over a tower of glasses',
        'A bride and groom in a long veil',
        'A bride and groom on an empty road',
        'An overhead view of the wedding car',
        'A bride and groom showing their wedding rings',
      ],
    },
    valueProps: [
      {
        title: 'Creative entrance',
        points: [
          'Open with something that belongs to just the two of you',
          'Piano keys, a camera lens, a brushstroke, a vinyl record',
          'A different way in for every couple, never repeated',
        ],
      },
      {
        title: 'Guest tracking',
        points: [
          'See who opened the invite, who replied, who is still deciding',
          'Split by the groom’s side, the bride’s side, friends, colleagues',
          'A separate invite link for each group',
        ],
      },
      {
        title: 'Smart RSVP',
        points: [
          'A guest types their name and the system recognises the household',
          'Questions change with the group being asked',
          'Answers land straight on the right record',
        ],
      },
    ],
    process: {
      eyebrow: 'How it works',
      title: 'How your website comes together',
    },
    gallery: {
      eyebrow: 'Collection',
      title: 'Find the template that fits you',
      bannerTitle: 'Nothing quite right?',
      bannerBody: 'Bespoke is designed from scratch around your own story.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What couples ask us most',
      body: 'Still missing the answer you need? Book a consultation and we’ll answer it directly.',
      cta: 'Book a consultation',
      groups: [
        {
          title: 'Process',
          items: [
            {
              q: 'What happens after I book?',
              a: 'Glow confirms within 12 hours. A 15-minute Google Meet settles the content, the photos and the payment. We start building straight after.',
            },
            {
              q: 'How long does it take?',
              a: '7–10 days on average. If you need it sooner, express delivery runs 1–3 days and applies to both ready-made templates and bespoke work.',
            },
            {
              q: 'How many revisions do I get?',
              a: 'Unlimited rounds on content, photos and colour, within the layout you chose.',
            },
            {
              q: 'What about domain and hosting?',
              a: 'A free glow.vn subdomain and 12 months of hosting by default. Want your own domain? Glow helps you point it — any extra cost is quoted during the consultation.',
            },
          ],
        },
        {
          title: 'Templates & Bespoke',
          items: [
            {
              q: 'What can I change in a ready-made template?',
              a: 'Every piece of your own information — names, date and time, venue, all body copy — plus colour, within the template’s existing palette. Up to 60 photos.',
            },
            {
              q: 'What can’t I change?',
              a: 'Not the section structure, not a redesign from scratch, and we don’t shoot your photos or write your copy for you. If you want something more distinct, that’s what Bespoke is for.',
            },
            {
              q: 'How is Bespoke different from a template?',
              a: 'Designed from scratch around your own story, with no existing layout to work within. Pricing lives in the Proposal, published openly on the site before you book.',
            },
            {
              q: 'Is Bespoke more expensive?',
              a: 'Priced by Proposal rather than fixed, because every project differs. Read the Proposal first so you know exactly where you stand before deciding.',
            },
            {
              q: 'Is express available for Bespoke?',
              a: 'Yes. The exact timing depends on complexity and is agreed during the call.',
            },
          ],
        },
        {
          title: 'Features & use',
          items: [
            {
              q: 'Does Smart RSVP cost extra?',
              a: 'No — it is included in both ready-made templates and Bespoke.',
            },
            {
              q: 'Who can use it? Will older guests manage?',
              a: 'The couple are the administrators and sign into the dashboard once Glow hands it over. Guests only type their name into the RSVP link — no technical knowledge needed.',
            },
          ],
        },
      ],
    },
  },

  bespoke: {
    hero: {
      eyebrow: 'Bespoke',
      title: 'Where your story has an address.',
      lede: 'Not just a website, but the place where your story is told, felt, and kept.',
      points: [
        'Designed from scratch around your own story',
        'Bilingual English and Vietnamese, for guests anywhere',
        'Somewhere guests come back to, not only on the day',
      ],
      caption: 'Every Bespoke build starts from your own moodboard.',
      secondaryCta: 'See both packages',
      frameAlts: [
        'A bride and groom in a convertible',
        'A bride and groom in a private moment',
      ],
    },
    experience: {
      eyebrow: 'Digital Experience',
      title: 'A living space, full of memories',
      quote: 'Because every love has its own language.',
      items: [
        {
          title: 'More than a website',
          points: ['Where your story is told, felt, and kept'],
        },
        {
          title: 'Born from your character',
          points: ['Built from each couple’s own style, feeling and journey'],
        },
        {
          title: 'Before, during and after',
          points: ['An experience guests return to, not only on the day'],
        },
      ],
    },
    packages: {
      eyebrow: 'Pricing',
      title: 'Two Bespoke packages',
      lede: 'Both are designed from scratch. The difference is whether the story stops on the wedding day, or keeps living afterwards.',
      cta: 'Book this package',
      items: [
        {
          name: 'Memories Package',
          tagline: 'Where your story has an address',
          points: [
            [
              'Your colours, your character',
              'guests open the link and see your style, not a template everyone else has',
            ],
            [
              'Told in pictures',
              'your love story exactly the way you want your family to understand it',
            ],
            ['One single place', 'RSVP, venue, schedule and dress code'],
            ['Bilingual English–Vietnamese', 'for family and friends anywhere'],
            ['Start early', 'the story opens well before the wedding day'],
          ],
          note: 'VAT included. Nothing to pay before you book.',
        },
        {
          name: 'Lifelong Package',
          tagline: 'A wedding lived before, during, and forever after',
          points: [
            [
              'Before the day',
              'guests already live inside your story through every photo and every personal invitation',
            ],
            [
              'On the day',
              'mini-games, check-in and a guest book, all on the website itself',
            ],
            [
              'After the day',
              'a private space for guests to add photos, and a page you reopen every year',
            ],
            ['Technical support', 'on call throughout the wedding day'],
          ],
          note: 'The wedding ends in one day. The experience does not.',
        },
      ],
    },
    flow: {
      eyebrow: 'How it works',
      title: 'Simple to start, finished down to the detail',
      lede: 'The process flexes around each couple — whichever step needs more time, Glow makes room for it.',
      steps: [
        {
          title: 'Brief & Moodboard',
          points: [
            ['Listening', 'to your love story, your style and your own ideas'],
            ['Shaping', 'the moodboard, the palette and the central feeling'],
          ],
        },
        {
          title: 'First design',
          points: [
            ['3–5 days', 'to finish the first interface design'],
            ['Concrete', 'a complete layout from invitation through to schedule'],
          ],
        },
        {
          title: 'Feedback & Refinement',
          points: [
            ['Talking it through', 'reviewing every detail and every line with you'],
            ['Flexible', 'pausing whenever you need more time to think'],
          ],
        },
        {
          title: 'Deposit & Development',
          points: [
            ['Confirmed', 'the design direction is locked and the deposit placed'],
            ['Engineering', 'building the site and the guest management dashboard'],
          ],
        },
        {
          title: 'Polish & Testing',
          points: [
            ['Smooth', 'display and speed tuned across every device'],
            ['Features', 'RSVP form and every interaction tested'],
          ],
        },
        {
          title: 'Handover & Support',
          points: [
            ['Your own domain', 'the finished website formally handed over'],
            ['On call', 'technical support with you throughout the wedding day'],
          ],
        },
      ],
    },
    reference: {
      title: 'See what we’ve built',
      body: 'Every one of them built from that couple’s own story and moodboard.',
      cta: 'Browse reference work',
    },
    closing: {
      title: 'Because your story deserves a place to live.',
      body: 'We’d love to build it with you.',
    },
  },

  templates: {
    eyebrow: 'Collection',
    title: 'Templates',
    lede: 'One price for every template during this phase. Each one lets you change the content and the colour within its own palette, and every one has a demo you can open right now.',
    bannerTitle: 'Nothing quite right?',
    bannerBody: 'Bespoke is designed from scratch around your own story.',
    gallery: {
      empty: 'No templates match. Try clearing a filter, or take a look at bespoke.',
      filterLabel: 'Filter by style',
      searchPlaceholder: 'Search templates, styles, palettes…',
      searchLabel: 'Search wedding website templates',
    },
    card: {
      expressTitle: 'Express orders available (1–3 days)',
      express: 'Express available',
    },
  },

  /** The Malaysia landing page. Prices on this route are quoted in ringgit. */
  malaysia: {
    eyebrow: 'Malaysia',
    title: 'Wedding websites, priced for Malaysia',
    lede: 'The same collection Glow builds for couples in Vietnam, quoted in ringgit. Every template is built for you — you choose the design, we put your story in it — and each one has a demo you can open right now.',
    /** Sits under the hero, three short reassurances in a row. */
    points: [
      {
        label: 'Priced in ringgit',
        body: 'No conversion, no surprise at checkout. What you see is what you pay.',
      },
      {
        label: 'Built for you',
        body: 'Send us your photos and details. No editor to wrestle with.',
      },
      {
        label: '7–10 days',
        body: 'Or 1–3 days on express, marked with a bolt on the card.',
      },
    ],
    bannerTitle: 'Talk to us before you decide.',
    bannerBody:
      'Fifteen minutes over Google Meet, in English — bring your date, your guest count and any template you have your eye on.',
  },

  templateDetail: {
    eyebrow: 'Wedding website · English & Vietnamese · Mobile-first',
    back: '← Back to the collection',
    sectionsTitle: 'Sections included',
    sectionsMore: 'Show {count} more',
    sectionsLess: 'Show less',
    vatNote: 'VAT included. Nothing to pay before you book.',
    choose: 'Choose this template',
    demo: 'Open the live demo',
    moreDistinct: 'Want something more distinct?',
    moreDistinctShort: 'Want something more distinct? See Bespoke',
    deliveryLabel: 'Delivery time',
    deliveryValue: '7–10 days on average',
    deliveryExpress: ', 1–3 days on express',
    revisionsLabel: 'Revisions',
    revisionsValue: 'Unlimited',
    aboutTitle: 'About this template',
    reassuranceTitle: 'You pick the template, Glow builds the site',
    reassuranceBody: 'No fiddling with an editor to get it right.',
    gallery: {
      thumb: 'View photo {index}',
      prev: 'Previous photo',
      next: 'Next photo',
      zoom: 'Zoom',
      lightboxLabel: 'Full-screen photo viewer',
      closeEsc: 'Close (Esc)',
    },
    related: {
      title: 'You might also like',
      all: 'See all templates →',
      eyebrow: 'Bespoke',
      title2: 'None of them quite right?',
      body: 'Glow Bespoke builds a wedding website from scratch around your own story and palette.',
    },
  },

  booking: {
    steps: ['Date & time', 'Your details', 'Confirmation'],
    railTitle: 'Intro',
    meetingName: 'Intro',
    meetingDescription:
      'A short conversation with the two people who will build your website.',
    /** `{minutes}` is `MEETING.durationMin`. */
    durationValue: '{minutes} minutes',
    rail: {
      duration: 'Duration',
      platform: 'Format',
      timezone: 'Time zone',
      template: 'Chosen template',
      selected: 'Selected',
      topic: 'Topic',
      payment: 'Payment',
    },
    intro: {
      eyebrow: 'Next step',
      title: 'Thank you for trusting Glow',
      body: 'To get your website underway, book a 15-minute call with Glow to settle the content and the payment.',
      points: [
        ['7–10 days on average', 'for the finished website after the call'],
        ['Express 1–3 days', 'Glow adds 20% to the cost'],
      ],
      cta: 'Pick a time',
    },
    calendar: {
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      /** `{month}` is the rendered month label. */
      gridLabel: 'Choose a day in {month}',
      openDays: 'Intro calls run Tuesday to Saturday.',
      /** `{minutes}` is `MEETING.durationMin`. */
      pickDay: 'Pick a day to see the times still open. Each call runs {minutes} minutes.',
      continue: 'Continue',
      continueHint: 'Choose a date and time to continue.',
    },
    details: {
      name: 'Your name',
      email: 'Email',
      emailPlaceholder: 'where Glow sends the meeting invite',
      phone: 'Phone number',
      phonePlaceholder: '0901 234 567',
      social: 'Another way to reach you',
      socialPlaceholder: 'Instagram, Facebook, Zalo…',
      readyWhen: 'When do you need the website ready',
      readyWhenPlaceholder: 'Choose a rough timeframe',
      referral: 'How did you hear about Glow',
      referralPlaceholder: 'Pick one',
      planner: 'Wedding planner’s name',
      plannerPlaceholder: 'Planner or studio name',
      plannerHint: 'Glow sends a thank-you to whoever referred you.',
      noPayment:
        'Nothing to pay now. You can move or cancel the call any time from the confirmation email.',
      submit: 'Book the call',
      submitting: 'Holding your slot…',
      /** Client-side validation. The server half lands with the Apps Script endpoint. */
      errors: {
        name: 'Let Glow know your name.',
        phoneRequired: 'A phone number, in case the call goes astray.',
        phoneInvalid: 'That phone number doesn’t look right.',
        emailRequired: 'An email, so Glow can send the Google Meet link.',
        emailInvalid: 'That email doesn’t look right.',
        readyWhen: 'A rough timeframe is enough.',
        referral: 'Pick one — it genuinely helps.',
        referralPlanner: 'Let Glow know the wedding planner’s name.',
      },
      /**
       * `value` is the stable string submitted to the booking endpoint and must
       * never be translated; only `label` changes with the locale.
       */
      readyWhenOptions: [
        { value: '1-2-weeks', label: 'Within 1–2 weeks (express needed)' },
        { value: 'within-1-month', label: 'Within a month' },
        { value: '1-3-months', label: 'In 1–3 months' },
        { value: 'over-3-months', label: 'More than 3 months away' },
        { value: 'not-sure', label: 'Not sure yet' },
      ],
      referralOptions: [
        { value: 'google', label: 'Google' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'wedding-planner', label: 'Wedding planner' },
        { value: 'other', label: 'Other' },
      ],
    },
    confirmed: {
      title: 'Your call is booked.',
      body: 'Glow has your request. We’ll email a confirmation with the Google Meet link and get back to you within 12 hours.',
      bespokeNote: 'You can revisit the Proposal before the meeting.',
      bespokeTopic: 'Bespoke consultation',
      pendingSlot: 'Glow will confirm by email',
      noPaymentYet: 'Not yet',
      fallbackTemplate: 'Ready-made template',
    },
    /** Calendar and slot formatting. */
    dates: {
      weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      weekdaysLong: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      /** Standalone, e.g. the calendar heading "August 2026". */
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      /**
       * Mid-sentence, e.g. "12 August 2026". Identical in English; Vietnamese
       * drops the capital, because "12 Tháng 8" reads as a heading spliced into
       * a sentence.
       */
      monthsInline: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  },

  /**
   * Closed vocabularies stored in Sanity. The Vietnamese string is the stored
   * key — translating these in the CMS would break the style filter and the
   * related-template matching, both of which compare stored values. Anything
   * missing here falls through to the stored string unchanged.
   */
  vocab: {
    styleTags: {
      'Tất cả': 'All',
      'Tối giản': 'Minimal',
      'Lãng mạn': 'Romantic',
      'Hiện đại': 'Modern',
      'Cổ điển': 'Classic',
    } as Record<string, string>,
    sections: {
      'Trang chủ': 'Home',
      'Câu chuyện': 'Our story',
      'Thông tin lễ cưới': 'Wedding details',
      'Dòng thời gian': 'Timeline',
      'Sự kiện': 'Events',
      'Gia đình': 'Families',
      Album: 'Album',
      Dresscode: 'Dress code',
      'Nhạc tự chọn': 'Music',
      'Smart RSVP': 'Smart RSVP',
      RSVP: 'RSVP',
      'Mừng cưới': 'Wedding gifts',
      'E-visa': 'E-visa',
      'Travel guide': 'Travel guide',
    } as Record<string, string>,
  },
}

/**
 * Deliberately *not* `as const`: the literal types that would produce are
 * unsatisfiable by a translation, so widening here is what lets `vi.ts` be
 * checked against the shape rather than against English prose.
 */
export type Dictionary = typeof en
