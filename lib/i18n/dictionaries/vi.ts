/**
 * Vietnamese copy. Typed against `Dictionary` (defined by `en.ts`), so adding a
 * key in English breaks the build here until it is translated.
 *
 * The strings are the site's original Vietnamese, moved rather than rewritten —
 * where a line was already English on purpose ("Creative entrance", the Bespoke
 * package names and their taglines), it stays English in both dictionaries,
 * exactly as the Proposal deck sets them.
 */

import type { Dictionary } from './en'

export const vi: Dictionary = {
  meta: {
    siteName: 'Glow Wedding',
    titleDefault: 'Glow — Website cưới thiết kế riêng và mẫu có sẵn',
    titleTemplate: '%s · Glow',
    description:
      'Glow thiết kế website cưới cho từng cặp đôi: chọn mẫu có sẵn để làm nhanh, hoặc đặt thiết kế riêng. Kèm quản lý khách mời và Smart RSVP.',
    ogImageAlt: 'Glow Wedding — Website cưới thiết kế riêng và mẫu có sẵn',
    templates: {
      title: 'Mẫu website cưới có sẵn',
      description:
        'Bộ sưu tập mẫu website cưới của Glow. Giá công khai, có demo thật, bàn giao 7–10 ngày hoặc hoả tốc 1–3 ngày.',
    },
    bespoke: {
      title: 'Bespoke — website cưới thiết kế riêng',
      description:
        'Website cưới dựng từ đầu theo câu chuyện, moodboard và phong cách riêng của hai bạn. Hai gói Memories và Lifelong, giá công khai.',
    },
    templateDetail: {
      title: 'Mẫu {name}',
    },
    malaysia: {
      title: 'Mẫu website cưới cho thị trường Malaysia',
      description:
        'Bộ sưu tập website cưới của Glow, báo giá bằng Ringgit cho các cặp đôi cưới tại Malaysia. Giá công khai, có demo thật, bàn giao 7–10 ngày hoặc hoả tốc 1–3 ngày.',
    },
    book: {
      title: 'Đặt lịch trò chuyện',
      description:
        'Đặt buổi Intro 15 phút qua Google Meet với hai người sẽ trực tiếp làm website cưới cho bạn.',
    },
    booked: {
      title: 'Đã đặt lịch',
    },
  },

  nav: {
    templates: 'Mẫu có sẵn',
    bespoke: 'Bespoke',
    guestList: 'Quản lý khách mời',
    faq: 'Câu hỏi',
    start: 'Bắt đầu',
    languageLabel: 'Ngôn ngữ: {current}. Đổi sang {other}',
    languageNames: {
      en: 'English',
      vi: 'Tiếng Việt',
    },
  },

  wordmark: {
    logoAlt: 'Logo Glow Wedding',
    homeLabel: 'Glow — trang chủ',
  },

  footer: {
    copyright: '© 2026 Glow Studio, Việt Nam',
  },

  common: {
    optional: 'không bắt buộc',
    close: 'Đóng',
    backToHome: 'Về trang chủ',
    viewBespoke: 'Xem Bespoke',
    browseTemplates: 'Xem mẫu có sẵn',
    bookFifteen: 'Đặt lịch 15 phút',
  },

  loading: {
    default: 'Muốn đẹp thì đợi Glow một tẹo…',
    templates: 'Đang tải bộ sưu tập mẫu…',
    booking: 'Đang giữ chỗ cho bạn…',
    logoAlt: 'Logo Glow Wedding',
  },

  notFound: {
    eyebrow: '404',
    title: 'Trang này chưa có ở đây.',
    body: 'Có thể đường dẫn đã đổi, hoặc phần này của Glow đang được dựng.',
  },

  process: {
    steps: [
      {
        title: 'Chọn mẫu',
        alt: 'Trang chi tiết một mẫu website cưới, con trỏ đang bấm nút Chọn mẫu này',
        points: [
          ['Demo thật', 'mở được ngay, không đoán qua ảnh'],
          ['Giá công khai', 'chưa cần thanh toán ở bước này'],
        ],
      },
      {
        title: 'Meeting 15 phút',
        alt: 'Form đặt lịch buổi Intro 15 phút qua Google Meet',
        points: [
          ['Chốt thông tin', 'tên, ngày giờ, địa điểm, ảnh'],
          ['Cách mở đầu', 'trang sẽ mở ra bằng điều gì'],
        ],
      },
      {
        title: 'Glow tinh chỉnh',
        alt: 'Hình vẽ một đầu bếp đang nêm nếm món ăn',
        points: [
          ['Đúng mẫu đã chọn', 'không dựng lại từ đầu'],
          ['Sửa không giới hạn', 'tới khi hai bạn ưng'],
        ],
      },
      {
        title: 'Bàn giao',
        alt: 'Thanh địa chỉ tên miền riêng của cặp đôi và bảng danh sách khách mời đã trả lời',
        points: [
          ['Link website', 'kèm dashboard khách mời'],
          ['7–10 ngày', 'hoả tốc 1–3 ngày'],
        ],
      },
    ],
  },

  home: {
    hero: {
      eyebrow: 'Wedding Website Studio',
      title: 'Chia sẻ đám cưới theo cách của hai bạn.',
      points: [
        'Mang câu chuyện riêng của từng cặp đôi',
        'Mở nhanh, mượt trên mọi thiết bị',
        'Dễ dùng cho cả hai bạn lẫn khách mời',
      ],
      caption: 'Mỗi cặp đôi mở đầu bằng một thứ của riêng mình.',
      frameAlts: [
        'Hai bàn tay trao nhẫn cưới',
        'Cô dâu chú rể dưới tấm voan bay trong nắng',
        'Cô dâu chú rể nắm tay nhau bước lên bậc thang',
      ],
      stripAlts: [
        'Cô dâu chú rể sát bên nhau trong ánh sáng dịu',
        'Nụ hôn dưới nền trời',
        'Cô dâu chú rể trên chiếc xe mui trần',
        'Đôi tay cô dâu với nhẫn cưới',
        'Bóng cô dâu chú rể giữa cánh hoa bay',
        'Chú rể buộc dây giày cho cô dâu',
        'Cô dâu chú rể băng qua đường phố',
        'Khui rượu mừng bên tháp ly',
        'Cô dâu chú rể trong tấm voan dài',
        'Cô dâu chú rể trên con đường vắng',
        'Nhìn từ trên xuống chiếc xe cưới',
        'Cô dâu chú rể khoe nhẫn cưới',
      ],
    },
    valueProps: [
      {
        title: 'Creative entrance',
        points: [
          'Mở đầu bằng một thứ thuộc về riêng hai bạn',
          'Phím đàn piano, ống kính máy ảnh, nét cọ vẽ, chiếc đĩa than',
          'Mỗi cặp đôi một cách vào, không lặp lại',
        ],
      },
      {
        title: 'Theo dõi khách mời',
        points: [
          'Biết ai đã mở thiệp, ai đã trả lời, ai còn để ngỏ',
          'Chia nhà trai, nhà gái, bạn bè, đồng nghiệp',
          'Link mời riêng cho từng nhóm',
        ],
      },
      {
        title: 'Smart RSVP',
        points: [
          'Khách gõ tên, hệ thống nhận ra cả nhà',
          'Câu hỏi đổi theo từng nhóm khách',
          'Câu trả lời ghi thẳng vào đúng bản ghi',
        ],
      },
    ],
    process: {
      eyebrow: 'Quy trình',
      title: 'Website của hai bạn ra đời thế nào',
    },
    gallery: {
      eyebrow: 'Bộ sưu tập',
      title: 'Chọn mẫu hợp gu của bạn',
      bannerTitle: 'Không thấy mẫu hợp gu?',
      bannerBody: 'Bespoke thiết kế từ đầu theo câu chuyện riêng của bạn.',
    },
    faq: {
      eyebrow: 'Câu hỏi thường gặp',
      title: 'Những điều hai bạn hay hỏi',
      body: 'Chưa thấy câu trả lời mình cần? Đặt lịch một buổi tư vấn, Glow trả lời trực tiếp.',
      cta: 'Đặt lịch tư vấn',
      groups: [
        {
          title: 'Quy trình',
          items: [
            {
              q: 'Đặt lịch xong thì chuyện gì xảy ra?',
              a: 'Glow liên hệ xác nhận trong vòng 12 giờ. Buổi meeting 15 phút qua Google Meet để chốt nội dung, ảnh, và thanh toán. Sau đó Glow bắt tay vào làm ngay.',
            },
            {
              q: 'Bao lâu thì xong?',
              a: 'Trung bình 7–10 ngày. Cần gấp thì có lựa chọn hoả tốc 1–3 ngày, áp dụng cho cả mẫu có sẵn lẫn thiết kế riêng.',
            },
            {
              q: 'Sửa được mấy lần?',
              a: 'Không giới hạn số vòng sửa nội dung, hình ảnh, màu sắc theo đúng bố cục đã chọn.',
            },
            {
              q: 'Domain và hosting thế nào?',
              a: 'Mặc định dùng subdomain glow.vn miễn phí, hosting 12 tháng. Muốn domain riêng, Glow hỗ trợ trỏ domain, phụ phí báo cụ thể khi tư vấn.',
            },
          ],
        },
        {
          title: 'Mẫu có sẵn & Bespoke',
          items: [
            {
              q: 'Mẫu có sẵn thì tôi đổi được gì?',
              a: 'Đổi toàn bộ thông tin cá nhân (tên, ngày giờ, địa điểm, nội dung chữ) và đổi màu theo bảng màu có sẵn của mẫu. Tối đa 60 ảnh.',
            },
            {
              q: 'Tôi không đổi được gì?',
              a: 'Không đổi cấu trúc section, không thiết kế lại từ đầu, không chụp ảnh hay viết nội dung thay bạn. Muốn thứ khác biệt hơn, đó là lúc nên xem Bespoke.',
            },
            {
              q: 'Bespoke khác mẫu có sẵn ở đâu?',
              a: 'Thiết kế từ đầu theo câu chuyện riêng của hai bạn, không giới hạn theo bố cục có sẵn. Giá nằm trong bản Proposal, xem công khai ngay trên site trước khi đặt lịch.',
            },
            {
              q: 'Bespoke có mắc hơn không?',
              a: 'Giá theo Proposal, không cố định như mẫu có sẵn vì mỗi dự án khác nhau. Xem Proposal trước để biết chính xác trước khi quyết định.',
            },
            {
              q: 'Bespoke có nhận hoả tốc không?',
              a: 'Có, thời gian cụ thể tuỳ độ phức tạp, thoả thuận trong buổi meeting.',
            },
          ],
        },
        {
          title: 'Tính năng & sử dụng',
          items: [
            {
              q: 'Tính năng Smart RSVP có tính phí thêm không?',
              a: 'Không, đã bao gồm sẵn trong cả mẫu có sẵn và Bespoke.',
            },
            {
              q: 'Ai dùng được, khách lớn tuổi có dùng nổi không?',
              a: 'Cô dâu chú rể là người quản lý, tự đăng nhập dashboard sau khi Glow bàn giao. Khách mời chỉ cần gõ tên vào link RSVP, không cần biết dùng công nghệ.',
            },
          ],
        },
      ],
    },
  },

  bespoke: {
    hero: {
      eyebrow: 'Bespoke',
      title: 'Nơi câu chuyện của hai bạn có một địa chỉ.',
      lede: 'Không chỉ là một website, mà là nơi câu chuyện của hai người được kể, được cảm, và được giữ lại.',
      points: [
        'Thiết kế từ đầu theo câu chuyện của riêng hai bạn',
        'Song ngữ Việt – Anh cho khách ở khắp nơi',
        'Một nơi khách muốn quay lại, không chỉ trong ngày cưới',
      ],
      caption: 'Mỗi bản Bespoke bắt đầu từ moodboard của chính hai bạn.',
      secondaryCta: 'Xem hai gói',
      frameAlts: [
        'Cô dâu chú rể trên chiếc xe mui trần',
        'Cô dâu chú rể trong khoảnh khắc riêng tư',
      ],
    },
    experience: {
      eyebrow: 'Digital Experience',
      title: 'Một không gian sống, đầy kỷ niệm',
      quote: 'Because every love has its own language.',
      items: [
        {
          title: 'Không chỉ là một website',
          points: ['Nơi câu chuyện của hai người được kể, được cảm, và được giữ lại'],
        },
        {
          title: 'Sinh ra từ chất riêng',
          points: ['Dựng từ chính phong cách, cảm xúc và hành trình của mỗi cặp đôi'],
        },
        {
          title: 'Trước, trong và sau',
          points: ['Một trải nghiệm khách mời muốn quay lại, không chỉ trong ngày cưới'],
        },
      ],
    },
    packages: {
      eyebrow: 'Bảng giá',
      title: 'Hai gói Bespoke',
      lede: 'Cả hai đều được thiết kế từ đầu. Khác nhau ở chỗ câu chuyện dừng lại ở ngày cưới, hay còn sống tiếp sau đó.',
      cta: 'Đặt lịch cho gói này',
      items: [
        {
          name: 'Memories Package',
          tagline: 'Where your story has an address',
          points: [
            [
              'Đúng màu, đúng chất',
              'khách mở link là thấy phong cách riêng của hai bạn, không phải mẫu ai cũng có',
            ],
            [
              'Kể bằng hình ảnh',
              'câu chuyện tình yêu theo đúng cách hai bạn muốn người thân hiểu',
            ],
            ['Một nơi duy nhất', 'RSVP, địa điểm, lịch trình và dress code'],
            ['Song ngữ Việt – Anh', 'cho gia đình và bạn bè ở nhiều nơi'],
            ['Bắt đầu sớm', 'câu chuyện mở ra từ trước ngày cưới'],
          ],
          note: 'Đã bao gồm VAT. Chưa cần thanh toán trước khi đặt lịch.',
        },
        {
          name: 'Lifelong Package',
          tagline: 'A wedding lived before, during, and forever after',
          points: [
            [
              'Trước ngày cưới',
              'khách đã sống trong câu chuyện của hai bạn qua từng tấm hình, từng lời mời riêng',
            ],
            [
              'Trong ngày cưới',
              'mini-game, check-in và sổ lưu bút trực tiếp trên website',
            ],
            [
              'Sau ngày cưới',
              'không gian riêng để khách lưu ảnh, và một trang hai bạn mở lại mỗi năm',
            ],
            ['Hỗ trợ kỹ thuật', 'trực suốt ngày cưới'],
          ],
          note: 'The wedding ends in one day. The experience does not.',
        },
      ],
    },
    flow: {
      eyebrow: 'Quy trình',
      title: 'Bắt đầu đơn giản, hoàn thiện tới từng chi tiết',
      lede: 'Quy trình linh hoạt theo từng cặp đôi — bước nào cần thêm thời gian, Glow giãn ra ở bước đó.',
      steps: [
        {
          title: 'Brief & Moodboard',
          points: [
            ['Lắng nghe', 'câu chuyện tình yêu, phong cách và ý tưởng riêng'],
            ['Định hình', 'moodboard, tông màu và cảm xúc chủ đạo'],
          ],
        },
        {
          title: 'Bản thiết kế đầu',
          points: [
            ['3–5 ngày', 'hoàn thiện bản thiết kế giao diện đầu tiên'],
            ['Trực quan', 'bố cục hoàn chỉnh từ lời mời đến lịch trình'],
          ],
        },
        {
          title: 'Feedback & Tinh chỉnh',
          points: [
            ['Trao đổi', 'cùng hai bạn rà soát từng chi tiết và câu chữ'],
            ['Linh hoạt', 'giãn thời gian bất cứ lúc nào cần suy nghĩ thêm'],
          ],
        },
        {
          title: 'Đặt cọc & Phát triển',
          points: [
            ['Xác nhận', 'chốt phương án thiết kế chính thức và đặt cọc'],
            ['Lập trình', 'phát triển trang web và dashboard quản lý khách'],
          ],
        },
        {
          title: 'Hoàn thiện & Kiểm thử',
          points: [
            ['Mượt mà', 'tối ưu hiển thị và tốc độ trên mọi dòng máy'],
            ['Tính năng', 'kiểm thử form RSVP và các tương tác trải nghiệm'],
          ],
        },
        {
          title: 'Bàn giao & Đồng hành',
          points: [
            ['Tên miền riêng', 'chính thức bàn giao website hoàn thiện'],
            ['Trực chiến', 'đội ngũ hỗ trợ kỹ thuật xuyên suốt ngày cưới'],
          ],
        },
      ],
    },
    reference: {
      title: 'Xem các bản đã làm',
      body: 'Tất cả đều dựng từ câu chuyện và moodboard của chính từng cặp đôi.',
      cta: 'Xem mẫu tham khảo',
    },
    closing: {
      title: 'Vì câu chuyện của hai bạn xứng đáng có một nơi để sống.',
      body: 'Glow rất mong được đồng hành cùng hai bạn.',
    },
  },

  templates: {
    eyebrow: 'Bộ sưu tập',
    title: 'Mẫu có sẵn',
    lede: 'Cùng một mức giá cho mọi mẫu trong giai đoạn này. Mỗi mẫu đổi được nội dung và màu sắc theo bảng màu có sẵn, và đều có bản demo mở được ngay.',
    bannerTitle: 'Không thấy mẫu hợp gu?',
    bannerBody: 'Bespoke thiết kế từ đầu theo câu chuyện riêng của bạn.',
    gallery: {
      empty: 'Chưa có mẫu nào khớp. Thử bỏ bớt bộ lọc, hoặc xem thiết kế riêng.',
      filterLabel: 'Lọc theo phong cách',
      searchPlaceholder: 'Tìm mẫu, phong cách, tông màu…',
      searchLabel: 'Tìm mẫu website cưới',
    },
    card: {
      expressTitle: 'Còn nhận hoả tốc (1–3 ngày)',
      express: 'Còn nhận hoả tốc',
    },
  },

  malaysia: {
    eyebrow: 'Malaysia',
    title: 'Website cưới, báo giá cho thị trường Malaysia',
    lede: 'Vẫn là bộ sưu tập Glow làm cho các cặp đôi ở Việt Nam, báo giá bằng Ringgit. Mỗi mẫu đều do Glow dựng cho bạn — bạn chọn giao diện, Glow đưa câu chuyện của bạn vào — và mẫu nào cũng có demo mở xem được ngay.',
    points: [
      {
        label: 'Báo giá bằng Ringgit',
        body: 'Không quy đổi, không phát sinh lúc chốt. Thấy số nào trả số đó.',
      },
      {
        label: 'Glow dựng giúp bạn',
        body: 'Bạn gửi ảnh và thông tin. Không phải tự loay hoay với trình chỉnh sửa.',
      },
      {
        label: '7–10 ngày',
        body: 'Hoặc 1–3 ngày nếu hoả tốc, mẫu nào nhận sẽ có dấu tia sét trên card.',
      },
    ],
    bannerTitle: 'Trò chuyện với Glow trước khi quyết định.',
    bannerBody:
      'Mười lăm phút qua Google Meet, nói tiếng Anh — mang theo ngày cưới, số khách và mẫu bạn đang để ý.',
  },

  templateDetail: {
    eyebrow: 'Website cưới · Song ngữ Việt – Anh · Tối ưu điện thoại',
    back: '← Quay lại bộ sưu tập',
    sectionsTitle: 'Các section có sẵn',
    sectionsMore: 'Xem thêm {count}',
    sectionsLess: 'Thu gọn',
    vatNote: 'Đã bao gồm VAT. Không cần thanh toán trước khi đặt lịch.',
    choose: 'Chọn mẫu này',
    demo: 'Xem demo thật',
    moreDistinct: 'Cần riêng biệt hơn?',
    moreDistinctShort: 'Cần riêng biệt hơn? Xem Bespoke',
    deliveryLabel: 'Thời gian bàn giao',
    deliveryValue: 'Trung bình 7–10 ngày',
    deliveryExpress: ', hoả tốc 1–3 ngày',
    revisionsLabel: 'Số vòng sửa',
    revisionsValue: 'Không giới hạn',
    aboutTitle: 'Về mẫu này',
    reassuranceTitle: 'Bạn chọn template, Glow làm web cho bạn',
    reassuranceBody: 'Không cần tốn thời gian chỉnh sửa mày mò.',
    gallery: {
      thumb: 'Xem ảnh {index}',
      prev: 'Ảnh trước',
      next: 'Ảnh tiếp theo',
      zoom: 'Phóng to',
      lightboxLabel: 'Xem ảnh toàn màn hình',
      closeEsc: 'Đóng (Esc)',
    },
    related: {
      title: 'Có thể bạn cũng thích',
      all: 'Xem tất cả mẫu →',
      eyebrow: 'Thiết kế riêng',
      title2: 'Không mẫu nào đúng ý?',
      body: 'Glow Bespoke dựng website cưới từ đầu theo câu chuyện và bảng màu của riêng hai bạn.',
    },
  },

  booking: {
    steps: ['Ngày & giờ', 'Thông tin', 'Xác nhận'],
    railTitle: 'Intro',
    meetingName: 'Intro',
    meetingDescription:
      'Buổi trò chuyện ngắn với hai người sẽ trực tiếp làm website cho bạn.',
    durationValue: '{minutes} phút',
    rail: {
      duration: 'Thời lượng',
      platform: 'Hình thức',
      timezone: 'Múi giờ',
      template: 'Mẫu đã chọn',
      selected: 'Đã chọn',
      topic: 'Nội dung',
      payment: 'Thanh toán',
    },
    intro: {
      eyebrow: 'Bước tiếp theo',
      title: 'Cảm ơn bạn đã tin tưởng Glow',
      body: 'Để website đến tay bạn, hãy xếp một buổi call 15 phút với Glow để chốt các nội dung trong website và thanh toán nhé.',
      points: [
        ['Trung bình 7–10 ngày', 'website hoàn thiện sau buổi call'],
        ['Hoả tốc 1–3 ngày', 'Glow tính thêm 20% chi phí'],
      ],
      cta: 'Chọn lịch call',
    },
    calendar: {
      prevMonth: 'Tháng trước',
      nextMonth: 'Tháng sau',
      gridLabel: 'Chọn ngày trong {month}',
      openDays: 'Buổi Intro diễn ra từ thứ Ba đến thứ Bảy.',
      pickDay: 'Chọn một ngày để xem khung giờ còn trống. Mỗi buổi kéo dài {minutes} phút.',
      continue: 'Tiếp tục',
      continueHint: 'Chọn ngày và giờ để đi tiếp.',
    },
    details: {
      name: 'Tên bạn',
      email: 'Email',
      emailPlaceholder: 'nơi Glow gửi lời mời họp',
      phone: 'Số điện thoại',
      phonePlaceholder: '0901 234 567',
      social: 'Kênh liên hệ khác',
      socialPlaceholder: 'Instagram, Facebook, Zalo…',
      readyWhen: 'Khi nào cần website ready',
      readyWhenPlaceholder: 'Chọn mốc thời gian',
      referral: 'Sao bạn biết đến Glow',
      referralPlaceholder: 'Chọn một mục',
      planner: 'Tên Wedding Planner',
      plannerPlaceholder: 'Tên planner hoặc studio',
      plannerHint: 'Glow gửi lời cảm ơn tới nơi đã giới thiệu bạn.',
      noPayment:
        'Chưa cần thanh toán. Bạn có thể đổi hoặc huỷ lịch bất cứ lúc nào qua email xác nhận.',
      submit: 'Đặt lịch',
      submitting: 'Đang giữ chỗ…',
      errors: {
        name: 'Cho Glow biết tên bạn nhé.',
        phoneRequired: 'Cần số điện thoại để liên hệ khi lỡ hẹn.',
        phoneInvalid: 'Số điện thoại chưa hợp lệ.',
        emailRequired: 'Cần email để gửi link Google Meet.',
        emailInvalid: 'Email chưa hợp lệ.',
        readyWhen: 'Chọn mốc thời gian gần đúng cũng được.',
        referral: 'Chọn một mục giúp Glow nhé.',
        referralPlanner: 'Cho Glow biết tên Wedding Planner nhé.',
      },
      readyWhenOptions: [
        { value: '1-2-weeks', label: 'Trong 1–2 tuần (cần hoả tốc)' },
        { value: 'within-1-month', label: 'Trong vòng 1 tháng' },
        { value: '1-3-months', label: '1–3 tháng nữa' },
        { value: 'over-3-months', label: 'Hơn 3 tháng nữa' },
        { value: 'not-sure', label: 'Chưa chắc chắn' },
      ],
      referralOptions: [
        { value: 'google', label: 'Google' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'wedding-planner', label: 'Wedding Planner' },
        { value: 'other', label: 'Khác' },
      ],
    },
    confirmed: {
      title: 'Đã giữ chỗ cho buổi trò chuyện.',
      body: 'Glow đã nhận yêu cầu của bạn. Chúng tôi sẽ gửi email xác nhận kèm link Google Meet, và liên hệ lại trong vòng 12 giờ.',
      bespokeNote: 'Bạn có thể xem lại bản Proposal trước buổi meeting.',
      bespokeTopic: 'Tư vấn Bespoke',
      pendingSlot: 'Glow sẽ xác nhận qua email',
      noPaymentYet: 'Chưa cần',
      fallbackTemplate: 'Mẫu có sẵn',
    },
    dates: {
      weekdaysShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      weekdaysLong: [
        'Thứ Hai',
        'Thứ Ba',
        'Thứ Tư',
        'Thứ Năm',
        'Thứ Sáu',
        'Thứ Bảy',
        'Chủ Nhật',
      ],
      months: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      monthsInline: [
        'tháng 1',
        'tháng 2',
        'tháng 3',
        'tháng 4',
        'tháng 5',
        'tháng 6',
        'tháng 7',
        'tháng 8',
        'tháng 9',
        'tháng 10',
        'tháng 11',
        'tháng 12',
      ],
    },
  },

  /** The stored key is already Vietnamese, so these are identity mappings. */
  vocab: {
    styleTags: {
      'Tất cả': 'Tất cả',
      'Tối giản': 'Tối giản',
      'Lãng mạn': 'Lãng mạn',
      'Hiện đại': 'Hiện đại',
      'Cổ điển': 'Cổ điển',
    },
    sections: {
      'Trang chủ': 'Trang chủ',
      'Câu chuyện': 'Câu chuyện',
      'Thông tin lễ cưới': 'Thông tin lễ cưới',
      'Dòng thời gian': 'Dòng thời gian',
      'Sự kiện': 'Sự kiện',
      'Gia đình': 'Gia đình',
      Album: 'Album',
      Dresscode: 'Dresscode',
      'Nhạc tự chọn': 'Nhạc tự chọn',
      'Smart RSVP': 'Smart RSVP',
      RSVP: 'RSVP',
      'Mừng cưới': 'Mừng cưới',
      'E-visa': 'E-visa',
      'Travel guide': 'Travel guide',
    },
  },
}
