// Arabic (Saudi) copy for the generated site.
// The English pages are rendered first; translateHtml() swaps every visible
// string (text nodes + alt/aria-label/title/placeholder/meta copy) for its Arabic
// version. Any string it cannot translate is reported, and check-site fails on it.
import { projects } from "./data/projects.mjs";
import { services, pillars } from "./data/services.mjs";
import { partners } from "./data/partners.mjs";

const PLACES = {
  "Makkah": "مكة المكرمة", "Taif": "الطائف", "Taibah": "طيبة", "Madinah": "المدينة المنورة", "Riyadh": "الرياض",
  "Najd": "نجد", "Jazan": "جازان", "Qassim": "القصيم", "Al Jouf": "الجوف", "Dammam": "الدمام",
  "Jeddah & Khulais": "جدة وخليص", "Central Region": "المنطقة الوسطى", "Western Region": "المنطقة الغربية",
  "Eastern Province": "المنطقة الشرقية", "Saudi Arabia": "المملكة العربية السعودية", "Al Hada": "الهدا"
};
export const place = (loc) => PLACES[loc] ?? loc;

const MONTHS = { Jan: "يناير", Feb: "فبراير", Mar: "مارس", Apr: "أبريل", May: "مايو", Jun: "يونيو", Jul: "يوليو", Aug: "أغسطس", Sep: "سبتمبر", Oct: "أكتوبر", Nov: "نوفمبر", Dec: "ديسمبر" };

