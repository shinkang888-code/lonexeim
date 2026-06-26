import type { Locale, Messages } from "./types";

const ko: Messages = {
  meta: {
    title: "Lonex Hub",
    description: "Lonex.inc — 모듈형 기업 허브 (Beta)",
  },
  header: {
    menu: "메뉴",
    ai: "AI",
  },
  language: {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt",
  },
  favorites: {
    title: "즐겨찾기",
    edit: "편집하기",
    emptyLine1: "자주 사용하는 앱을 즐겨찾기에 추가해 보세요.",
    emptyLine2: "'편집하기'를 눌러 시작하세요.",
  },
  categories: {
    communication: "커뮤니케이션",
    work: "근무",
    info: "정보",
    support: "고객센터",
  },
  modules: {
    "ai-assistant": {
      name: "AI 비서",
      description: "RAG·워크플로·에이전트 기업 AI",
    },
    chat: {
      name: "웹채팅",
      description: "팀 채팅·라이브챗",
    },
    mail: {
      name: "웹메일",
      description: "IMAP 웹메일",
    },
    calendar: {
      name: "캘린더",
      description: "일정·예약",
    },
    media: {
      name: "콘텐츠 제작",
      description: "워크플로·촬영·컷편집·종합편집",
    },
    borderless: {
      name: "borderless",
      description: "오디오→자막 + 다국어 번역",
    },
    "video-chat": {
      name: "화상채팅",
      description: "WebRTC 화상회의",
    },
    bidding: {
      name: "입찰정보",
      description: "나라장터 입찰·낙찰",
    },
    logshield: {
      name: "LogShield",
      description: "DLP·EDR 원격보안관제 — USB·네트워크·프린트·UEBA",
    },
    "hq-search": {
      name: "본사통합검색",
      description: "직원 이메일·문서·보안로그 일괄 검색 (본사 전용)",
    },
    "web-drive": {
      name: "웹드라이브",
      description: "파일·동기화",
    },
    notes: {
      name: "노트",
      description: "팀 위키·노트",
    },
    support: {
      name: "고객센터",
      description: "라이브챗·티켓",
    },
    billing: {
      name: "요금관리",
      description: "청구·수납",
    },
    workforce: {
      name: "직원설정",
      description: "본사 API Key·동기화·LogShield 연동 상태",
    },
  },
  dock: {
    home: "Lonex(공개)",
    close: "닫기",
  },
  oss: {
    recommended: "추천 OSS:",
    hf: "HF:",
  },
  generic: {
    notFound: "모듈을 찾을 수 없습니다.",
    demoPlaceholder: "데모 플레이스홀더",
    integration: "연동 방식:",
    openRepo: "OSS 리포지토리 열기",
  },
  embed: {
    syncToHq: "본사 동기화",
    backendHint:
      "Docker Compose 프로필로 OSS 백엔드를 기동한 뒤 환경 변수를 설정하세요.",
    demoUpload: "데모 데이터 본사 업로드",
  },
  services: {
    backHub: "← Hub",
    title: "Lonex AI Services",
    subtitle:
      "lonex-ai.vercel.app 큐레이션 OSS — 특허·한국어 LLM·RAG·Workforce Hub",
    openLogshield: "LogShield · 본사통합검색 열기",
  },
};

