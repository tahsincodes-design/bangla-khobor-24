import type { Article, ArticleDetail, BodyBlock, Category, Section } from "@/types/news";

type SeedArticle = {
    id: string;
    title: string;
    description: string;
    category: string;
    categorySlug: string;
    publishedAt: string;
    views: number;
    isLive?: boolean;
    source?: string;
};

function photo(id: string, width = 1200, height = 800): string {
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

/** Curated Unsplash photos, mapped to each fixture story. */
const photoByArticle: Record<string, string> = {
    "bn24-1001": "1449824913935-59a10b8d2000", // city traffic
    "bn24-1002": "1519692933481-e162a57d6721", // rain at night
    "bn24-1003": "1540747913346-19e32dc3e97e", // cricket stadium
    "bn24-1004": "1554224155-6726b3ff858f", // finance paperwork
    "bn24-1005": "1529107386315-e1a2ed48a620", // parliament chamber
    "bn24-1006": "1504608524841-42fe6f032b4b", // storm clouds
    "bn24-1007": "1677442136019-21780ecad995", // artificial intelligence
    "bn24-1008": "1489599849927-2ee91cede3ba", // cinema seats
    "bn24-1009": "1576091160399-112ba8d25d1d", // doctor with phone
    "bn24-1010": "1454165804606-c3d57bc86b40", // business analysis
    "bn24-1011": "1526304640581-d334cdbbf45e", // dollar bills
    "bn24-1012": "1517466787929-bc90951d0974", // football player
    "bn24-1013": "1511707171634-5f897ff02aa9", // smartphone apps
    "bn24-1014": "1541872703-74c5e44368f9", // political leaders
    "bn24-1015": "1493225457124-a3eb161ffa5f", // live concert
    "bn24-1016": "1474487548417-781cb71495f3", // train
    "bn24-1017": "1553877522-43269d4ea984", // small business desk
    "bn24-1018": "1562408590-e32931084e23", // circuit board
    "bn24-1019": "1519501025264-65ba15a82390", // city street
    "bn24-1020": "1461896836934-ffe607ba8211", // running track
    "bn24-1021": "1521737711867-e3b97375f902", // startup team
    "bn24-1022": "1555848962-6e79363ec58f", // assembly hall
    "bn24-1023": "1522869635100-9f4c5e86aa37", // streaming on TV
    "bn24-1024": "1611974789855-9c2a0a7236a3", // stock chart
    "bn24-1025": "1574629810360-7efbbe195018", // football on grass
    "bn24-1026": "1518770660439-4636190af475", // technology circuit
    "bn24-1027": "1521295121783-8a321d551ad2", // world globe
    "bn24-1028": "1519389950473-47ba0277781c", // team at work
};

const sectionBodyPhoto: Record<string, string> = {
    national: "1504711434969-e33886168f5c",
    politics: "1555848962-6e79363ec58f",
    world: "1521295121783-8a321d551ad2",
    economy: "1454165804606-c3d57bc86b40",
    sports: "1461896836934-ffe607ba8211",
    entertainment: "1478720568477-152d9b164e26",
    technology: "1550751827-4bd374c3f58b",
};

const seeds: SeedArticle[] = [
    {
        id: "bn24-1001",
        title: "রাজধানীতে নতুন বাস রুট চালু, যাত্রীদের ভোগান্তি কমার আশা",
        description:
            "রাজধানীর ব্যস্ত সড়কে আজ থেকে চালু হয়েছে তিনটি নতুন বাস রুট। সকাল থেকেই যাত্রীদের উপস্থিতি ছিল চোখে পড়ার মতো।",
        category: "জাতীয়",
        categorySlug: "national",
        publishedAt: "2026-10-22T09:40:00+06:00",
        views: 18420,
        isLive: true,
    },
    {
        id: "bn24-1002",
        title: "দেশের ১২ জেলায় বৃষ্টির পূর্বাভাস, তাপমাত্রা কমতে পারে",
        description:
            "আবহাওয়া অধিদপ্তরের সর্বশেষ বিজ্ঞপ্তি অনুযায়ী আগামী ৪৮ ঘণ্টায় দেশের বিভিন্ন অঞ্চলে হালকা থেকে মাঝারি বৃষ্টি হতে পারে।",
        category: "জাতীয়",
        categorySlug: "national",
        publishedAt: "2026-10-22T08:55:00+06:00",
        views: 12680,
    },
    {
        id: "bn24-1003",
        title: "ঘরের মাঠে জয় পেয়েছে জাতীয় ক্রিকেট দল",
        description:
            "শেষ ওভারের নাটকীয়তায় তিন উইকেটের জয়ে সিরিজে এগিয়ে গেল স্বাগতিক দল। ম্যাচসেরা হয়েছেন তরুণ অলরাউন্ডার।",
        category: "খেলা",
        categorySlug: "sports",
        publishedAt: "2026-10-22T08:20:00+06:00",
        views: 22310,
        isLive: true,
    },
    {
        id: "bn24-1004",
        title: "ব্যাংকঋণের সুদহার স্থিতিশীল রাখার সিদ্ধান্ত",
        description:
            "মুদ্রানীতি কমিটির সভায় চলতি প্রান্তিকে নীতি সুদহার অপরিবর্তিত রাখার ঘোষণা দেওয়া হয়েছে। মূল্যস্ফীতি নিয়ন্ত্রণই প্রধান অগ্রাধিকার।",
        category: "অর্থনীতি",
        categorySlug: "economy",
        publishedAt: "2026-10-22T07:45:00+06:00",
        views: 9840,
    },
    {
        id: "bn24-1005",
        title: "সংসদে গুরুত্বপূর্ণ বিল পাস, নতুন আইন কার্যকর হবে আগামী মাসে",
        description:
            "দীর্ঘ আলোচনার পর বিলটি সংখ্যাগরিষ্ঠ ভোটে পাস হয়েছে। বিরোধী দল কিছু ধারা সংশোধনের প্রস্তাব দিয়েছিল।",
        category: "রাজনীতি",
        categorySlug: "politics",
        publishedAt: "2026-10-22T07:10:00+06:00",
        views: 11220,
    },
    {
        id: "bn24-1006",
        title: "জলবায়ু সম্মেলনে নতুন তহবিল গঠনের ঘোষণা",
        description:
            "উন্নয়নশীল দেশগুলোর অভিযোজন প্রকল্পে সহায়তার জন্য বহুপাক্ষিক তহবিল গঠনের প্রস্তাব অনুমোদিত হয়েছে।",
        category: "আন্তর্জাতিক",
        categorySlug: "world",
        publishedAt: "2026-10-22T06:30:00+06:00",
        views: 7690,
    },
    {
        id: "bn24-1007",
        title: "দেশে কৃত্রিম বুদ্ধিমত্তা গবেষণায় নতুন কেন্দ্র চালু",
        description:
            "বিশ্ববিদ্যালয় ও শিল্প প্রতিষ্ঠানের যৌথ উদ্যোগে চালু হয়েছে নতুন গবেষণা কেন্দ্র। প্রশিক্ষণ ও গবেষণায় বিনিয়োগ বাড়বে।",
        category: "প্রযুক্তি",
        categorySlug: "technology",
        publishedAt: "2026-10-21T22:15:00+06:00",
        views: 6420,
    },
    {
        id: "bn24-1008",
        title: "নতুন বাংলা ছবি মুক্তি পাচ্ছে আগামী সপ্তাহে",
        description:
            "দীর্ঘদিনের অপেক্ষার পর মুক্তি পাচ্ছে বহুল আলোচিত ছবিটি। নির্মাতারা বলছেন, গল্পেই এর মূল আকর্ষণ।",
        category: "বিনোদন",
        categorySlug: "entertainment",
        publishedAt: "2026-10-21T21:05:00+06:00",
        views: 15870,
    },
    {
        id: "bn24-1009",
        title: "স্বাস্থ্যসেবায় নতুন ডিজিটাল কার্ড চালুর উদ্যোগ",
        description:
            "রোগীর পূর্ববর্তী চিকিৎসার তথ্য এক কার্ডেই পাওয়া যাবে। প্রাথমিকভাবে পাঁচটি জেলায় পাইলট প্রকল্প শুরু হচ্ছে।",
        category: "জাতীয়",
        categorySlug: "national",
        publishedAt: "2026-10-21T19:40:00+06:00",
        views: 5310,
    },
    {
        id: "bn24-1010",
        title: "বিশ্ববাজারে জ্বালানি তেলের দাম কমেছে",
        description:
            "সরবরাহ বাড়ার আশায় আন্তর্জাতিক বাজারে অপরিশোধিত তেলের দাম ব্যারেলপ্রতি দুই ডলারের বেশি কমেছে।",
        category: "আন্তর্জাতিক",
        categorySlug: "world",
        publishedAt: "2026-10-21T18:25:00+06:00",
        views: 8240,
    },
    {
        id: "bn24-1011",
        title: "রেমিট্যান্স প্রবাহ বাড়ছে, রিজার্ভে ইতিবাচক প্রভাব",
        description:
            "চলতি মাসের প্রথম তিন সপ্তাহে প্রবাসী আয় আগের বছরের একই সময়ের তুলনায় বেড়েছে। ব্যাংকিং চ্যানেলে লেনদেন স্বাভাবিক হয়েছে।",
        category: "অর্থনীতি",
        categorySlug: "economy",
        publishedAt: "2026-10-21T17:10:00+06:00",
        views: 6910,
    },
    {
        id: "bn24-1012",
        title: "ফুটবল লিগে শীর্ষে উঠে এলো ঢাকা ক্লাব",
        description:
            "প্রতিপক্ষের মাঠে ২-১ গোলের জয়ে পয়েন্ট টেবিলের শীর্ষে পৌঁছে গেছে দলটি। পরের ম্যাচ ঘরের মাঠে।",
        category: "খেলা",
        categorySlug: "sports",
        publishedAt: "2026-10-21T16:00:00+06:00",
        views: 10430,
    },
    {
        id: "bn24-1013",
        title: "স্মার্টফোন ব্যবহারে নিরাপত্তা সচেতনতা বাড়ছে",
        description:
            "দুই-ধাপ যাচাই ও নিয়মিত পাসওয়ার্ড পরিবর্তনের মতো অভ্যাস ব্যবহারকারীদের মধ্যে জনপ্রিয় হচ্ছে বলে জরিপে উঠে এসেছে।",
        category: "প্রযুক্তি",
        categorySlug: "technology",
        publishedAt: "2026-10-21T14:35:00+06:00",
        views: 4580,
    },
    {
        id: "bn24-1014",
        title: "রাজনৈতিক দলগুলোকে সংলাপে বসার আহ্বান",
        description:
            "আসন্ন নির্বাচনকে সামনে রেখে সব দলকে শান্তিপূর্ণ আলোচনার টেবিলে বসার আহ্বান জানিয়েছেন নাগরিক সমাজের প্রতিনিধিরা।",
        category: "রাজনীতি",
        categorySlug: "politics",
        publishedAt: "2026-10-21T13:20:00+06:00",
        views: 7320,
    },
    {
        id: "bn24-1015",
        title: "সঙ্গীত উৎসবে ভক্তদের ভিড়, নিরাপত্তা জোরদার",
        description:
            "দুই দিনের উৎসবে দেশের বাইরের শিল্পীরাও অংশ নিচ্ছেন। প্রবেশপথে অতিরিক্ত নিরাপত্তাকর্মী মোতায়েন করা হয়েছে।",
        category: "বিনোদন",
        categorySlug: "entertainment",
        publishedAt: "2026-10-21T11:55:00+06:00",
        views: 8890,
    },
    {
        id: "bn24-1016",
        title: "পদ্মা সেতু হয়ে ট্রেন চলাচল বাড়ছে, নতুন সময়সূচি প্রকাশ",
        description:
            "যাত্রীচাপ বিবেচনায় সপ্তাহে অতিরিক্ত তিনটি ট্রেন চলাচলের সিদ্ধান্ত নেওয়া হয়েছে। নতুন সময়সূচি ওয়েবসাইটে পাওয়া যাচ্ছে।",
        category: "জাতীয়",
        categorySlug: "national",
        publishedAt: "2026-10-21T10:30:00+06:00",
        views: 9120,
    },
    {
        id: "bn24-1017",
        title: "ক্ষুদ্র উদ্যোক্তাদের জন্য নতুন ঋণ কর্মসূচি",
        description:
            "স্বল্প সুদে ঋণ পাওয়ার আবেদন শুরু হয়েছে। নারী উদ্যোক্তাদের জন্য আলাদা কোটা রাখা হয়েছে।",
        category: "অর্থনীতি",
        categorySlug: "economy",
        publishedAt: "2026-10-21T09:05:00+06:00",
        views: 3870,
    },
    {
        id: "bn24-1018",
        title: "প্রযুক্তি খাতে বিনিয়োগ নিয়ে দুই দেশের চুক্তি",
        description:
            "সেমিকন্ডাক্টর ও ডেটা সেন্টার খাতে যৌথ বিনিয়োগের লক্ষ্যে সমঝোতা স্মারক সই হয়েছে।",
        category: "আন্তর্জাতিক",
        categorySlug: "world",
        publishedAt: "2026-10-20T22:40:00+06:00",
        views: 5220,
    },
    {
        id: "bn24-1019",
        title: "নগরীর খাল পুনরুদ্ধারে তিন মাসের পরিকল্পনা",
        description:
            "অবৈধ দখল উচ্ছেদ ও পানি প্রবাহ স্বাভাবিক করতে ধাপে ধাপে কাজ হবে। স্থানীয় বাসিন্দাদের সঙ্গে আলোচনা চলছে।",
        category: "জাতীয়",
        categorySlug: "national",
        publishedAt: "2026-10-20T20:15:00+06:00",
        views: 4460,
    },
    {
        id: "bn24-1020",
        title: "এশিয়ান গেমসের প্রস্তুতি নিয়ে অ্যাথলেটদের ক্যাম্প",
        description:
            "বাছাইপর্বের আগে দুই সপ্তাহের বিশেষ প্রশিক্ষণ ক্যাম্প শুরু হয়েছে। কোচরা ফিটনেস ও কৌশলে জোর দিচ্ছেন।",
        category: "খেলা",
        categorySlug: "sports",
        publishedAt: "2026-10-20T18:50:00+06:00",
        views: 3980,
    },
    {
        id: "bn24-1021",
        title: "স্টার্টআপদের জন্য নতুন ইনকিউবেশন প্রোগ্রাম",
        description:
            "প্রাথমিক ধাপের ২০টি দলকে কারিগরি সহায়তা ও বিনিয়োগ সংযোগ দেওয়া হবে। আবেদনের শেষ সময় মাস শেষে।",
        category: "প্রযুক্তি",
        categorySlug: "technology",
        publishedAt: "2026-10-20T16:25:00+06:00",
        views: 3210,
    },
    {
        id: "bn24-1022",
        title: "স্থানীয় নির্বাচনের প্রস্তুতি শুরু, তফসিল শিগগিরই",
        description:
            "প্রার্থী তালিকা যাচাই ও কেন্দ্র নির্ধারণের কাজ চলছে। নির্বাচন কমিশন প্রস্তুতি শেষে তফসিল ঘোষণা করবে।",
        category: "রাজনীতি",
        categorySlug: "politics",
        publishedAt: "2026-10-20T14:10:00+06:00",
        views: 5640,
    },
    {
        id: "bn24-1023",
        title: "ওটিটি প্ল্যাটফর্মে নতুন ধারাবাহিকের টিজার প্রকাশ",
        description:
            "অপরাধ ও রহস্য ঘরানার ধারাবাহিকটির প্রথম সিজন আগামী মাসে শুরু হবে। টিজার প্রকাশের পরই আলোচনা শুরু হয়েছে।",
        category: "বিনোদন",
        categorySlug: "entertainment",
        publishedAt: "2026-10-20T12:00:00+06:00",
        views: 6720,
    },
    {
        id: "bn24-1024",
        title: "পুঁজিবাজারে সূচকের উত্থান, লেনদেন বেড়েছে",
        description:
            "ব্যাংক ও টেলিযোগাযোগ খাতের শেয়ারের দাম বাড়ায় প্রধান সূচক বেড়েছে। বিনিয়োগকারীদের অংশগ্রহণও বেড়েছে।",
        category: "অর্থনীতি",
        categorySlug: "economy",
        publishedAt: "2026-10-20T10:45:00+06:00",
        views: 4120,
    },
    {
        id: "bn24-1025",
        title: "মেয়েদের ফুটবলে নতুন প্রতিভা খুঁজতে ট্রায়াল",
        description:
            "অনূর্ধ্ব-১৭ দল গঠনের লক্ষ্যে দেশের পাঁচটি অঞ্চলে ট্রায়াল অনুষ্ঠিত হবে। নির্বাচিতদের বিশেষ ক্যাম্পে ডাকা হবে।",
        category: "খেলা",
        categorySlug: "sports",
        publishedAt: "2026-10-19T18:30:00+06:00",
        views: 2870,
    },
    {
        id: "bn24-1026",
        title: "ফাইভজি সেবা সম্প্রসারণে নতুন পরিকল্পনা",
        description:
            "আগামী ছয় মাসে আরও কয়েকটি শহরে সেবা চালু হবে। গ্রাহক সংখ্যা বাড়ার সঙ্গে নেটওয়ার্ক সক্ষমতাও বাড়ানো হচ্ছে।",
        category: "প্রযুক্তি",
        categorySlug: "technology",
        publishedAt: "2026-10-19T15:20:00+06:00",
        views: 3590,
    },
    {
        id: "bn24-1027",
        title: "আন্তর্জাতিক সংস্থার প্রতিবেদনে দক্ষিণ এশিয়ার প্রবৃদ্ধি প্রসঙ্গে",
        description:
            "প্রতিবেদনে বলা হয়েছে, অভ্যন্তরীণ চাহিদা ও রপ্তানি পুনরুদ্ধার হলে অঞ্চলের প্রবৃদ্ধি কিছুটা বাড়তে পারে।",
        category: "আন্তর্জাতিক",
        categorySlug: "world",
        publishedAt: "2026-10-19T11:15:00+06:00",
        views: 3040,
    },
    {
        id: "bn24-1028",
        title: "তরুণ নেতৃত্ব গড়ে তুলতে নতুন কর্মসূচি",
        description:
            "স্থানীয় পর্যায়ে স্বেচ্ছাসেবক ও সংগঠকদের প্রশিক্ষণ দেওয়া হবে। আবেদন শুরু হয়েছে অনলাইনে।",
        category: "রাজনীতি",
        categorySlug: "politics",
        publishedAt: "2026-10-18T16:40:00+06:00",
        views: 2410,
    },
];

const categoryDescriptions: Record<string, string> = {
    national: "দেশজুড়ে গুরুত্বপূর্ণ ঘটনা, প্রশাসন ও জনজীবনের সর্বশেষ খবর।",
    politics: "রাজনৈতিক সিদ্ধান্ত, সংসদ, নির্বাচন ও নীতিনির্ধারণের খবর।",
    world: "আন্তর্জাতিক ঘটনা, কূটনীতি ও বৈশ্বিক অর্থনীতির হালচাল।",
    economy: "বাজার, ব্যাংক, বিনিয়োগ ও অর্থনীতির বিশ্লেষণ।",
    sports: "মাঠের খেলা থেকে তারকাদের খবর — সবকিছু এক জায়গায়।",
    entertainment: "সিনেমা, সংগীত, ধারাবাহিক ও সাংস্কৃতিক জগতের আপডেট।",
    technology: "প্রযুক্তি, স্টার্টআপ, ডিজিটাল নিরাপত্তা ও উদ্ভাবনের খবর।",
};

const categoryTitles: Record<string, string> = {
    national: "জাতীয়",
    politics: "রাজনীতি",
    world: "আন্তর্জাতিক",
    economy: "অর্থনীতি",
    sports: "খেলা",
    entertainment: "বিনোদন",
    technology: "প্রযুক্তি",
};

function makeBody(seed: SeedArticle): BodyBlock[] {
    return [
        {
            type: "text",
            text: `${seed.description} ঘটনার সঙ্গে সংশ্লিষ্টরা বলছেন, পরিস্থিতি স্বাভাবিক রাখতে সব পক্ষকে দায়িত্বশীল ভূমিকা রাখতে হবে।`,
        },
        {
            type: "subheading",
            text: "ঘটনার বিবরণ",
        },
        {
            type: "text",
            text: `সূত্রের খবর অনুযায়ী, গত কয়েক সপ্তাহ ধরে চলা পর্যালোচনা শেষে এই সিদ্ধান্ত নেওয়া হয়েছে। সংশ্লিষ্ট দপ্তর ইতোমধ্যে বাস্তবায়নের জন্য প্রয়োজনীয় প্রস্তুতি নিতে শুরু করেছে।`,
        },
        {
            type: "image",
            url: photo(
                sectionBodyPhoto[seed.categorySlug] ?? "1504711434969-e33886168f5c",
                1200,
                750,
            ),
            altText: seed.title,
            caption: `${seed.title} — প্রতীকী ছবি`,
            copyrightHolder: "বাংলা নিউজ ২৪",
        },
        {
            type: "text",
            text: `বিশ্লেষকদের মতে, এই উদ্যোগের প্রভাব আগামী কয়েক মাসের মধ্যে দৃশ্যমান হতে পারে। তবে বাস্তবায়নের গতি ও স্বচ্ছতা নিশ্চিত করা হলে সাধারণ মানুষের প্রত্যাশা পূরণ হবে।`,
        },
        {
            type: "subheading",
            text: "কেন এই খবর গুরুত্বপূর্ণ",
        },
        {
            type: "text",
            text: `এই ঘটনা শুধু তাৎক্ষণিক পরিস্থিতি নয়, বরং দীর্ঘমেয়াদি নীতিগত আলোচনারও অংশ। নাগরিক সমাজের একাংশ মনে করছে, সিদ্ধান্ত গ্রহণের প্রক্রিয়ায় আরও বেশি অংশগ্রহণ ও জবাবদিহি প্রয়োজন।`,
        },
        {
            type: "text",
            text: `বাংলা নিউজ ২৪ এই ঘটনার অগ্রগতি নিয়মিত ফলো করবে। নতুন তথ্য পাওয়া গেলে প্রতিবেদন হালনাগাদ করা হবে।`,
        },
    ];
}

function buildArticle(seed: SeedArticle): Article {
    return {
        id: seed.id,
        title: seed.title,
        description: seed.description,
        category: seed.category,
        categorySlug: seed.categorySlug,
        imageUrl: photo(photoByArticle[seed.id] ?? "1504711434969-e33886168f5c"),
        imageAlt: seed.title,
        publishedAt: seed.publishedAt,
        isLive: seed.isLive,
        views: seed.views,
        source: "বাংলা নিউজ ২৪",
    };
}

export const fixtureArticles: Article[] = seeds.map(buildArticle);

export const fixtureCategories: Category[] = Object.entries(categoryTitles).map(([slug, title]) => ({
    slug,
    title,
    description: categoryDescriptions[slug],
}));

const sectionOrder: Array<{ slug: string; title: string; description?: string }> = [
    { slug: "national", title: "জাতীয়" },
    { slug: "world", title: "আন্তর্জাতিক" },
    { slug: "sports", title: "খেলা" },
    { slug: "economy", title: "অর্থনীতি" },
    { slug: "entertainment", title: "বিনোদন" },
    { slug: "technology", title: "প্রযুক্তি" },
    { slug: "politics", title: "রাজনীতি" },
];

export const fixtureSections: Section[] = [
    {
        id: "lead",
        slug: "top-stories",
        title: "প্রধান খবর",
        description: "দিনের সবচেয়ে গুরুত্বপূর্ণ ঘটনাগুলো এক নজরে।",
        articles: fixtureArticles.slice(0, 6),
    },
    ...sectionOrder.map((section) => ({
        id: section.slug,
        slug: section.slug,
        title: section.title,
        description: categoryDescriptions[section.slug],
        articles: fixtureArticles.filter((article) => article.categorySlug === section.slug),
    })),
];

export function fixtureArticleById(id: string): ArticleDetail | null {
    const seed = seeds.find((item) => item.id === id);
    if (!seed) return null;

    const article = buildArticle(seed);
    const category = fixtureCategories.find((item) => item.slug === seed.categorySlug);
    const words = makeBody(seed).reduce((count, block) => {
        if (block.type === "text" || block.type === "subheading") {
            return count + (block.text?.split(/\s+/).length ?? 0);
        }
        return count;
    }, 0);

    return {
        ...article,
        body: makeBody(seed),
        byline: [{ name: "নিজস্ব প্রতিবেদক", role: seed.category }],
        topics: category ? [{ id: category.slug, name: category.title, slug: category.slug }] : [],
        tags: [seed.category, "সর্বশেষ", "বাংলাদেশ"],
        wordCount: words,
    };
}

export function fixtureCategory(slug: string): { category: Category; articles: Article[] } | null {
    const category = fixtureCategories.find((item) => item.slug === slug);
    if (!category) return null;
    return {
        category,
        articles: fixtureArticles.filter((article) => article.categorySlug === slug),
    };
}
