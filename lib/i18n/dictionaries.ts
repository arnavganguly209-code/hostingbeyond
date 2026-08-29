import type { LanguageCode } from "@/config/geo";

export type Dictionary = {
  nav: {
    domains: string;
    businessEmail: string;
    hosting: string;
    resources: string;
    login: string;
    getStarted: string;
  };
  locale: {
    selectLocation: string;
    searchPlaceholder: string;
    country: string;
    language: string;
    apply: string;
    close: string;
    noResults: string;
  };
  hero: {
    headline: string;
    headlineAccent: string;
    description: string;
    searchPlaceholder: string;
    bulkSearch: string;
    search: string;
    trustUptime: string;
    trustUptimeSub: string;
    trustSecure: string;
    trustSecureSub: string;
    trustSupport: string;
    trustSupportSub: string;
  };
  products: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    perYear: string;
    perMonth: string;
    perMailbox: string;
    startingPlan: string;
    domainTitle: string;
    domainBadge: string;
    domainHighlight: string;
    domainCta: string;
    domainSearchPlaceholder: string;
    emailTitle: string;
    emailSubtitle: string;
    emailBadge: string;
    emailCta: string;
    hostingTitle: string;
    hostingSubtitle: string;
    hostingBadge: string;
    hostingCta: string;
    domainFeatures: string[];
    emailFeatures: string[];
    hostingFeatures: string[];
  };
};

const en: Dictionary = {
  nav: {
    domains: "Domains",
    businessEmail: "Business Email",
    hosting: "Hosting",
    resources: "Resources",
    login: "Login",
    getStarted: "Get Started",
  },
  locale: {
    selectLocation: "Select location & language",
    searchPlaceholder: "Search country or language",
    country: "Country",
    language: "Language",
    apply: "Apply",
    close: "Close",
    noResults: "No countries found",
  },
  hero: {
    headline: "Everything You Need.",
    headlineAccent: "Beyond Expectations.",
    description:
      "Premium domains, blazing-fast hosting, and secure business email — everything you need to build, grow, and succeed online.",
    searchPlaceholder: "Find your perfect domain",
    bulkSearch: "Bulk Search",
    search: "Search",
    trustUptime: "99.99% Uptime",
    trustUptimeSub: "Network Guarantee",
    trustSecure: "Secure & Trusted",
    trustSecureSub: "Your data is safe",
    trustSupport: "24/7 Expert Support",
    trustSupportSub: "We're here for you",
  },
  products: {
    eyebrow: "Everything You Need",
    title: "Power Your Online Success",
    titleAccent: "Everything in One Place",
    description:
      "Get premium domains, professional email, and blazing-fast hosting at unbeatable prices. Simple, secure, and built for your growth.",
    perYear: "/ 1 Year",
    perMonth: "/ Month",
    perMailbox: "Per Mailbox",
    startingPlan: "Starting Plan",
    domainTitle: "Domain Site",
    domainBadge: "Best Value",
    domainHighlight: "+ Free 2 Business Mail 1 Year",
    domainCta: "Find Your Domain",
    domainSearchPlaceholder: "Enter your domain name",
    emailTitle: "Business Email",
    emailSubtitle: "Professional Email for Your Business",
    emailBadge: "Professional",
    emailCta: "Get Business Email",
    hostingTitle: "Web Hosting",
    hostingSubtitle: "Blazing-Fast Hosting Plans",
    hostingBadge: "Fast & Reliable",
    hostingCta: "View Hosting Plans",
    domainFeatures: [
      "Free Domain Privacy Protection",
      "Free DNS Management",
      "24/7 Domain Support",
      "Easy Domain Management",
    ],
    emailFeatures: [
      "Custom Email Address",
      "Spam & Virus Protection",
      "99.99% Uptime Guarantee",
      "Webmail Access",
      "Mobile & Desktop Sync",
    ],
    hostingFeatures: [
      "Ultra-Fast NVMe SSD",
      "99.99% Uptime Guarantee",
      "Free SSL Certificate",
      "Daily Backups",
      "24/7 Expert Support",
    ],
  },
};