const en: Messages = {
  meta: {
    title: "Lonex Hub",
    description: "Lonex.inc — Modular enterprise hub (Beta)",
  },
  header: {
    menu: "Menu",
    ai: "AI",
  },
  language: {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt",
  },
  favorites: {
    title: "Favorites",
    edit: "Edit",
    emptyLine1: "Add your most-used apps to favorites.",
    emptyLine2: "Tap Edit to get started.",
  },
  categories: {
    communication: "Communication",
    work: "Work",
    info: "Information",
    support: "Support",
  },
  modules: {
    "ai-assistant": {
      name: "AI Assistant",
      description: "Enterprise AI with RAG, workflows, and agents",
    },
    chat: {
      name: "Web Chat",
      description: "Team chat and live chat",
    },
    mail: {
      name: "Web Mail",
      description: "IMAP webmail",
    },
    calendar: {
      name: "Calendar",
      description: "Scheduling and bookings",
    },
    media: {
      name: "Content Studio",
      description: "Workflow, filming, rough cut, and final edit",
    },
    borderless: {
      name: "borderless",
      description: "Audio-to-subtitles with multilingual translation",
    },
    "video-chat": {
      name: "Video Chat",
      description: "WebRTC video conferencing",
    },
    bidding: {
      name: "Procurement Bids",
      description: "Public procurement tenders and awards",
    },
    logshield: {
      name: "LogShield",
      description: "DLP & EDR remote security — USB, network, print, UEBA",
    },
    "hq-search": {
      name: "HQ Unified Search",
      description: "Search employee email, documents, and security logs (HQ only)",
    },
    "web-drive": {
      name: "Web Drive",
      description: "Files and sync",
    },
    notes: {
      name: "Notes",
      description: "Team wiki and notes",
    },
    support: {
      name: "Help Center",
      description: "Live chat and tickets",
    },
    billing: {
      name: "Billing",
      description: "Invoicing and payments",
    },
    workforce: {
      name: "Workforce Settings",
      description: "HQ API keys, sync, and LogShield connection status",
    },
  },
  dock: {
    home: "Lonex (Public)",
    close: "Close",
  },
  oss: {
    recommended: "Recommended OSS:",
    hf: "HF:",
  },
  generic: {
    notFound: "Module not found.",
    demoPlaceholder: "Demo placeholder",
    integration: "Integration:",
    openRepo: "Open OSS repository",
  },
  embed: {
    syncToHq: "Sync to HQ",
    backendHint:
      "Start the OSS backend with a Docker Compose profile, then set the environment variables.",
    demoUpload: "Upload demo data to HQ",
  },
  services: {
    backHub: "← Hub",
    title: "Lonex AI Services",
    subtitle:
      "Curated OSS on lonex-ai.vercel.app — patents, Korean LLMs, RAG, Workforce Hub",
    openLogshield: "Open LogShield · HQ Unified Search",
  },
};

const ja: Messages = {
  meta: {
    title: "Lonex Hub",
    description: "Lonex.inc — モジュール型エンタープライズハブ（Beta）",
  },
  header: {
    menu: "メニュー",
    ai: "AI",
  },
  language: {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt",
  },
  favorites: {
    title: "お気に入り",
    edit: "編集",
    emptyLine1: "よく使うアプリをお気に入りに追加しましょう。",
    emptyLine2: "「編集」をタップして始めてください。",
  },
  categories: {
    communication: "コミュニケーション",
    work: "業務",
    info: "情報",
    support: "サポート",
  },
  modules: {
    "ai-assistant": {
      name: "AIアシスタント",
      description: "RAG・ワークフロー・エージェント型の企業AI",
    },
    chat: {
      name: "Webチャット",
      description: "チームチャット・ライブチャット",
    },
    mail: {
      name: "Webメール",
      description: "IMAP Webメール",
    },
    calendar: {
      name: "カレンダー",
      description: "予定管理・予約",
    },
    media: {
      name: "コンテンツ制作ツール",
      description: "ワークフロー・撮影・ラフカット・本編集",
    },
    borderless: {
      name: "borderless",
      description: "音声→字幕＋多言語翻訳",
    },
    "video-chat": {
      name: "ビデオチャット",
      description: "WebRTC ビデオ会議",
    },
    bidding: {
      name: "入札情報",
      description: "公共調達の入札・落札情報",
    },
    logshield: {
      name: "LogShield",
      description: "DLP・EDR リモートセキュリティ監視 — USB・ネットワーク・印刷・UEBA",
    },
    "hq-search": {
      name: "本社統合検索",
      description: "社員メール・文書・セキュリティログの一括検索（本社専用）",
    },
    "web-drive": {
      name: "Webドライブ",
      description: "ファイル管理・同期",
    },
    notes: {
      name: "ノート",
      description: "チームWiki・ノート",
    },
    support: {
      name: "カスタマーセンター",
      description: "ライブチャット・チケット",
    },
    billing: {
      name: "料金管理",
      description: "請求・入金管理",
    },
    workforce: {
      name: "従業員設定",
      description: "本社APIキー・同期・LogShield連携ステータス",
    },
  },
  dock: {
    home: "Lonex（公開）",
    close: "閉じる",
  },
  oss: {
    recommended: "推奨OSS:",
    hf: "HF:",
  },
  generic: {
    notFound: "モジュールが見つかりません。",
    demoPlaceholder: "デモプレースホルダー",
    integration: "連携方式:",
    openRepo: "OSSリポジトリを開く",
  },
  embed: {
    syncToHq: "本社へ同期",
    backendHint:
      "Docker ComposeプロファイルでOSSバックエンドを起動し、環境変数を設定してください。",
    demoUpload: "デモデータを本社にアップロード",
  },
  services: {
    backHub: "← Hub",
    title: "Lonex AI Services",
    subtitle:
      "lonex-ai.vercel.app 厳選OSS — 特許・韓国語LLM・RAG・Workforce Hub",
    openLogshield: "LogShield · 本社統合検索を開く",
  },
};

