"use client";
import { GlassContainer } from "@/components/glass-container";
import {useQuery} from "@tanstack/react-query";


type PriceItemProps = {
    title: string;
    icon?: string;
    changeRate: number
    price: number
}
const sampleResponse = {
    "data": {
        "gold": [
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "IR_GOLD_18K",
                "name_en": "18K Gold",
                "name": "طلای 18 عیار",
                "price": 7108800,
                "change_value": -25600,
                "change_percent": -0.36,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "IR_GOLD_24K",
                "name_en": "24K Gold",
                "name": "طلای 24 عیار",
                "price": 9478300,
                "change_value": -34200,
                "change_percent": -0.36,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "IR_GOLD_MELTED",
                "name_en": "Melted Gold",
                "name": "طلای آب‌شده نقدی",
                "price": 30794000,
                "change_value": -102000,
                "change_percent": -0.33,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "XAUUSD",
                "name_en": "Gold Ounce",
                "name": "انس طلا",
                "price": 3362,
                "change_value": -27,
                "change_percent": -0.81,
                "unit": "دلار"
            },
            {
                "date": "1404/05/02",
                "time": "11:33",
                "time_unix": 1753344180,
                "symbol": "IR_COIN_1G",
                "name_en": "1g Coin",
                "name": "سکه یک گرمی",
                "price": 14700000,
                "change_value": -100000,
                "change_percent": -0.68,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "12:19",
                "time_unix": 1753346940,
                "symbol": "IR_COIN_QUARTER",
                "name_en": "Quarter Coin",
                "name": "ربع سکه",
                "price": 24700000,
                "change_value": 0,
                "change_percent": 0,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "13:50",
                "time_unix": 1753352400,
                "symbol": "IR_COIN_HALF",
                "name_en": "Half Coin",
                "name": "نیم سکه",
                "price": 42600000,
                "change_value": 0,
                "change_percent": 0,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "IR_COIN_EMAMI",
                "name_en": "Emami Coin",
                "name": "سکه امامی",
                "price": 79510000,
                "change_value": -175000,
                "change_percent": -0.22,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "IR_COIN_BAHAR",
                "name_en": "Bahar Azadi Coin",
                "name": "سکه بهار آزادی",
                "price": 71790000,
                "change_value": -400000,
                "change_percent": -0.56,
                "unit": "تومان"
            }
        ],
        "currency": [
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "USDT_IRT",
                "name_en": "Tether Dollar",
                "name": "دلار تتر",
                "price": 88155,
                "change_value": 803,
                "change_percent": 0.92,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "USD",
                "name_en": "US Dollar",
                "name": "دلار",
                "price": 88350,
                "change_value": 360,
                "change_percent": 0.41,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "EUR",
                "name_en": "Euro",
                "name": "یورو",
                "price": 103800,
                "change_value": 320,
                "change_percent": 0.31,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "AED",
                "name_en": "UAE Dirham",
                "name": "درهم امارات",
                "price": 24157,
                "change_value": 100,
                "change_percent": 0.42,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "GBP",
                "name_en": "British Pound",
                "name": "پوند",
                "price": 119680,
                "change_value": 270,
                "change_percent": 0.23,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "JPY",
                "name_en": "Japanese Yen",
                "name": "یکصد ین ژاپن",
                "price": 60485,
                "change_value": 249,
                "change_percent": 0.41,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "KWD",
                "name_en": "Kuwaiti Dinar",
                "name": "دینار کویت",
                "price": 290160,
                "change_value": 1290,
                "change_percent": 0.45,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "AUD",
                "name_en": "Australian Dollar",
                "name": "دلار استرالیا",
                "price": 58420,
                "change_value": 410,
                "change_percent": 0.71,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "CAD",
                "name_en": "Canadian Dollar",
                "name": "دلار کانادا",
                "price": 64910,
                "change_value": 240,
                "change_percent": 0.37,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "CNY",
                "name_en": "Chinese Yuan",
                "name": "یوآن چین",
                "price": 12350,
                "change_value": 60,
                "change_percent": 0.49,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "11:12",
                "time_unix": 1753342920,
                "symbol": "TRY",
                "name_en": "Turkish Lira",
                "name": "لیر ترکیه",
                "price": 2180,
                "change_value": 10,
                "change_percent": 0.46,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "SAR",
                "name_en": "Saudi Riyal",
                "name": "ریال عربستان",
                "price": 23578,
                "change_value": 95,
                "change_percent": 0.4,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "CHF",
                "name_en": "Swiss Franc",
                "name": "فرانک سوئیس",
                "price": 111180,
                "change_value": 400,
                "change_percent": 0.36,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "INR",
                "name_en": "Indian Rupee",
                "name": "روپیه هند",
                "price": 1023,
                "change_value": 4,
                "change_percent": 0.39,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "PKR",
                "name_en": "Pakistani Rupee",
                "name": "روپیه پاکستان",
                "price": 312,
                "change_value": 3,
                "change_percent": 1.1,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:05",
                "time_unix": 1753356900,
                "symbol": "IQD",
                "name_en": "Iraqi Dinar",
                "name": "دینار عراق",
                "price": 61,
                "change_value": 1,
                "change_percent": 2.49,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "12:28",
                "time_unix": 1753347480,
                "symbol": "SYP",
                "name_en": "Syrian Lira",
                "name": "لیر سوریه",
                "price": 6,
                "change_value": 0,
                "change_percent": 0,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "SEK",
                "name_en": "Swedish Krona",
                "name": "کرون سوئد",
                "price": 9280,
                "change_value": 20,
                "change_percent": 0.22,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "QAR",
                "name_en": "Qatari Riyal",
                "name": "ریال قطر",
                "price": 25040,
                "change_value": 860,
                "change_percent": 3.56,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "OMR",
                "name_en": "Omani Rial",
                "name": "ریال عمان",
                "price": 229490,
                "change_value": 940,
                "change_percent": 0.41,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "BHD",
                "name_en": "Bahraini Dinar",
                "name": "دینار بحرین",
                "price": 234430,
                "change_value": 970,
                "change_percent": 0.42,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "AFN",
                "name_en": "Afghan Afghani",
                "name": "افغانی",
                "price": 1292,
                "change_value": 4,
                "change_percent": 0.31,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "MYR",
                "name_en": "Malaysian Ringgit",
                "name": "رینگیت مالزی",
                "price": 20970,
                "change_value": 140,
                "change_percent": 0.67,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "THB",
                "name_en": "Thai Baht",
                "name": "بات تایلند",
                "price": 2739,
                "change_value": 11,
                "change_percent": 0.4,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:02",
                "time_unix": 1753356720,
                "symbol": "RUB",
                "name_en": "Russian Ruble",
                "name": "روبل روسیه",
                "price": 1115,
                "change_value": -9,
                "change_percent": -0.81,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "AZN",
                "name_en": "Azerbaijani Manat",
                "name": "منات آذربایجان",
                "price": 52130,
                "change_value": 220,
                "change_percent": 0.42,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "AMD",
                "name_en": "Armenian Dram",
                "name": "درام ارمنستان",
                "price": 246,
                "change_value": 17,
                "change_percent": 7.42,
                "unit": "تومان"
            },
            {
                "date": "1404/05/02",
                "time": "15:25",
                "time_unix": 1753358100,
                "symbol": "GEL",
                "name_en": "Georgian Lari",
                "name": "لاری گرجستان",
                "price": 32790,
                "change_value": 150,
                "change_percent": 0.46,
                "unit": "تومان"
            }
        ],
        "cryptocurrency": [
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "BTC",
                "name_en": "Bitcoin",
                "name": "بیت‌کوین",
                "price": "118590",
                "change_percent": 0.07,
                "market_cap": 2362790283370,
                "unit": "دلار",
                "description": "اولین و معروف‌ترین رمزارز جهان، با ارزش بازار بالا و پذیرش گسترده به عنوان طلای دیجیتال"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "ETH",
                "name_en": "Ethereum",
                "name": "اتریوم",
                "price": "3640.94",
                "change_percent": -0.73,
                "market_cap": 441917378983,
                "unit": "دلار",
                "description": "پلتفرم پیشرو برای قراردادهای هوشمند و برنامه‌های غیرمتمرکز (DApps)، با اکوسیستمی غنی"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "USDT",
                "name_en": "Tether",
                "name": "تتر",
                "price": "1.0005",
                "change_percent": -0.01,
                "market_cap": 162592931959,
                "unit": "دلار",
                "description": "استیبل‌کوین محبوب با ارزش ثابت برابر ۱ دلار آمریکا، مناسب برای حفظ ارزش دارایی‌ها"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "XRP",
                "name_en": "XRP",
                "name": "ایکس‌آر‌پی",
                "price": "3.165",
                "change_percent": -8.23,
                "market_cap": 188039843687,
                "unit": "دلار",
                "description": "رمزارزی برای پرداخت‌های سریع و کم‌هزینه بین‌المللی، با تمرکز بر همکاری با مؤسسات مالی"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "BNB",
                "name_en": "BNB",
                "name": "بی‌ان‌بی",
                "price": "772.4099",
                "change_percent": -4.29,
                "market_cap": 107475202714,
                "unit": "دلار",
                "description": "توکن بومی صرافی بایننس، با کاربرد در پرداخت کارمزدها و مشارکت در اکوسیستم بایننس"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "SOL",
                "name_en": "Solana",
                "name": "سولانا",
                "price": "187.13",
                "change_percent": -5.15,
                "market_cap": 100566712693,
                "unit": "دلار",
                "description": "بلاک‌چینی فوق‌سریع و کم‌هزینه، مناسب برای برنامه‌های غیرمتمرکز و توکن‌های NFT"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "USDC",
                "name_en": "USD Coin",
                "name": "یواس‌دی کوین",
                "price": "0.9944",
                "change_percent": 0.1,
                "market_cap": 64707359122,
                "unit": "دلار",
                "description": "استیبل‌کوینی معتبر با پشتوانه دلار آمریکا، تحت نظارت شرکت‌های مالی معتبر"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "TRX",
                "name_en": "TRON",
                "name": "ترون",
                "price": "0.30882",
                "change_percent": -2.64,
                "market_cap": 29297811272,
                "unit": "دلار",
                "description": "بلاک‌چینی برای محتوا و سرگرمی، با تمرکز بر پرداخت‌های دیجیتال و تولید محتوا"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "DOGE",
                "name_en": "Dogecoin",
                "name": "دوج‌کوین",
                "price": "0.23834",
                "change_percent": -6.92,
                "market_cap": 36003016449,
                "unit": "دلار",
                "description": "میم‌کوینی محبوب با جامعه‌ای فعال، مناسب برای پرداخت‌های خرد و فعالیت‌های اجتماعی"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "ADA",
                "name_en": "Cardano",
                "name": "کاردانو",
                "price": "0.8132",
                "change_percent": -5.34,
                "market_cap": 28831998500,
                "unit": "دلار",
                "description": "پلتفرمی امن و مقیاس‌پذیر برای قراردادهای هوشمند، با رویکردی علمی و تحقیق‌محور"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "LINK",
                "name_en": "Chainlink",
                "name": "چین‌لینک",
                "price": "18.022",
                "change_percent": -4.18,
                "market_cap": 12296423580,
                "unit": "دلار",
                "description": "پروژه‌ای برای اتصال داده‌های دنیای واقعی به بلاک‌چین، ضروری برای قراردادهای هوشمند"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "XLM",
                "name_en": "Stellar",
                "name": "استلار",
                "price": "0.42849",
                "change_percent": -6.4,
                "market_cap": 13363236029,
                "unit": "دلار",
                "description": "شبکه‌ای برای پرداخت‌های بین‌المللی ارزان و سریع، با تمرکز بر بانکداری بدون مرز"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "AVAX",
                "name_en": "Avalanche",
                "name": "آوالانچ",
                "price": "23.88",
                "change_percent": -4.48,
                "market_cap": 10085821454,
                "unit": "دلار",
                "description": "بلاک‌چینی سریع و مقیاس‌پذیر، رقیبی برای اتریوم و سولانا در حوزه قراردادهای هوشمند"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "SHIB",
                "name_en": "Shiba Inu",
                "name": "شیبا اینو",
                "price": "0.00001377",
                "change_percent": -6.77,
                "market_cap": 8104904112,
                "unit": "دلار",
                "description": "توکنی محبوب با الهام از دوج‌کوین، با اکوسیستمی در حال رشد و جذابیت برای سرمایه‌گذاران خرد"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "LTC",
                "name_en": "Litecoin",
                "name": "لایت‌کوین",
                "price": "114.18",
                "change_percent": -2.42,
                "market_cap": 8678839542,
                "unit": "دلار",
                "description": "یکی از قدیمی‌ترین رمزارزها، با تراکنش‌های سریع‌تر و کارمزد کمتر نسبت به بیت‌کوین"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "DOT",
                "name_en": "Polkadot",
                "name": "پولکادات",
                "price": "4.029",
                "change_percent": -7.57,
                "market_cap": 6448855336,
                "unit": "دلار",
                "description": "پروژه‌ای برای اتصال بلاک‌چین‌های مختلف و ایجاد یک شبکه یکپارچه و تعاملی"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "UNI",
                "name_en": "Uniswap",
                "name": "یونی‌سواپ",
                "price": "10.25",
                "change_percent": -0.49,
                "market_cap": 6458522324,
                "unit": "دلار",
                "description": "توکن حاکمیتی بزرگ‌ترین صرافی غیرمتمرکز (DEX)، پیشرو در حوزه دیفای (DeFi)"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "ATOM",
                "name_en": "Cosmos",
                "name": "کازماس",
                "price": "4.65",
                "change_percent": -6.63,
                "market_cap": 1827790775,
                "unit": "دلار",
                "description": "پروژه‌ای برای ایجاد اینترنت بلاک‌چین‌ها، با هدف ارتباط بین زنجیره‌های مختلف"
            },
            {
                "date": "1404/05/02",
                "time": "15:26",
                "time_unix": 1753358160,
                "symbol": "FIL",
                "name_en": "Filecoin",
                "name": "فایل‌کوین",
                "price": "2.58",
                "change_percent": -8.72,
                "market_cap": 1790192951,
                "unit": "دلار",
                "description": "شبکه‌ای غیرمتمرکز برای ذخیره‌سازی داده‌ها، با امکان کسب درآمد از فضای ذخیره‌سازی"
            }
        ]
    }
}