const ne: Dictionary = {
  ...en,
  nav: {
    domains: "डोमेन",
    businessEmail: "व्यवसायिक इमेल",
    hosting: "होस्टिङ",
    resources: "स्रोतहरू",
    login: "लगइन",
    getStarted: "सुरु गर्नुहोस्",
  },
  locale: {
    selectLocation: "स्थान र भाषा छान्नुहोस्",
    searchPlaceholder: "देश वा भाषा खोज्नुहोस्",
    country: "देश",
    language: "भाषा",
    apply: "लागु गर्नुहोस्",
    close: "बन्द गर्नुहोस्",
    noResults: "कुनै देश फेला परेन",
  },
  hero: {
    headline: "तपाईंलाई चाहिने सबै।",
    headlineAccent: "अपेक्षाभन्दा पर।",
    description:
      "प्रिमियम डोमेन, छिटो होस्टिङ र सुरक्षित व्यवसायिक इमेल — अनलाइन सफलताका लागि आवश्यक सबै।",
    searchPlaceholder: "आफ्नो उत्तम डोमेन खोज्नुहोस्",
    bulkSearch: "बल्क खोज",
    search: "खोज्नुहोस्",
    trustUptime: "९९.९९% अपटाइम",
    trustUptimeSub: "नेटवर्क ग्यारेन्टी",
    trustSecure: "सुरक्षित र भरपर्दो",
    trustSecureSub: "तपाईंको डाटा सुरक्षित छ",
    trustSupport: "२४/७ विशेषज्ञ सहयोग",
    trustSupportSub: "हामी तपाईंका लागि छौं",
  },
  products: {
    ...en.products,
    eyebrow: "तपाईंलाई चाहिने सबै",
    title: "अनलाइन सफलता सशक्त बनाउनुहोस्",
    titleAccent: "सबै एकै ठाउँमा",
    description:
      "प्रिमियम डोमेन, व्यावसायिक इमेल र छिटो होस्टिङ किफायती मूल्यमा। सरल, सुरक्षित र वृद्धिमुखी।",
    domainTitle: "डोमेन साइट",
    emailTitle: "व्यवसायिक इमेल",
    hostingTitle: "वेब होस्टिङ",
    domainCta: "डोमेन खोज्नुहोस्",
    emailCta: "व्यवसायिक इमेल लिनुहोस्",
    hostingCta: "होस्टिङ योजना हेर्नुहोस्",
  },
};

const hi: Dictionary = {
  ...en,
  nav: {
    domains: "डोमेन",
    businessEmail: "बिज़नेस ईमेल",
    hosting: "होस्टिंग",
    resources: "संसाधन",
    login: "लॉगिन",
    getStarted: "शुरू करें",
  },
  locale: {
    selectLocation: "स्थान और भाषा चुनें",
    searchPlaceholder: "देश या भाषा खोजें",
    country: "देश",
    language: "भाषा",
    apply: "लागू करें",
    close: "बंद करें",
    noResults: "कोई देश नहीं मिला",
  },
  hero: {
    headline: "आपको जो चाहिए।",
    headlineAccent: "उम्मीदों से आगे।",
    description:
      "प्रीमियम डोमेन, तेज़ होस्टिंग और सुरक्षित बिज़नेस ईमेल — ऑनलाइन सफलता के लिए सब कुछ।",
    searchPlaceholder: "अपना परफेक्ट डोमेन खोजें",
    bulkSearch: "बल्क सर्च",
    search: "खोजें",
    trustUptime: "99.99% अपटाइम",
    trustUptimeSub: "नेटवर्क गारंटी",
    trustSecure: "सुरक्षित और विश्वसनीय",
    trustSecureSub: "आपका डेटा सुरक्षित है",
    trustSupport: "24/7 विशेषज्ञ सहायता",
    trustSupportSub: "हम आपके साथ हैं",
  },
  products: {
    ...en.products,
    eyebrow: "आपको जो चाहिए",
    title: "अपनी ऑनलाइन सफलता को शक्ति दें",
    titleAccent: "सब कुछ एक जगह",
    description:
      "प्रीमियम डोमेन, प्रोफेशनल ईमेल और तेज़ होस्टिंग बेहतरीन कीमत पर। सरल, सुरक्षित और विकास के लिए।",
    domainTitle: "डोमेन साइट",
    emailTitle: "बिज़नेस ईमेल",
    hostingTitle: "वेब होस्टिंग",
  },
};