const zh: Messages = {
  meta: {
    title: "Lonex Hub",
    description: "Lonex.inc — 模块化企业工作台（Beta）",
  },
  header: {
    menu: "菜单",
    ai: "AI",
  },
  language: {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt",
  },
  favorites: {
    title: "收藏夹",
    edit: "编辑",
    emptyLine1: "将常用应用添加到收藏夹。",
    emptyLine2: "点击「编辑」开始设置。",
  },
  categories: {
    communication: "沟通协作",
    work: "办公",
    info: "信息",
    support: "服务与支持",
  },
  modules: {
    "ai-assistant": {
      name: "AI 助手",
      description: "RAG、工作流与企业智能体 AI",
    },
    chat: {
      name: "网页聊天",
      description: "团队聊天与在线客服",
    },
    mail: {
      name: "网页邮件",
      description: "IMAP 网页邮箱",
    },
    calendar: {
      name: "日历",
      description: "日程与预约",
    },
    media: {
      name: "内容开发工具",
      description: "工作流、拍摄、粗剪与精剪",
    },
    borderless: {
      name: "borderless",
      description: "音频转字幕与多语言翻译",
    },
    "video-chat": {
      name: "视频会议",
      description: "WebRTC 视频会议",
    },
    bidding: {
      name: "招标信息",
      description: "政府采购投标与中标信息",
    },
    logshield: {
      name: "LogShield",
      description: "DLP 与 EDR 远程安全管控 — USB、网络、打印、UEBA",
    },
    "hq-search": {
      name: "总部统一搜索",
      description: "员工邮件、文档与安全日志统一检索（总部专用）",
    },
    "web-drive": {
      name: "网盘",
      description: "文件存储与同步",
    },
    notes: {
      name: "笔记",
      description: "团队 Wiki 与笔记",
    },
    support: {
      name: "客户中心",
      description: "在线聊天与工单",
    },
    billing: {
      name: "费用管理",
      description: "账单与收款",
    },
    workforce: {
      name: "员工设置",
      description: "总部 API 密钥、同步与 LogShield 连接状态",
    },
  },
  dock: {
    home: "Lonex（公开）",
    close: "关闭",
  },
  oss: {
    recommended: "推荐 OSS:",
    hf: "HF:",
  },
  generic: {
    notFound: "未找到该模块。",
    demoPlaceholder: "演示占位",
    integration: "集成方式:",
    openRepo: "打开 OSS 仓库",
  },
  embed: {
    syncToHq: "同步至总部",
    backendHint: "使用 Docker Compose 配置文件启动 OSS 后端，然后设置环境变量。",
    demoUpload: "上传演示数据至总部",
  },
  services: {
    backHub: "← Hub",
    title: "Lonex AI Services",
    subtitle:
      "lonex-ai.vercel.app 精选 OSS — 专利、韩语 LLM、RAG、Workforce Hub",
    openLogshield: "打开 LogShield · 总部统一搜索",
  },
};