export function PriceTableSection() {

    const {data} = useQuery({
        queryKey: ["prices"],
        queryFn: async () => {
            return sampleResponse
        },
        select: (data) => {
            const gold18k = data.data.gold.find((item) => {return item.symbol === "IR_GOLD_18K"})
            const coin = data.data.gold.find((item) => {return item.symbol === "IR_COIN_EMAMI"});

            const dollar = data.data.currency.find((item) => {return item.symbol === "USD"});
            const euro = data.data.currency.find((item) => {return item.symbol === "EUR"});

            const bitcoin = data.data.cryptocurrency.find((item) => {return item.symbol === "BTC"});
            const etherium = data.data.cryptocurrency.find((item) => {return item.symbol === "ETH"});

            const result: Array<PriceItemProps> = [
                {
                    title: gold18k!.name,
                    price: gold18k!.price,
                    changeRate: gold18k!.change_percent,
                    icon: "",
                },
                {
                    title: coin!.name,
                    price: coin!.price,
                    changeRate: coin!.change_percent,
                    icon: "",
                },

                //
                {
                    title: dollar!.name,
                    price: dollar!.price,
                    changeRate: dollar!.change_percent,
                    icon: "",
                },
                {
                    title: euro!.name,
                    price: euro!.price,
                    changeRate: euro!.change_percent,
                    icon: "",
                },

                //
                {
                    title: bitcoin!.name,
                    price: parseFloat(bitcoin!.price),
                    changeRate: bitcoin!.change_percent,
                    icon: "",
                },
                {
                    title: etherium!.name,
                    price: parseFloat(etherium!.price),
                    changeRate: etherium!.change_percent,
                    icon: "",
                },

            ]

            return result;
        }
    })

  return (
    <GlassContainer className="grow flex flex-col items-stretch gap-4">
      <p className={"text-xl font-bold text-right"}>الان چند؟</p>
        <div className={"flex flex-col flex-1 items-stretch gap-3"}>
            {data && data.map((item) => {
                return (
                 <PriceItem title={item.title} changeRate={item.changeRate} price={item.price} />
                )
            })}
        </div>
    </GlassContainer>
  );
}


function PriceItem(props: PriceItemProps) {
    return (
        <div className={"flex items-center justify-between h-[20px]"}>
            <div className={"flex-1 flex items-center justify-start gap-2"}>
                <img src={"/logo.png"} className={"h-[20px] w-[20px]"}  alt={"logo"} />
                <p className={"text-xs"}>{props.title}</p>
            </div>

            <div className={`w-[45px] h-[20px] flex items-center justify-center rounded-lg bg-green-700 text-xs text-white text-center p-2 ${props.changeRate === 0 ? "bg-gray-500" : props.changeRate > 0 ?"bg-green-700" : "bg-red-700"}  `}>
                <span>{props.changeRate}</span>
                <span>%</span>
            </div>
            <div className={"flex-1 flex items-center justify-end"}>
                <p>
                    <span>{Number(props.price).toLocaleString("fa-IR")}</span>
                    <span className={"font-thin text-xs"}> تومان </span>
                </p>
            </div>
        </div>
    )
}