const es: Dictionary = {
  ...en,
  nav: {
    domains: "Dominios",
    businessEmail: "Correo empresarial",
    hosting: "Hosting",
    resources: "Recursos",
    login: "Iniciar sesión",
    getStarted: "Comenzar",
  },
  locale: {
    selectLocation: "Selecciona ubicación e idioma",
    searchPlaceholder: "Buscar país o idioma",
    country: "País",
    language: "Idioma",
    apply: "Aplicar",
    close: "Cerrar",
    noResults: "No se encontraron países",
  },
  hero: {
    headline: "Todo lo que necesitas.",
    headlineAccent: "Más allá de las expectativas.",
    description:
      "Dominios premium, hosting ultrarrápido y correo empresarial seguro: todo para crecer online.",
    searchPlaceholder: "Encuentra tu dominio perfecto",
    bulkSearch: "Búsqueda masiva",
    search: "Buscar",
    trustUptime: "99.99% de disponibilidad",
    trustUptimeSub: "Garantía de red",
    trustSecure: "Seguro y confiable",
    trustSecureSub: "Tus datos están protegidos",
    trustSupport: "Soporte experto 24/7",
    trustSupportSub: "Estamos contigo",
  },
  products: {
    ...en.products,
    eyebrow: "Todo lo que necesitas",
    title: "Impulsa tu éxito online",
    titleAccent: "Todo en un solo lugar",
    domainTitle: "Sitio de dominio",
    emailTitle: "Correo empresarial",
    hostingTitle: "Hosting web",
  },
};

const fr: Dictionary = {
  ...en,
  nav: {
    domains: "Domaines",
    businessEmail: "E-mail pro",
    hosting: "Hébergement",
    resources: "Ressources",
    login: "Connexion",
    getStarted: "Commencer",
  },
  locale: {
    selectLocation: "Choisir le pays et la langue",
    searchPlaceholder: "Rechercher un pays ou une langue",
    country: "Pays",
    language: "Langue",
    apply: "Appliquer",
    close: "Fermer",
    noResults: "Aucun pays trouvé",
  },
  hero: {
    headline: "Tout ce dont vous avez besoin.",
    headlineAccent: "Au-delà des attentes.",
    description:
      "Domaines premium, hébergement ultra-rapide et e-mail professionnel sécurisé — tout pour réussir en ligne.",
    searchPlaceholder: "Trouvez votre domaine idéal",
    bulkSearch: "Recherche groupée",
    search: "Rechercher",
    trustUptime: "99,99 % de disponibilité",
    trustUptimeSub: "Garantie réseau",
    trustSecure: "Sécurisé et fiable",
    trustSecureSub: "Vos données sont protégées",
    trustSupport: "Support expert 24/7",
    trustSupportSub: "Nous sommes là",
  },
  products: {
    ...en.products,
    eyebrow: "Tout ce dont vous avez besoin",
    title: "Boostez votre réussite en ligne",
    titleAccent: "Tout au même endroit",
    domainTitle: "Nom de domaine",
    emailTitle: "E-mail professionnel",
    hostingTitle: "Hébergement web",
  },
};

const de: Dictionary = {
  ...en,
  nav: {
    domains: "Domains",
    businessEmail: "Business-E-Mail",
    hosting: "Hosting",
    resources: "Ressourcen",
    login: "Anmelden",
    getStarted: "Loslegen",
  },
  locale: {
    selectLocation: "Standort & Sprache wählen",
    searchPlaceholder: "Land oder Sprache suchen",
    country: "Land",
    language: "Sprache",
    apply: "Übernehmen",
    close: "Schließen",
    noResults: "Keine Länder gefunden",
  },
  hero: {
    headline: "Alles, was Sie brauchen.",
    headlineAccent: "Über alle Erwartungen hinaus.",
    description:
      "Premium-Domains, blitzschnelles Hosting und sichere Business-E-Mail — alles für Ihren Online-Erfolg.",
    searchPlaceholder: "Finden Sie Ihre perfekte Domain",
    bulkSearch: "Massensuche",
    search: "Suchen",
    trustUptime: "99,99 % Verfügbarkeit",
    trustUptimeSub: "Netzwerkgarantie",
    trustSecure: "Sicher & vertrauenswürdig",
    trustSecureSub: "Ihre Daten sind geschützt",
    trustSupport: "24/7 Experten-Support",
    trustSupportSub: "Wir sind für Sie da",
  },
  products: {
    ...en.products,
    eyebrow: "Alles, was Sie brauchen",
    title: "Stärken Sie Ihren Online-Erfolg",
    titleAccent: "Alles an einem Ort",
  },
};