const id: Messages = {
  meta: {
    title: "Lonex Hub",
    description: "Lonex.inc — Hub perusahaan modular (Beta)",
  },
  header: {
    menu: "Menu",
    ai: "AI",
  },
  language: {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt",
  },
  favorites: {
    title: "Favorit",
    edit: "Edit",
    emptyLine1: "Tambahkan aplikasi yang sering Anda gunakan ke favorit.",
    emptyLine2: "Ketuk Edit untuk memulai.",
  },
  categories: {
    communication: "Komunikasi",
    work: "Pekerjaan",
    info: "Informasi",
    support: "Dukungan",
  },
  modules: {
    "ai-assistant": {
      name: "Asisten AI",
      description: "AI perusahaan dengan RAG, alur kerja, dan agen",
    },
    chat: {
      name: "Obrolan Web",
      description: "Obrolan tim dan live chat",
    },
    mail: {
      name: "Email Web",
      description: "Webmail IMAP",
    },
    calendar: {
      name: "Kalender",
      description: "Jadwal dan reservasi",
    },
    media: {
      name: "Studio Konten",
      description: "Alur kerja, syuting, rough cut, dan editing final",
    },
    borderless: {
      name: "borderless",
      description: "Audio ke subtitle dengan terjemahan multibahasa",
    },
    "video-chat": {
      name: "Obrolan Video",
      description: "Konferensi video WebRTC",
    },
    bidding: {
      name: "Info Lelang",
      description: "Tender dan penawaran pengadaan publik",
    },
    logshield: {
      name: "LogShield",
      description: "Keamanan jarak jauh DLP & EDR — USB, jaringan, cetak, UEBA",
    },
    "hq-search": {
      name: "Pencarian Terpadu HQ",
      description: "Cari email, dokumen, dan log keamanan karyawan (khusus HQ)",
    },
    "web-drive": {
      name: "Drive Web",
      description: "File dan sinkronisasi",
    },
    notes: {
      name: "Catatan",
      description: "Wiki tim dan catatan",
    },
    support: {
      name: "Pusat Layanan",
      description: "Live chat dan tiket",
    },
    billing: {
      name: "Manajemen Tagihan",
      description: "Faktur dan pembayaran",
    },
    workforce: {
      name: "Pengaturan Karyawan",
      description: "API Key HQ, sinkronisasi, dan status koneksi LogShield",
    },
  },
  dock: {
    home: "Lonex (Publik)",
    close: "Tutup",
  },
  oss: {
    recommended: "OSS rekomendasi:",
    hf: "HF:",
  },
  generic: {
    notFound: "Modul tidak ditemukan.",
    demoPlaceholder: "Placeholder demo",
    integration: "Integrasi:",
    openRepo: "Buka repositori OSS",
  },
  embed: {
    syncToHq: "Sinkron ke HQ",
    backendHint:
      "Jalankan backend OSS dengan profil Docker Compose, lalu atur variabel lingkungan.",
    demoUpload: "Unggah data demo ke HQ",
  },
  services: {
    backHub: "← Hub",
    title: "Lonex AI Services",
    subtitle:
      "OSS kurasi di lonex-ai.vercel.app — paten, LLM Korea, RAG, Workforce Hub",
    openLogshield: "Buka LogShield · Pencarian Terpadu HQ",
  },
};