const D = {
  // Chrome
  "Grenada Studio": "جرينادا ستوديو",
  "Grenada Studio — Real Estate Marketing & Creative Agency": "جرينادا ستوديو — وكالة تسويق عقاري وإبداع",
  "Skip to content": "انتقل إلى المحتوى",
  "Grenada": "جرينادا", "Studio": "ستوديو",
  "About": "من نحن", "Services": "الخدمات", "Work": "أعمالنا", "Approach": "منهجنا", "Contact": "تواصل معنا", "Home": "الرئيسية",
  "Brand & Story": "الهوية والمحتوى", "Design & Motion": "التصميم والموشن", "Digital & Growth": "الرقمي والنمو", "Production & Field": "الإنتاج والميدان",
  "All 10 services": "جميع الخدمات العشر", "All services ↗": "جميع الخدمات ↗", "All services": "جميع الخدمات", "All projects": "جميع المشاريع",
  "Start a project": "ابدأ مشروعك", "Start a project ↗": "ابدأ مشروعك ↗",
  "Real estate marketing · KSA & Egypt": "تسويق عقاري · السعودية ومصر",
  "Integrated marketing for real estate, auctions and launches, across Saudi Arabia and Egypt for more than ten years.": "تسويق متكامل للمشاريع العقارية والمزادات وإطلاق المشاريع في السعودية ومصر منذ أكثر من عشر سنوات.",
  "Second District, First Area, Fifth Settlement — Egypt": "الحي الثاني، المنطقة الأولى، التجمع الخامس — مصر",
  "© 2026 Grenada Studio. All rights reserved.": "© 2026 جرينادا ستوديو. جميع الحقوق محفوظة.",
  "Back to top ↑": "إلى الأعلى ↑", "Back to top": "إلى الأعلى",
  "Grenada Studio is an integrated digital and creative marketing agency specializing in real estate, auctions, branding, content, performance marketing and media production.": "جرينادا ستوديو وكالة تسويق رقمي وإبداعي متكاملة، متخصصة في التسويق العقاري والمزادات والهويات البصرية والمحتوى وتسويق الأداء والإنتاج الإعلامي.",
  "Grenada Studio home": "الصفحة الرئيسية لجرينادا ستوديو", "Primary navigation": "القائمة الرئيسية",
  "Toggle interface sounds": "تشغيل أو إيقاف أصوات الواجهة", "Sound off": "الصوت مغلق", "Open navigation": "فتح القائمة",
  "Mobile navigation": "قائمة الجوال", "Show services": "عرض الخدمات", "Breadcrumb": "مسار الصفحة",
  "Grenada in numbers": "جرينادا بالأرقام", "Service groups": "مجموعات الخدمات",

  // Home
  "Grenada Studio / 2026": "جرينادا ستوديو / 2026",
  "Strategy, creative, performance and field execution — arranged as one system that moves projects, auctions and launches.": "استراتيجية وإبداع وأداء وتنفيذ ميداني — في منظومة واحدة تحرّك المشاريع والمزادات وحملات الإطلاق.",
  "See the work": "شاهد أعمالنا", "Scroll": "مرّر",
  "+ years ·": "+ سنوات ·", "capabilities ·": "خدمات ·",
  "The difference": "ما يميزنا", "Digital thinking.": "تفكير رقمي.", "Field execution.": "تنفيذ ميداني.", "One campaign system.": "منظومة حملة واحدة.",
  "Real estate does not move through one channel. Grenada connects the story, the media, the experience and the field execution around the same commercial objective.": "العقار لا يُسوَّق عبر قناة واحدة. تربط جرينادا القصة والإعلام والتجربة والتنفيذ الميداني حول هدف تجاري واحد.",
  "How demand is built": "كيف نصنع الطلب", "Four stages.": "أربع مراحل.", "One continuous system.": "منظومة واحدة متصلة.",
  "Each stage changes the same campaign, rather than handing the project to a new supplier.": "كل مرحلة تطوّر الحملة نفسها، بدل تسليم المشروع إلى مورّد جديد.",
  "01 / Position": "01 / التموضع", "02 / Build": "02 / البناء", "03 / Launch": "03 / الإطلاق", "04 / Optimize": "04 / التحسين",
  "Position": "التموضع", "Build": "البناء", "Launch": "الإطلاق", "Optimize": "التحسين",
  "Define the market story.": "نحدد قصة المشروع في السوق.",
  "Audience, offer, competitive context and message hierarchy become one position the project can own.": "الجمهور والعرض والمنافسة وترتيب الرسائل تتحول إلى تموضع واحد يملكه المشروع.",
  "Create the campaign system.": "نبني منظومة الحملة.",
  "Identity, content, landing experiences, outdoor and sales material are developed as one visual and verbal language.": "الهوية والمحتوى وصفحات الهبوط واللوحات الخارجية ومواد البيع تُطوَّر بلغة بصرية ولفظية واحدة.",
  "Activate every channel.": "نفعّل كل القنوات.",
  "Paid media, social, creators, outdoor and event coverage move together instead of as separate handoffs.": "الإعلانات الممولة والسوشيال والمؤثرون واللوحات الخارجية وتغطية الفعاليات تتحرك معاً لا كمهام منفصلة.",
  "Measure what moves.": "نقيس ما يُحدث الفرق.",
  "CRO, KPIs, ROI and reporting feed the next creative and media decision while the campaign is still live.": "تحسين التحويل ومؤشرات الأداء والعائد والتقارير تغذي القرار الإبداعي والإعلاني التالي والحملة ما زالت قائمة.",
  "Selected work": "أعمال مختارة", "Proof lives in the": "الدليل يظهر في", "launch.": "الإطلاق.",
  "Real campaigns for plots, auctions and destination projects across Makkah, Taif and Madinah — shot, designed and launched by Grenada.": "حملات حقيقية لمخططات ومزادات ومشاريع وجهات في مكة المكرمة والطائف والمدينة المنورة — صوّرتها وصمّمتها وأطلقتها جرينادا.",
  "View case study ↗": "عرض دراسة الحالة ↗",
  "Field × digital": "الميدان × الرقمي", "Different surfaces.": "مساحات مختلفة.", "One campaign.": "حملة واحدة.",
  "FIELD / Physical attention": "الميدان / انتباه مباشر", "ONE": "حملة", "campaign": "واحدة", "DIGITAL / Distributed attention": "الرقمي / انتباه موزّع",
  "The brand should feel like the same project whether someone meets it on a phone, a roadside billboard, a sales deck or the auction floor.": "يجب أن يبدو المشروع هو نفسه سواء رآه العميل على جواله أو على لوحة طريق أو في عرض مبيعات أو في قاعة المزاد.",
  "10 connected capabilities": "10 خدمات مترابطة", "A service list should feel like a": "قائمة الخدمات يجب أن تعمل كـ", "system.": "منظومة.",
  "Integrated execution": "تنفيذ متكامل", "Digital, creative, production and field touchpoints connected around one launch.": "نقاط التواصل الرقمية والإبداعية والإنتاجية والميدانية مترابطة حول إطلاق واحد.",
  "Plots & properties marketed in featured work": "قطعة وعقار سوّقناها في الأعمال المختارة",
  "From 7-lot hybrid auctions to 914-plot residential launches.": "من مزادات هجينة بسبعة عقارات إلى إطلاق مخطط سكني من 914 قطعة.",
  "Digital": "رقمي", "Field": "ميداني", "One operating model": "نموذج عمل واحد",
  "What happens online and what happens on the ground are treated as one customer journey.": "ما يحدث على الإنترنت وما يحدث على أرض الواقع نتعامل معه كرحلة عميل واحدة.",
  "Trusted partnerships": "شراكات موثوقة", "Chosen by teams with": "اختارتنا فرق لديها", "serious assets at stake.": "أصول كبيرة على المحك.",
  "Banks, developers, auction operators and institutions have trusted Grenada with launches where the asset — and the reputation — is on the line.": "بنوك ومطوّرون وشركات مزادات ومؤسسات وثقت بجرينادا في إطلاقات يكون فيها الأصل — والسمعة — على المحك.",
  "+ partner": "+ جهة", "organizations": "شريكة",
  "Ready when the asset is": "جاهزون متى جهز الأصل", "Move the market.": "حرّك السوق.", "Not just the feed.": "لا مجرد المنشورات.",
  "Bring Grenada in early enough to shape the position, creative system and launch mechanics together.": "أشرك جرينادا مبكراً لنبني التموضع والمنظومة الإبداعية وآلية الإطلاق معاً.",
  "Strategy session mapping a campaign on a whiteboard": "جلسة استراتيجية لرسم خطة حملة على السبورة",
  "Studio set lit for a campaign content shoot": "استوديو مجهّز لتصوير محتوى حملة",
  "Illuminated billboards above night traffic": "لوحات إعلانية مضيئة فوق حركة السير ليلاً",
  "Aerial view of a residential villa community": "لقطة جوية لمجمع فلل سكني",
  "Camera operator filming a launch on location": "مصوّر يصوّر إطلاق مشروع في الموقع",
  "Digital billboards above a city highway at night": "لوحات رقمية فوق طريق سريع ليلاً",

  // About
  "About Grenada": "عن جرينادا", "Built around how": "مبنية على فهم", "real estate moves.": "حركة سوق العقار.",
  "Grenada Studio combines digital expertise, field execution and modern production capabilities for real estate projects and major auctions across Egypt and Saudi Arabia.": "تجمع جرينادا ستوديو بين الخبرة الرقمية والتنفيذ الميداني وقدرات الإنتاج الحديثة لخدمة المشاريع العقارية والمزادات الكبرى في السعودية ومصر.",
  "Inside Grenada / 2026": "داخل جرينادا / 2026", "More than a decade": "أكثر من عقد",
  "One team between the market story and the market response.": "فريق واحد بين قصة المشروع واستجابة السوق.",
  "Grenada follows market shifts closely, then translates them into sharper positioning, stronger creative and measurable execution. The studio’s work spans digital campaigns, physical touchpoints, production and live auction environments — disciplines that are usually split between different suppliers.": "تتابع جرينادا تحولات السوق عن قرب، ثم تترجمها إلى تموضع أوضح وإبداع أقوى وتنفيذ قابل للقياس. يمتد عملنا من الحملات الرقمية إلى نقاط التواصل الميدانية والإنتاج وأجواء المزادات الحية — وهي تخصصات تتوزع عادة بين أكثر من مورّد.",
  "The model is intentionally integrated: strategy can shape creative, creative can shape media, and on-ground execution can feed back into the campaign without a handoff gap.": "النموذج متكامل عن قصد: الاستراتيجية توجّه الإبداع، والإبداع يوجّه الإعلام، والتنفيذ الميداني يعود بنتائجه إلى الحملة دون فجوة تسليم.",
  "What guides us": "ما يوجّهنا", "Principles that show up in the work.": "مبادئ تظهر في كل عمل.",
  "The values in Grenada’s profile are treated as operating principles rather than decorative statements.": "قيم جرينادا ليست شعارات، بل مبادئ نعمل بها يومياً.",
  "Innovation": "الابتكار", "Use current tools, channels and production methods when they create a better market outcome.": "نستخدم أحدث الأدوات والقنوات وأساليب الإنتاج متى ما حققت نتيجة أفضل في السوق.",
  "Commitment": "الالتزام", "Stay close to the project from positioning through execution, reporting and refinement.": "نبقى قريبين من المشروع من التموضع إلى التنفيذ والتقارير والتحسين.",
  "Flexibility": "المرونة", "Adapt the campaign system to the asset, audience, sales environment and launch conditions.": "نكيّف منظومة الحملة حسب الأصل والجمهور وبيئة البيع وظروف الإطلاق.",
  "Start a conversation": "لنبدأ الحديث", "Put your next project": "ضع مشروعك القادم", "in front.": "في الصدارة.",
  "Bring strategy, creative, performance and field execution into one connected project team.": "استراتيجية وإبداع وأداء وتنفيذ ميداني في فريق مشروع واحد مترابط.",
  "Email Grenada": "راسل جرينادا", "Contact details": "بيانات التواصل",
  "About Grenada Studio — an integrated real estate marketing and creative agency connecting strategy, digital execution, production and field campaigns.": "عن جرينادا ستوديو — وكالة تسويق عقاري وإبداع متكاملة تربط الاستراتيجية بالتنفيذ الرقمي والإنتاج والحملات الميدانية.",
  "Campaign strategy session in a creative studio": "جلسة استراتيجية لحملة داخل استوديو إبداعي",

  // Services index
  "Services / 01—10": "الخدمات / 01—10", "Ten services.": "عشر خدمات.", "Four ways we move a project.": "أربعة مسارات نحرّك بها المشروع.",
  "From naming and identity to drone shoots, paid media and the final report, every service can run on its own or as part of one launch team.": "من التسمية والهوية إلى التصوير الجوي والإعلانات الممولة والتقرير النهائي، يمكن تنفيذ كل خدمة منفردة أو ضمن فريق إطلاق واحد.",
  "What the project is called, how it looks and what it says.": "اسم المشروع، وشكله، وما يقوله.",
  "Every surface the buyer sees, from a story post to a roadside billboard.": "كل مساحة يراها المشتري، من الستوري إلى لوحة الطريق.",
  "Platforms, landing pages, media spend and the numbers behind them.": "المنصات وصفحات الهبوط والميزانيات الإعلانية والأرقام خلفها.",
  "Drone, film and live coverage on the ground and at the auction hall.": "تصوير جوي وأفلام وتغطية حية في الموقع وفي قاعة المزاد.",
  "Available as a standalone service": "متاحة كخدمة مستقلة",
  "Build the right scope": "حدّد النطاق المناسب", "Pick one service, or": "اختر خدمة واحدة، أو", "the whole launch.": "الإطلاق كاملاً.",
  "Tell us about the asset and the timeline. We will propose the right mix.": "أخبرنا عن الأصل والجدول الزمني، ونقترح لك المزيج المناسب.",
  "Discuss your project": "ناقش مشروعك",
  "Grenada Studio services: brand identity, content, outdoor and social design, motion, social media, web, SEO, paid media, performance marketing and media production for real estate.": "خدمات جرينادا ستوديو: الهوية البصرية، المحتوى، تصميم اللوحات والسوشيال، الموشن، إدارة السوشيال ميديا، المواقع، تحسين محركات البحث، الإعلانات الممولة، تسويق الأداء والإنتاج الإعلامي للعقار.",

  // Service pages
  "In the work": "في أعمالنا", "See them all": "عرضها كلها", "Pairs well with.": "تتكامل مع.",
  "real project?": "لمشروع حقيقي؟", "Build the scope around the asset, launch stage and channels that matter.": "نبني النطاق حول الأصل ومرحلة الإطلاق والقنوات المؤثرة.",
  "Start the conversation": "ابدأ الحديث",

  // Work index
  "Real projects.": "مشاريع حقيقية.", "Real auctions.": "مزادات حقيقية.",
  "Plots, auctions and destination projects across Saudi Arabia, filmed, designed and launched by Grenada. Filter by the service you need to see it in the field.": "مخططات ومزادات ومشاريع وجهات في أنحاء المملكة، صوّرتها وصمّمتها وأطلقتها جرينادا. صفِّ الأعمال حسب الخدمة التي تحتاجها لتراها على أرض الواقع.",
  "Shorfat Al Haram / Makkah": "شرفات الحرم / مكة المكرمة", "Filter by service": "تصفية حسب الخدمة", "All": "الكل",
  "Flagship case studies": "دراسات حالة رئيسية", "Auction campaigns": "حملات المزادات",
  "Next case study": "دراسة الحالة القادمة", "Make the next launch": "اجعل إطلاقك القادم", "worth showing.": "جديراً بالعرض.",
  "Bring Grenada in early enough to connect the story, campaign system and execution.": "أشرك جرينادا مبكراً لنربط القصة ومنظومة الحملة والتنفيذ.",
  "Discuss a project": "ناقش مشروعاً",
  "Grenada Studio real estate marketing and auction campaign case studies, filterable by service.": "دراسات حالة جرينادا ستوديو في التسويق العقاري وحملات المزادات، مع تصفية حسب الخدمة.",
  "Filter projects by service": "تصفية المشاريع حسب الخدمة",

  // Case study
  "Case study": "دراسة حالة", "What we delivered": "ما قدّمناه",
  "From the campaign": "من الحملة", "Shot, designed and installed by Grenada.": "تصوير وتصميم وتركيب جرينادا.",
  "Selected frames from the project's photography, renders and live placements.": "لقطات مختارة من تصوير المشروع والتصاميم ثلاثية الأبعاد والإعلانات في الموقع.",
  "Services on this project": "الخدمات في هذا المشروع", "The services behind it.": "الخدمات التي صنعته.",
  "Each one is also available on its own. Open a service to see how it works and where else we used it.": "كل خدمة متاحة منفردة أيضاً. افتح الخدمة لتعرف كيف تعمل وأين استخدمناها.",
  "Build the next case study": "لنصنع دراسة الحالة القادمة", "Your project can use the same": "مشروعك يستحق نفس", "integrated model.": "النموذج المتكامل.",
  "Define the right mix of strategy, creative, media, web, production and field execution around the asset.": "نحدد المزيج المناسب من الاستراتيجية والإبداع والإعلام والمواقع والإنتاج والتنفيذ الميداني حول الأصل.",
  "Next project": "المشروع التالي",

  // Approach
  "How we work": "كيف نعمل", "Strategy to execution,": "من الاستراتيجية إلى التنفيذ،", "without the handoff gap.": "دون فجوة تسليم.",
  "Grenada connects current digital marketing thinking with fully integrated field solutions, so the project story can stay coherent from positioning through measurement.": "تربط جرينادا أحدث أساليب التسويق الرقمي بحلول ميدانية متكاملة، لتبقى قصة المشروع متسقة من التموضع حتى القياس.",
  "Operating model": "نموذج العمل", "4 stages. One connected team.": "4 مراحل. فريق واحد مترابط.",
  "The sequence is simple on purpose. Complexity belongs inside the execution, not inside the client experience.": "التسلسل بسيط عن قصد. التعقيد مكانه داخل التنفيذ، لا في تجربة العميل.",
  "Audience, offer, competitive context, message hierarchy and the narrative the project needs to own.": "الجمهور والعرض والمنافسة وترتيب الرسائل والقصة التي يجب أن يملكها المشروع.",
  "Identity, content, landing experiences, media assets, outdoor and sales-support material.": "الهوية والمحتوى وصفحات الهبوط والمواد الإعلامية واللوحات الخارجية ومواد دعم المبيعات.",
  "Paid media, social publishing, creators, on-ground execution, event coverage and lead capture.": "الإعلانات الممولة والنشر على السوشيال والمؤثرون والتنفيذ الميداني وتغطية الفعاليات وجمع العملاء المحتملين.",
  "Measure and improve.": "نقيس ونحسّن.",
  "CRO, KPIs, ROI, analytics, reporting and continuous refinement across the campaign lifecycle.": "تحسين التحويل ومؤشرات الأداء والعائد والتحليلات والتقارير والتحسين المستمر طوال عمر الحملة.",
  "The principle": "المبدأ", "Every discipline should know what the project is trying to": "كل تخصص يجب أن يعرف ما الذي يسعى المشروع إلى", "move.": "تحريكه.",
  "That shared commercial context is what lets design, content, media, web and production behave like one campaign instead of parallel deliverables.": "هذا الفهم التجاري المشترك هو ما يجعل التصميم والمحتوى والإعلام والمواقع والإنتاج تعمل كحملة واحدة لا كمخرجات متوازية.",
  "Start at stage one": "ابدأ من المرحلة الأولى", "Bring us in before the": "أشركنا قبل أن", "handoffs begin.": "تبدأ عمليات التسليم.",
  "The earlier the positioning, creative and execution teams share context, the stronger the campaign system can become.": "كلما تشاركت فرق التموضع والإبداع والتنفيذ الصورة مبكراً، أصبحت منظومة الحملة أقوى.",
  "Grenada Studio’s integrated real estate marketing process: position, build, launch and optimize.": "منهج جرينادا ستوديو المتكامل للتسويق العقاري: التموضع، البناء، الإطلاق والتحسين.",

  // Contact
  "Contact Grenada": "تواصل مع جرينادا", "Let’s build something that": "لنصنع معاً شيئاً", "moves.": "يُحدث أثراً.",
  "Tell us what you are launching, where it is, and what stage the project is in. We can shape the right mix of strategy, creative, media, web, production and field execution.": "أخبرنا ماذا تطلق، وأين، وفي أي مرحلة المشروع. نصمم لك المزيج المناسب من الاستراتيجية والإبداع والإعلام والمواقع والإنتاج والتنفيذ الميداني.",
  "Direct contact": "تواصل مباشر", "Focus": "مجال التركيز",
  "Real estate marketing, auctions & integrated campaigns": "التسويق العقاري والمزادات والحملات المتكاملة",
  "Grenada Studio ↗": "جرينادا ستوديو ↗", "Name": "الاسم", "Company": "الجهة", "Email": "البريد الإلكتروني", "Phone": "الجوال",
  "Project type": "نوع المشروع", "Real estate project": "مشروع عقاري", "Auction campaign": "حملة مزاد", "Brand identity": "هوية بصرية",
  "Performance marketing": "تسويق الأداء", "Media production": "إنتاج إعلامي", "Website / landing page": "موقع / صفحة هبوط", "Integrated scope": "نطاق متكامل",
  "Project details": "تفاصيل المشروع", "Prepare email": "تجهيز الرسالة",
  "This opens your email app with the project details prepared for hello@grenadastudio.com.": "سيفتح تطبيق البريد لديك برسالة جاهزة بتفاصيل المشروع إلى hello@grenadastudio.com.",
  "Contact Grenada Studio about a real estate marketing, auction, branding, performance, web or media production project.": "تواصل مع جرينادا ستوديو بخصوص مشروع تسويق عقاري أو مزاد أو هوية أو أداء أو موقع أو إنتاج إعلامي.",
  "Your name…": "اسمك…", "Company or project…": "الجهة أو المشروع…", "name@company.com…": "name@company.com…",
  "Location, launch timing, asset type and what you need help with…": "الموقع، موعد الإطلاق، نوع الأصل، وما تحتاج المساعدة فيه…",

  // 404
  "Page not found": "الصفحة غير موجودة", "This route moved out of the": "هذه الصفحة خرجت من", "campaign.": "الحملة.",
  "The page you requested does not exist. Return to Grenada Studio or browse the work.": "الصفحة التي طلبتها غير موجودة. عد إلى الرئيسية أو تصفح أعمالنا.",
  "Back home": "العودة للرئيسية", "View work": "تصفح الأعمال", "The requested Grenada Studio page was not found.": "لم يتم العثور على الصفحة المطلوبة.",

  // Service catalogue
  "Social Media Management": "إدارة منصات التواصل الاجتماعي", "Creative Content": "صناعة المحتوى الإبداعي",
  "Brand Identity & Logos": "الهويات البصرية والشعارات", "Outdoor & Social Design": "تصميم اللوحات الخارجية والسوشيال ميديا",
  "Motion & Voice Over": "الموشن جرافيك والتعليق الصوتي", "Web Design & Development": "تصميم وتطوير المواقع",
  "SEO": "تحسين محركات البحث", "Paid Media": "الإعلانات الممولة", "Performance Marketing": "إدارة الأداء التسويقي", "Media Production": "الإنتاج الإعلامي",
  "Platform systems, publishing, community management & reporting built around the project’s commercial narrative.": "إدارة المنصات والنشر والتفاعل مع الجمهور والتقارير، مبنية حول القصة التجارية للمشروع.",
  "Campaign copy, scripts and sales-support content designed to make complex real estate offers easier to understand and act on.": "نصوص الحملات والسكربتات ومحتوى دعم المبيعات، لتصبح العروض العقارية المعقدة أسهل فهماً واتخاذاً للقرار.",
  "Identity systems that give real estate projects a recognizable market position across digital, print and field execution.": "أنظمة هوية تمنح المشاريع العقارية حضوراً مميزاً في الرقمي والمطبوعات والتنفيذ الميداني.",
  "Connected visual systems for social, roadside, venue and print touchpoints — built to stay recognizable at every scale.": "أنظمة بصرية مترابطة للسوشيال ولوحات الطرق وقاعات المزاد والمطبوعات — واضحة في كل مقاس.",
  "Storyboards, motion graphics, animated plans and voice-over that turn project information into watchable campaign material.": "ستوري بورد وموشن جرافيك ومخططات متحركة وتعليق صوتي تحوّل معلومات المشروع إلى محتوى يُشاهَد.",
  "Fast, responsive landing experiences designed around lead capture, project clarity and campaign performance.": "صفحات هبوط سريعة ومتجاوبة مصممة لجمع العملاء المحتملين ووضوح المشروع وأداء الحملة.",
  "Search foundations that improve discoverability through technical, on-page and authority work tied to actual search intent.": "أساس قوي للظهور في محركات البحث عبر العمل التقني وتحسين الصفحات وبناء الموثوقية بحسب نية البحث الفعلية.",
  "Media planning, campaign launches and daily optimization across search and social platforms.": "تخطيط إعلامي وإطلاق الحملات وتحسين يومي على محركات البحث ومنصات التواصل.",
  "Measurement, CRO and optimization infrastructure that connects campaign activity to business outcomes.": "بنية قياس وتحسين تحويل تربط نشاط الحملة بالنتائج التجارية.",
  "Aerial, ground and event production built to capture the project, the place and the campaign in motion.": "إنتاج جوي وأرضي وتغطية فعاليات يلتقط المشروع والمكان والحملة وهي تتحرك.",
  "Grenada manages social presence as part of the wider launch system — connecting platform strategy, content cadence, community response and reporting instead of treating publishing as an isolated task.": "تدير جرينادا الحضور على السوشيال ميديا كجزء من منظومة الإطلاق — تربط استراتيجية المنصات وإيقاع المحتوى والتفاعل والتقارير، بدل التعامل مع النشر كمهمة منفصلة.",
  "Content is developed around the project’s offer, audience and sales journey — from social copy and direct messaging to profiles, project booklets, scripts and technical presentation material.": "نطوّر المحتوى حول عرض المشروع وجمهوره ورحلة البيع — من نصوص السوشيال والرسائل المباشرة إلى البروفايلات وكتيبات المشاريع والسكربتات والعروض الفنية.",
  "Grenada builds identity as an operating system for the campaign — not just a logo. The visual language is designed to survive the full mix of landing pages, social media, outdoor, print and event applications.": "تبني جرينادا الهوية كنظام تشغيل للحملة — لا مجرد شعار. اللغة البصرية مصممة لتعمل في صفحات الهبوط والسوشيال واللوحات الخارجية والمطبوعات والفعاليات.",
  "Project communication often moves between a phone screen, a roadside billboard, a venue wall and a printed booklet. Grenada designs those touchpoints as one coherent campaign system.": "تنتقل رسائل المشروع بين شاشة الجوال ولوحة الطريق وجدار القاعة والكتيب المطبوع. تصمم جرينادا كل نقاط التواصل هذه كمنظومة حملة واحدة متسقة.",
  "Motion is used where it can clarify the offer, extend campaign reach or make a project easier to remember — from animated plans and launch films to short-form advertising assets.": "نستخدم الموشن حيث يوضّح العرض أو يوسّع وصول الحملة أو يجعل المشروع أسهل تذكراً — من المخططات المتحركة وأفلام الإطلاق إلى الإعلانات القصيرة.",
  "Grenada builds project websites and landing pages as part of the conversion journey. The work connects responsive interface design, lead forms, analytics readiness, performance and campaign consistency.": "تبني جرينادا مواقع المشاريع وصفحات الهبوط كجزء من رحلة التحويل، بواجهات متجاوبة ونماذج تسجيل وجاهزية للتحليلات وأداء سريع واتساق مع الحملة.",
  "SEO is approached as a continuous visibility system: understand demand, structure pages around intent, remove technical friction and measure the search footprint over time.": "نتعامل مع تحسين محركات البحث كمنظومة ظهور مستمرة: نفهم الطلب، ونبني الصفحات حول نية البحث، ونزيل العوائق التقنية، ونقيس الحضور مع الوقت.",
  "Paid media is connected to the project’s commercial priorities, creative system and landing experience. Budgets, channel allocation and optimization are managed around measurable campaign objectives.": "ترتبط الإعلانات الممولة بأولويات المشروع التجارية ومنظومته الإبداعية وصفحة الهبوط. تُدار الميزانيات وتوزيع القنوات والتحسين حول أهداف قابلة للقياس.",
  "Performance work starts with measurement quality. Grenada connects KPIs, analytics, conversion journeys and CRO so campaign decisions can be made from evidence instead of isolated platform metrics.": "يبدأ تسويق الأداء بجودة القياس. تربط جرينادا مؤشرات الأداء والتحليلات ورحلات التحويل وتحسينها، لتُبنى قرارات الحملة على الأدلة لا على أرقام منصة منفردة.",
  "Grenada combines on-ground production with the wider campaign system — including aerial and ground filming, CGI/3D integration, editing, event coverage and AI-assisted visual production where appropriate.": "تدمج جرينادا الإنتاج الميداني مع منظومة الحملة — من التصوير الجوي والأرضي ودمج الـ CGI والـ 3D والمونتاج وتغطية الفعاليات، إلى الإنتاج البصري بمساعدة الذكاء الاصطناعي عند الحاجة.",
  "Platform strategy & setup": "استراتيجية المنصات وتجهيزها", "Publishing plans": "خطط النشر", "Community management": "إدارة التفاعل مع الجمهور",
  "Campaign content coordination": "تنسيق محتوى الحملة", "Reporting & optimization": "التقارير والتحسين", "Instagram, X, Snapchat, TikTok & LinkedIn": "إنستغرام وإكس وسناب شات وتيك توك ولينكدإن",
  "Social copy": "نصوص السوشيال ميديا", "SMS & WhatsApp content": "محتوى الرسائل النصية وواتساب", "Company & project profiles": "بروفايلات الشركات والمشاريع",
  "Project booklets": "كتيبات المشاريع", "Video concepts & scripts": "أفكار وسكربتات الفيديو", "Technical marketing files": "الملفات التسويقية الفنية",
  "Logo creation": "تصميم الشعارات", "Visual identity systems": "أنظمة الهوية البصرية", "Digital identity applications": "تطبيقات الهوية الرقمية",
  "Printed identity applications": "تطبيقات الهوية المطبوعة", "Campaign art direction": "الإدارة الفنية للحملة", "Real estate positioning support": "دعم التموضع العقاري",
  "Social media visual systems": "أنظمة بصرية للسوشيال ميديا", "Roadside billboards": "لوحات الطرق", "Campaign signage": "لافتات الحملة",
  "Venue graphics": "تصاميم قاعة المزاد", "Printed campaign materials": "مطبوعات الحملة", "Sales-support design": "تصاميم دعم المبيعات",
  "Storyboards": "ستوري بورد", "Motion graphics": "موشن جرافيك", "Animated plans": "مخططات متحركة", "Campaign films": "أفلام الحملات",
  "Professional voice-over": "تعليق صوتي احترافي", "Short-form advertising video": "فيديوهات إعلانية قصيرة",
  "Responsive interfaces": "واجهات متجاوبة", "Landing pages": "صفحات الهبوط", "Smart lead forms": "نماذج تسجيل ذكية",
  "CRM-ready integrations": "ربط جاهز مع أنظمة CRM", "Performance optimization": "تحسين الأداء", "Security & analytics readiness": "جاهزية الأمان والتحليلات",
  "Keyword research": "بحث الكلمات المفتاحية", "On-page optimization": "تحسين الصفحات", "Technical SEO": "السيو التقني",
  "Off-page authority building": "بناء الموثوقية الخارجية", "Search tracking": "تتبع نتائج البحث", "Continuous optimization": "تحسين مستمر",
  "Google Ads": "إعلانات Google", "Meta Ads": "إعلانات Meta", "Snapchat Ads": "إعلانات Snapchat", "TikTok Ads": "إعلانات TikTok",
  "Media planning & budget control": "التخطيط الإعلامي وضبط الميزانية", "Campaign reporting & optimization": "تقارير الحملات وتحسينها",
  "CRO": "تحسين معدل التحويل", "KPI frameworks": "أطر مؤشرات الأداء", "ROI measurement": "قياس العائد على الاستثمار",
  "Analytics infrastructure": "بنية التحليلات", "Google Analytics integrations": "الربط مع Google Analytics", "Continuous performance reporting": "تقارير أداء مستمرة",
  "Aerial filming": "تصوير جوي", "Ground filming": "تصوير أرضي", "CGI & 3D integration": "دمج CGI والـ 3D", "Editing": "المونتاج",
  "Event coverage": "تغطية الفعاليات", "AI-assisted visual production": "إنتاج بصري بمساعدة الذكاء الاصطناعي",

  // Project scope items and facts
  "Landing page": "صفحة هبوط", "Project booklet": "كتيب المشروع", "Media coverage": "تغطية إعلامية", "Social design": "تصاميم السوشيال",
  "Outdoor": "اللوحات الخارجية", "Brochure": "بروشور", "Advertising videos": "فيديوهات إعلانية", "Company profile": "بروفايل الشركة",
  "Influencer videos": "فيديوهات المؤثرين", "Social media": "السوشيال ميديا", "Marketing plan": "الخطة التسويقية",
  "Venue materials": "مواد قاعة المزاد", "TV & radio advertising": "إعلانات التلفزيون والراديو", "Live event coverage": "تغطية حية للفعالية",
  "Visual identity": "الهوية البصرية", "Roadside campaign": "حملة لوحات الطرق", "Venue print": "مطبوعات القاعة", "Drone filming": "تصوير بالدرون",
  "Auction booklet": "كتيب المزاد", "Live coverage": "تغطية حية", "Printed brochure": "بروشور مطبوع",
  "Social media management": "إدارة السوشيال ميديا", "Outdoor & social design": "تصميم اللوحات والسوشيال", "Booklet & content": "الكتيب والمحتوى",
  "Marketing video & voice-over": "فيديو تسويقي وتعليق صوتي", "Drone & property photography": "تصوير جوي وتصوير العقارات",
  "Final report & lead tracking": "التقرير النهائي وتتبع العملاء", "Paid & influencer media": "إعلانات ممولة ومؤثرون",
  "residential & commercial plots": "قطعة سكنية وتجارية", "total land area": "إجمالي مساحة الأرض", "location": "الموقع",
  "campaign views": "مشاهدة للحملة", "auction page visits": "زيارة لصفحة المزاد", "auction visitors": "زائر للمزاد", "registered bidders": "مزايد مسجّل",
  "auction format": "صيغة المزاد", "commercial, agricultural & residential lands": "أراضٍ تجارية وزراعية وسكنية", "properties": "عقارات",
  "bids": "مزايدة", "brochure downloads": "تحميل للبروشور", "registered interest": "تسجيل اهتمام", "auction hall + online": "قاعة المزاد + أونلاين",
  "campaign posts": "منشور للحملة", "total sales": "إجمالي المبيعات",
  "plots": "قطعة", "lands": "أراضٍ", "lots": "قطع",
  "Hybrid": "هجين", "Hybrid auction": "مزاد هجين", "Online auction": "مزاد إلكتروني", "Real estate auction": "مزاد عقاري",
  "1.3M+ m²": "+1.3 مليون م²", "SAR 14.3M": "14.3 مليون ريال", "~2M": "\u2066~2\u2069 مليون", "~1M": "\u2066~1\u2069 مليون", "~1.5M": "\u2066~1.5\u2069 مليون",
  "Selected work / KSA": "أعمال مختارة / السعودية",

  // Gallery alts
  "Aerial view of the Shorfat Al Haram plots among the Makkah mountains": "لقطة جوية لمخطط شرفات الحرم بين جبال مكة المكرمة",
  "Drone shot of the Shorfat Al Haram masterplan at golden hour": "تصوير بالدرون للمخطط العام لشرفات الحرم وقت الغروب",
  "Wide aerial of the Shorfat Al Haram site and surrounding districts": "لقطة جوية واسعة لموقع شرفات الحرم والأحياء المحيطة",
  "Shorfat Al Haram social media post announcing 914 plots": "منشور سوشيال لشرفات الحرم يعلن عن 914 قطعة",
  "Aerial drone photograph of the Shorfat Al Haram site in Makkah": "تصوير جوي بالدرون لموقع شرفات الحرم في مكة المكرمة",
  "Malqa Taif real estate campaign identity and marketing materials": "هوية حملة ملقا الطائف العقارية وموادها التسويقية",
  "Khairat Taibah digital billboard at a Madinah intersection": "لوحة رقمية لمزاد خيرات طيبة عند تقاطع في المدينة المنورة",
  "Khairat Taibah auction billboard on a Madinah road": "لوحة مزاد خيرات طيبة على طريق في المدينة المنورة",
  "3D render of Dream Land villas at sunset": "تصميم ثلاثي الأبعاد لفلل دريم لاند وقت الغروب",
  "3D render of the Dream Land central park": "تصميم ثلاثي الأبعاد للحديقة المركزية في دريم لاند",
  "3D render of Dream Land with its mosque at dusk": "تصميم ثلاثي الأبعاد لدريم لاند ومسجدها عند الغسق",
  "3D render of the Dream Land community in Taif at sunset": "تصميم ثلاثي الأبعاد لمجتمع دريم لاند في الطائف وقت الغروب",
  "Nukhbat Al Taif on-site auction sign in Al Hada": "لوحة مزاد نخبة الطائف في الموقع بالهدا",
  "Crew installing a Nukhbat Al Taif on-site sign": "فريق يركّب لوحة نخبة الطائف في الموقع",
  "Nukhbat Al Taif auction sign installed on site in Taif": "لوحة مزاد نخبة الطائف مركّبة في الموقع بالطائف",
  "Drone view of an Osoul Makkah property": "لقطة بالدرون لأحد عقارات أصول مكة",
  "Aerial of the Osoul Makkah site and surrounding roads": "لقطة جوية لموقع أصول مكة والطرق المحيطة",
  "Drone photograph over central Makkah for the Osoul Makkah auction": "تصوير بالدرون فوق وسط مكة المكرمة لمزاد أصول مكة"
};