const dictionaries: Record<LanguageCode, Dictionary> = {
  en,
  ne,
  hi,
  es,
  fr,
  de,
  it: {
    ...en,
    nav: {
      domains: "Domini",
      businessEmail: "Email aziendale",
      hosting: "Hosting",
      resources: "Risorse",
      login: "Accedi",
      getStarted: "Inizia",
    },
    locale: {
      selectLocation: "Seleziona posizione e lingua",
      searchPlaceholder: "Cerca paese o lingua",
      country: "Paese",
      language: "Lingua",
      apply: "Applica",
      close: "Chiudi",
      noResults: "Nessun paese trovato",
    },
    hero: {
      headline: "Tutto ciò di cui hai bisogno.",
      headlineAccent: "Oltre ogni aspettativa.",
      description:
        "Domini premium, hosting rapidissimo e email aziendale sicura — tutto per crescere online.",
      searchPlaceholder: "Trova il dominio perfetto",
      bulkSearch: "Ricerca multipla",
      search: "Cerca",
      trustUptime: "99,99% di uptime",
      trustUptimeSub: "Garanzia di rete",
      trustSecure: "Sicuro e affidabile",
      trustSecureSub: "I tuoi dati sono al sicuro",
      trustSupport: "Supporto esperti 24/7",
      trustSupportSub: "Siamo qui per te",
    },
    products: {
      ...en.products,
      eyebrow: "Tutto ciò di cui hai bisogno",
      title: "Dai potenza al tuo successo online",
      titleAccent: "Tutto in un unico posto",
      domainTitle: "Dominio",
      emailTitle: "Email aziendale",
      hostingTitle: "Hosting web",
    },
  },
  pt: {
    ...en,
    nav: {
      domains: "Domínios",
      businessEmail: "E-mail comercial",
      hosting: "Hospedagem",
      resources: "Recursos",
      login: "Entrar",
      getStarted: "Começar",
    },
    locale: {
      selectLocation: "Selecione localização e idioma",
      searchPlaceholder: "Pesquisar país ou idioma",
      country: "País",
      language: "Idioma",
      apply: "Aplicar",
      close: "Fechar",
      noResults: "Nenhum país encontrado",
    },
    hero: {
      headline: "Tudo o que você precisa.",
      headlineAccent: "Além das expectativas.",
      description:
        "Domínios premium, hospedagem ultrarrápida e e-mail comercial seguro — tudo para crescer online.",
      searchPlaceholder: "Encontre o domínio perfeito",
      bulkSearch: "Busca em massa",
      search: "Pesquisar",
      trustUptime: "99,99% de uptime",
      trustUptimeSub: "Garantia de rede",
      trustSecure: "Seguro e confiável",
      trustSecureSub: "Seus dados estão protegidos",
      trustSupport: "Suporte especialista 24/7",
      trustSupportSub: "Estamos com você",
    },
    products: {
      ...en.products,
      eyebrow: "Tudo o que você precisa",
      title: "Impulsione seu sucesso online",
      titleAccent: "Tudo em um só lugar",
      domainTitle: "Domínio",
      emailTitle: "E-mail comercial",
      hostingTitle: "Hospedagem web",
    },
  },
  ja: {
    ...en,
    nav: {
      domains: "ドメイン",
      businessEmail: "ビジネスメール",
      hosting: "ホスティング",
      resources: "リソース",
      login: "ログイン",
      getStarted: "はじめる",
    },
    locale: {
      selectLocation: "地域と言語を選択",
      searchPlaceholder: "国または言語を検索",
      country: "国",
      language: "言語",
      apply: "適用",
      close: "閉じる",
      noResults: "国が見つかりません",
    },
    hero: {
      headline: "必要なすべてを。",
      headlineAccent: "期待を超えて。",
      description:
        "プレミアムドメイン、超高速ホスティング、安全なビジネスメール — オンライン成功に必要なすべて。",
      searchPlaceholder: "理想のドメインを探す",
      bulkSearch: "一括検索",
      search: "検索",
      trustUptime: "稼働率 99.99%",
      trustUptimeSub: "ネットワーク保証",
      trustSecure: "安全で信頼できる",
      trustSecureSub: "データは保護されています",
      trustSupport: "24時間専門家サポート",
      trustSupportSub: "いつでも対応します",
    },
    products: {
      ...en.products,
      eyebrow: "必要なすべて",
      title: "オンライン成功を加速",
      titleAccent: "すべてを一か所で",
      domainTitle: "ドメイン",
      emailTitle: "ビジネスメール",
      hostingTitle: "ウェブホスティング",
    },
  },
  ko: {
    ...en,
    nav: {
      domains: "도메인",
      businessEmail: "비즈니스 이메일",
      hosting: "호스팅",
      resources: "리소스",
      login: "로그인",
      getStarted: "시작하기",
    },
    locale: {
      selectLocation: "위치 및 언어 선택",
      searchPlaceholder: "국가 또는 언어 검색",
      country: "국가",
      language: "언어",
      apply: "적용",
      close: "닫기",
      noResults: "국가를 찾을 수 없습니다",
    },
    hero: {
      headline: "필요한 모든 것.",
      headlineAccent: "기대 그 이상.",
      description:
        "프리미엄 도메인, 초고속 호스팅, 안전한 비즈니스 이메일 — 온라인 성공에 필요한 모든 것.",
      searchPlaceholder: "완벽한 도메인 찾기",
      bulkSearch: "대량 검색",
      search: "검색",
      trustUptime: "99.99% 가동률",
      trustUptimeSub: "네트워크 보장",
      trustSecure: "안전하고 신뢰할 수 있음",
      trustSecureSub: "데이터가 보호됩니다",
      trustSupport: "24/7 전문가 지원",
      trustSupportSub: "언제나 함께합니다",
    },
    products: {
      ...en.products,
      eyebrow: "필요한 모든 것",
      title: "온라인 성공을 가속화하세요",
      titleAccent: "모든 것을 한곳에서",
      domainTitle: "도메인",
      emailTitle: "비즈니스 이메일",
      hostingTitle: "웹 호스팅",
    },
  },
  zh: {
    ...en,
    nav: {
      domains: "域名",
      businessEmail: "企业邮箱",
      hosting: "主机托管",
      resources: "资源",
      login: "登录",
      getStarted: "立即开始",
    },
    locale: {
      selectLocation: "选择地区和语言",
      searchPlaceholder: "搜索国家或语言",
      country: "国家",
      language: "语言",
      apply: "应用",
      close: "关闭",
      noResults: "未找到国家",
    },
    hero: {
      headline: "您所需的一切。",
      headlineAccent: "超越期待。",
      description: "优质域名、极速主机与安全企业邮箱 — 助力您的在线成功。",
      searchPlaceholder: "寻找理想域名",
      bulkSearch: "批量搜索",
      search: "搜索",
      trustUptime: "99.99% 正常运行时间",
      trustUptimeSub: "网络保障",
      trustSecure: "安全可靠",
      trustSecureSub: "您的数据受到保护",
      trustSupport: "全天候专家支持",
      trustSupportSub: "随时为您服务",
    },
    products: {
      ...en.products,
      eyebrow: "您所需的一切",
      title: "助力在线成功",
      titleAccent: "一站齐全",
      domainTitle: "域名",
      emailTitle: "企业邮箱",
      hostingTitle: "网站托管",
    },
  },
  ar: {
    ...en,
    nav: {
      domains: "النطاقات",
      businessEmail: "البريد التجاري",
      hosting: "الاستضافة",
      resources: "الموارد",
      login: "تسجيل الدخول",
      getStarted: "ابدأ الآن",
    },
    locale: {
      selectLocation: "اختر الموقع واللغة",
      searchPlaceholder: "ابحث عن بلد أو لغة",
      country: "البلد",
      language: "اللغة",
      apply: "تطبيق",
      close: "إغلاق",
      noResults: "لم يتم العثور على بلدان",
    },
    hero: {
      headline: "كل ما تحتاجه.",
      headlineAccent: "أبعد من التوقعات.",
      description:
        "نطاقات مميزة واستضافة سريعة وبريد أعمال آمن — كل ما تحتاجه للنجاح عبر الإنترنت.",
      searchPlaceholder: "اعثر على نطاقك المثالي",
      bulkSearch: "بحث جماعي",
      search: "بحث",
      trustUptime: "توافر 99.99%",
      trustUptimeSub: "ضمان الشبكة",
      trustSecure: "آمن وموثوق",
      trustSecureSub: "بياناتك محمية",
      trustSupport: "دعم خبراء على مدار الساعة",
      trustSupportSub: "نحن معك",
    },
    products: {
      ...en.products,
      eyebrow: "كل ما تحتاجه",
      title: "عزّز نجاحك عبر الإنترنت",
      titleAccent: "كل شيء في مكان واحد",
      domainTitle: "النطاق",
      emailTitle: "البريد التجاري",
      hostingTitle: "استضافة الويب",
    },
  },
};

export function getDictionary(lang: LanguageCode): Dictionary {
  return dictionaries[lang] ?? dictionaries.en;
}

export function t(dict: Dictionary, path: string): string {
  const parts = path.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (!current || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : path;
}