const vi: Messages = {
  meta: {
    title: "Lonex Hub",
    description: "Lonex.inc — Trung tâm doanh nghiệp dạng mô-đun (Beta)",
  },
  header: {
    menu: "Menu",
    ai: "AI",
  },
  language: {
    ko: "한국어",
    en: "English",
    ja: "日本語",
    zh: "中文",
    id: "Bahasa Indonesia",
    vi: "Tiếng Việt",
  },
  favorites: {
    title: "Yêu thích",
    edit: "Chỉnh sửa",
    emptyLine1: "Thêm các ứng dụng hay dùng vào mục yêu thích.",
    emptyLine2: "Nhấn Chỉnh sửa để bắt đầu.",
  },
  categories: {
    communication: "Giao tiếp",
    work: "Công việc",
    info: "Thông tin",
    support: "Hỗ trợ",
  },
  modules: {
    "ai-assistant": {
      name: "Trợ lý AI",
      description: "AI doanh nghiệp với RAG, quy trình và tác tử",
    },
    chat: {
      name: "Chat Web",
      description: "Chat nhóm và live chat",
    },
    mail: {
      name: "Email Web",
      description: "Webmail IMAP",
    },
    calendar: {
      name: "Lịch",
      description: "Lịch trình và đặt lịch",
    },
    media: {
      name: "Công cụ phát triển nội dung",
      description: "Quy trình, quay phim, cắt thô và biên tập hoàn chỉnh",
    },
    borderless: {
      name: "borderless",
      description: "Chuyển âm thanh thành phụ đề và dịch đa ngôn ngữ",
    },
    "video-chat": {
      name: "Chat video",
      description: "Hội nghị video WebRTC",
    },
    bidding: {
      name: "Thông tin đấu thầu",
      description: "Đấu thầu và trúng thầu mua sắm công",
    },
    logshield: {
      name: "LogShield",
      description: "Bảo mật từ xa DLP & EDR — USB, mạng, in ấn, UEBA",
    },
    "hq-search": {
      name: "Tìm kiếm tổng hợp trụ sở",
      description: "Tìm email, tài liệu và nhật ký bảo mật nhân viên (chỉ trụ sở)",
    },
    "web-drive": {
      name: "Ổ đĩa Web",
      description: "Tệp và đồng bộ",
    },
    notes: {
      name: "Ghi chú",
      description: "Wiki nhóm và ghi chú",
    },
    support: {
      name: "Trung tâm hỗ trợ",
      description: "Live chat và ticket",
    },
    billing: {
      name: "Quản lý phí",
      description: "Hóa đơn và thu tiền",
    },
    workforce: {
      name: "Cài đặt nhân viên",
      description: "API Key trụ sở, đồng bộ và trạng thái kết nối LogShield",
    },
  },
  dock: {
    home: "Lonex (Công khai)",
    close: "Đóng",
  },
  oss: {
    recommended: "OSS đề xuất:",
    hf: "HF:",
  },
  generic: {
    notFound: "Không tìm thấy mô-đun.",
    demoPlaceholder: "Placeholder demo",
    integration: "Tích hợp:",
    openRepo: "Mở kho OSS",
  },
  embed: {
    syncToHq: "Đồng bộ về trụ sở",
    backendHint:
      "Khởi động backend OSS bằng profile Docker Compose, sau đó cấu hình biến môi trường.",
    demoUpload: "Tải dữ liệu demo lên trụ sở",
  },
  services: {
    backHub: "← Hub",
    title: "Lonex AI Services",
    subtitle:
      "OSS tuyển chọn trên lonex-ai.vercel.app — bằng sáng chế, LLM Hàn Quốc, RAG, Workforce Hub",
    openLogshield: "Mở LogShield · Tìm kiếm tổng hợp trụ sở",
  },
};

export const MESSAGES: Record<Locale, Messages> = {
  ko,
  en,
  ja,
  zh,
  id,
  vi,
};