// Names that stay as written on the Arabic pages.
const KEEP = new Set(["hello@grenadastudio.com", "Instagram", "Behance", "LinkedIn", "EN", "English version", "360°", "name@company.com…", ...partners.map((p) => p.en)]);

for (const [en, ar] of Object.entries(PLACES)) D[en] ??= ar;
for (const p of projects) D[p.title] ??= p.titleAr;
const serviceByLower = Object.fromEntries(services.map((s) => [s.title.toLowerCase(), D[s.title]]));
void pillars;

const num = String.raw`[~+]?\d[\d,.]*\+?`;
const RULES = [
  [/^(.+) — Grenada Studio$/, (m) => `${t(m[1])} — جرينادا ستوديو`],
  [/^(.+) — (.+) in (.+)\. Selected campaign work by Grenada Studio\.$/, (m) => `${t(m[1])} — ${t(m[2])} في ${t(m[3])}. من أعمال جرينادا ستوديو.`],
  [/^(.+) auction — campaign photography$/, (m) => `${t(m[1]).startsWith("مزاد") ? "" : "مزاد "}${t(m[1])} — من تصوير الحملة`],
  [/^(.+) — campaign photo (\d+)$/, (m) => `${t(m[1])} — صورة من الحملة ${m[2]}`],
  [/^(\d+) projects? on this site$/, (m) => m[1] === "1" ? "مشروع واحد في الموقع" : `${m[1]} مشاريع في الموقع`],
  [/^(\d+) projects? used this service\.$/, (m) => m[1] === "1" ? "مشروع واحد استخدم هذه الخدمة." : `${m[1]} مشروعاً استخدم هذه الخدمة.`],
  [/^(Capability|Service) \/ (\d+)$/, (m) => `${m[1] === "Service" ? "الخدمة" : "الخدمة"} / ${m[2]}`],
  [/^Need (.+) for a$/, (m) => `تحتاج ${serviceByLower[m[1]] ?? t(m[1])}`],
  [/^Also in (.+)$/, (m) => `ضمن ${t(m[1])} أيضاً`],
  [/^All projects \((\d+)\)$/, (m) => `جميع المشاريع (${m[1]})`],
  [/^All (\d+) case studies ↗$/, (m) => `جميع دراسات الحالة (${m[1]}) ↗`],
  [/^(.+) \((\d+)\)$/, (m) => `${t(m[1])} (${m[2]})`],
  [/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})$/, (m) => `${MONTHS[m[1]]} ${m[2]}`],
  [new RegExp(`^(${num}) (.+)$`), (m) => `${m[1]} ${t(m[2])}`],
  [new RegExp(`^${num}$`), (m) => m[0]]
];

const cache = new Map();
// Returns the Arabic for an English string, or null when it has no translation.
export function t(s) {
  if (s == null) return null;
  if (cache.has(s)) return cache.get(s);
  let out = D[s] ?? null;
  if (out == null && KEEP.has(s)) out = s;
  if (out == null) for (const [re, fn] of RULES) {
    const m = s.match(re);
    if (m) { const r = fn(m); if (r && !r.includes("null")) { out = r; break; } }
  }
  if (out == null && /·/.test(s)) {
    const parts = s.split(/\s*·\s*/);
    const tr = parts.map((p) => (p === "" ? "" : t(p)));
    if (tr.every((x) => x != null)) out = tr.join(" · ").trim();
  }
  if (out == null && s.endsWith(" ↗") && t(s.slice(0, -2)) != null) out = `${t(s.slice(0, -2))} ↗`;
  cache.set(s, out);
  return out;
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const encText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const encAttr = (s) => encText(s).replace(/"/g, "&quot;");
const latin = /[A-Za-z]{2}/;

// Translates a rendered English page. Returns { html, misses }.
export function translateHtml(html) {
  const misses = new Set();
  const tr = (raw, enc) => {
    const text = decode(raw);
    const core = text.replace(/\s+/g, " ").trim();
    if (!/[A-Za-z]/.test(core)) return raw;
    const ar = t(core);
    if (!latin.test(core) && (ar == null || ar === core)) return raw;
    if (ar == null) { misses.add(core); return raw; }
    const lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0];
    return lead + enc(ar.replace(/↗/g, "↖")) + trail;
  };
  // Keep scripts, styles and explicitly English spans untouched.
  const keep = [];
  html = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<(\w+)[^>]*\slang="en"[^>]*>[\s\S]*?<\/\1>/g, (m) => `<!--k${keep.push(m) - 1}-->`);
  html = html.replace(/>([^<>]+)</g, (m, text) => `>${tr(text, encText)}<`);
  html = html.replace(/(\s(?:alt|aria-label|title|placeholder|label)=")([^"]*)(")/g, (m, a, v, b) => a + tr(v, encAttr) + b);
  html = html.replace(/(<meta (?:name="description"|property="og:(?:title|description)") content=")([^"]*)(")/g, (m, a, v, b) => a + tr(v, encAttr) + b);
  html = html.replace(/<!--k(\d+)-->/g, (m, i) => keep[i]);
  return { html, misses: [...misses] };
}
