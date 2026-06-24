import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- Mandi & Haneeth Meat (لحوم المندي والحنيذ) ---
  {
    id: 'm1',
    nameAr: 'مندي لحم بلدي (ثمن تيس)',
    nameEn: 'Mandi Baladi Meat (1/8 Lamb)',
    descriptionAr: 'لحم بلدي طازج مطهو على الطريقة الحضرمية الأصيلة في حفرة المندي تحت الأرض ببطء لمدة ٦ ساعات مع أرز بسمتي فاخر ومكسرات.',
    descriptionEn: 'Fresh local baby lamb slow-cooked the traditional Hadramout way in an underground pit for 6 hours, served with premium Basmati rice and nuts.',
    price: 950,
    category: 'mandi_haneeth',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', // delicious ribs/meat
    popular: true,
    hasRiceChoice: true
  },
  {
    id: 'm2',
    nameAr: 'حنيذ لحم بلدي (كتف كامل)',
    nameEn: 'Haneeth Baladi Meat (Whole Shoulder)',
    descriptionAr: 'كتف لحم ضاني بلدي متبل ببهارات الحنيذ الخاصة ومطهو داخل ورق الموز والقصدير بأسلوب تهامي عريق ليذوب اللحم تماماً.',
    descriptionEn: 'Whole local lamb shoulder seasoned with special Haneeth spices and slow-cooked in banana leaves & foil in an ancient Tihamah style until it melts.',
    price: 3600,
    category: 'mandi_haneeth',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80', // roasted lamb shoulder
    popular: true,
    hasRiceChoice: true
  },
  {
    id: 'm3',
    nameAr: 'موزة السلطان الفاخرة',
    nameEn: 'The Sultan’s Royal Shank',
    descriptionAr: 'موزة لحم ضاني بلدي مشوية ببطء شديد حتى الذوبان، تقدم فوق طبقة من الأرز البسمتي بالخلطة والمكسرات والزبيب.',
    descriptionEn: 'Local lamb shank, slow-roasted to melt-in-your-mouth perfection, served over premium Basmati rice with nuts, raisins, and special spices.',
    price: 890,
    category: 'mandi_haneeth',
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80', // slow cooked meat shank
    popular: false,
    hasRiceChoice: true
  },
  {
    id: 'm4',
    nameAr: 'نفر لحم حنيذ / مندي',
    nameEn: 'Mandi / Haneeth Single Portion',
    descriptionAr: 'وجبة فردية من اللحم البلدي الدايب (مندي أو حنيذ حسب اختيارك) تقدم مع أرز بسمتي مبهر، سلطة دقوس، وشوربة مرق.',
    descriptionEn: 'A single hearty portion of melt-in-your-mouth local meat (Mandi or Haneeth of your choice) served with spiced Basmati rice, Daqoos, and broth.',
    price: 490,
    category: 'mandi_haneeth',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    optionsLabelAr: 'طريقة الطهي',
    optionsLabelEn: 'Cooking Style',
    options: ['مندي أصيل', 'حنيذ متبل'],
    hasRiceChoice: true
  },

  // --- Chicken Dishes (أطباق الدواجن) ---
  {
    id: 'c1',
    nameAr: 'دجاج مندي السلطان',
    nameEn: 'Sultan Mandi Chicken',
    descriptionAr: 'نصف دجاجة طازجة متبلة ببهارات المندي الحضرمي ومسواة بالبخار والحرارة داخل الحفرة، تقدم مع الأرز والدقوس.',
    descriptionEn: 'Fresh half chicken seasoned with authentic Hadramout Mandi spices, steam-cooked in our underground pit, served with spiced rice and Daqoos.',
    price: 190,
    category: 'chicken',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', // Arabian roasted chicken over rice
    popular: true,
    optionsLabelAr: 'الحجم',
    optionsLabelEn: 'Size',
    options: ['نصف دجاجة', 'دجاجة كاملة'],
    optionPrices: [0, 180],
    hasRiceChoice: true
  },
  {
    id: 'c2',
    nameAr: 'دجاج مضغوط يمني',
    nameEn: 'Yemeni Madghout Chicken',
    descriptionAr: 'دجاج مطهو بضغط البخار مع الأرز البسمتي والطماطم والبهارات العربية الفاخرة ليتشرب الأرز نكهة الدجاج بالكامل.',
    descriptionEn: 'Chicken pressure-cooked together with Basmati rice, tomatoes, and rich Arabic spices so the rice fully absorbs the rich chicken stock.',
    price: 210,
    category: 'chicken',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80', // chicken rice dish
    optionsLabelAr: 'الحجم',
    optionsLabelEn: 'Size',
    options: ['نصف دجاجة', 'دجاجة كاملة'],
    optionPrices: [0, 190],
    hasRiceChoice: true
  },
  {
    id: 'c3',
    nameAr: 'دجاج مظبي على الحجر',
    nameEn: 'Stone-Grilled Madhbi Chicken',
    descriptionAr: 'دجاج مفرود متبل جيدا ومطهو ببطء فوق أحجار بركانية ساخنة على الفحم ليكتسب قشرة ذهبية مقرمشة ونكهة تدخين فريدة.',
    descriptionEn: 'Butterflied chicken grilled over piping hot volcanic stones on charcoal, giving it a crispy golden skin and a unique smoky depth.',
    price: 200,
    category: 'chicken',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80', // grilled chicken
    optionsLabelAr: 'الحجم',
    optionsLabelEn: 'Size',
    options: ['نصف دجاجة', 'دجاجة كاملة'],
    optionPrices: [0, 180],
    hasRiceChoice: true
  },

  // --- Royal Trays (الصواني السلطانية) ---
  {
    id: 't1',
    nameAr: 'صينية السعادة',
    nameEn: 'The Tray of Happiness',
    descriptionAr: 'صينية ضخمة تكفي ٤ أشخاص: ربع تيس مندي دايب + نصف دجاجة مندي + كفتة مشوية (١/٢ كيلو) + ممبار وورق عنب + سيرفيس أرز بسمتي فاخر + دقوس وطحينة.',
    descriptionEn: 'A massive tray for 4 people: 1/4 Mandi baby lamb + 1/2 Mandi chicken + 1/2 kg grilled Kofta + Mumbar & Vine Leaves + huge Basmati rice bed + Daqoos & Tahini.',
    price: 2450,
    category: 'trays',
    image: 'https://images.unsplash.com/photo-1534080391025-a7f0e65789ee?auto=format&fit=crop&w=600&q=80', // arabian platter
    popular: true,
    hasRiceChoice: true
  },
  {
    id: 't2',
    nameAr: 'صينية السلطان الملكية',
    nameEn: 'The Sultan’s Royal Feast Tray',
    descriptionAr: 'صينية الملوك والضيافة الكبرى تكفي من ٦ إلى ٨ أفراد: نصف تيس مندي كامل (كتف ورقبة كاملين) + دجاجة مندي كاملة + كفتة وطرب (١ كيلو) + سيرفيس أرز مكسرات ملكي + مقبلات مشكلة وسلطات.',
    descriptionEn: 'The ultimate tray of hospitality for 6-8 people: 1/2 baby lamb (shoulder & neck) + whole Mandi chicken + 1kg Kofta & Tarb + royal mixed-nuts rice + appetizers & salads.',
    price: 4900,
    category: 'trays',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    popular: true,
    hasRiceChoice: true
  },
  {
    id: 't3',
    nameAr: 'صينية لِـمّـة الحبايب',
    nameEn: 'Family Gathering Tray',
    descriptionAr: 'تكفي ٣ أشخاص: ٣ قطع لحم مندي بلدي + نصف دجاجة + شيش طاووق وكفتة + أرز بسمتي بالخلطة والمكسرات + ٣ سلطات متنوعة.',
    descriptionEn: 'Perfect for 3 people: 3 large cuts of local Mandi lamb + 1/2 chicken + Shish Tawook & Kofta + spiced nuts rice + 3 assorted salads.',
    price: 1550,
    category: 'trays',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    hasRiceChoice: true
  },

  // --- Charcoal Grills (مشويات الفحم) ---
  {
    id: 'g1',
    nameAr: 'كيلو مشكل مشويات السلطان',
    nameEn: '1 Kg Sultan’s Mix Grill',
    descriptionAr: 'توليفة فاخرة من الكباب، كفتة بلدي، شيش طاووق، وطرب، مشوية على الفحم الطبيعي وتقدم مع الخبز البلدي الساخن وسلطة الطحينة.',
    descriptionEn: 'A premium selection of lamb Kabab, local Kofta, Shish Tawook, and smoky Tarb, grilled over natural charcoal, served with fresh bread and Tahini.',
    price: 880,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', // delicious grilled skewers
    popular: true,
    optionsLabelAr: 'الوزن',
    optionsLabelEn: 'Weight',
    options: ['١ كيلو مشكل', 'نصف كيلو مشكل', 'ربع كيلو مشكل'],
    optionPrices: [0, -440, -660]
  },
  {
    id: 'g2',
    nameAr: 'كفتة ضاني بلدي (كيلو)',
    nameEn: 'Local Lamb Kofta (1 Kg)',
    descriptionAr: 'كفتة محضرة من لحم الضاني البلدي المفروم مع لية الخروف والبهارات الشرقية والسرية، مشوية ببراعة على سيخ الفحم.',
    descriptionEn: 'Kofta made from premium minced local lamb with sheep tail fat and secret spices, grilled masterfully on skewers over charcoal.',
    price: 790,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80', // kabab skewers
    optionsLabelAr: 'الوزن',
    optionsLabelEn: 'Weight',
    options: ['١ كيلو كفتة', 'نصف كيلو كفتة'],
    optionPrices: [0, -395]
  },
  {
    id: 'g3',
    nameAr: 'ريش ضاني بلدي مشوية (كيلو)',
    nameEn: 'Grilled Lamb Chops (1 Kg)',
    descriptionAr: 'ريش لحم ضاني بلدي بتتبيلة الخل والليمون والبصل والبهارات، مشوية على نار هادئة على الفحم لتبقى طرية وعصارية.',
    descriptionEn: 'Local lamb chops marinated in vinegar, lemon, onion, and spices, slow-grilled over charcoal to remain incredibly tender and juicy.',
    price: 1150,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    optionsLabelAr: 'الوزن',
    optionsLabelEn: 'Weight',
    options: ['١ كيلو ريش', 'نصف كيلو ريش'],
    optionPrices: [0, -575]
  },

  // --- Appetizers & Sides (المقبلات والشوربة) ---
  {
    id: 'a1',
    nameAr: 'طبق مقبلات السلطان المشكل',
    nameEn: 'Sultan’s Mixed Appetizers Platter',
    descriptionAr: 'طبق غني يجمع أفضل مقبلاتنا: ورق عنب، ممبار مقرمش، سمبوسك لحمة وجبنة، طحينة، دقوس، وبابا غنوج.',
    descriptionEn: 'A rich platter combining our finest starters: vine leaves, crispy Mumbar, meat & cheese Sambousek, Tahini, Daqoos, and Baba Ghanoush.',
    price: 190,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80' // Arabic mezze
  },
  {
    id: 'a2',
    nameAr: 'ممبار بلدي فاخر',
    nameEn: 'Premium Local Mumbar',
    descriptionAr: 'ممبار محشو بخلطة الأرز المصرية بالكزبرة والبقدونس والطماطم والبهارات، مسلوق ومحمر بالزبدة ليصبح ذهبياً ومقرمشاً.',
    descriptionEn: 'Sausage casing stuffed with traditional Egyptian rice mixture of coriander, parsley, tomatoes, and spices, boiled then fried in butter to golden crisp.',
    price: 120,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'a3',
    nameAr: 'ورق عنب بالليمون ودبس الرمان',
    nameEn: 'Vine Leaves with Pomegranate Molasses',
    descriptionAr: 'ورق عنب محشو بخلطة الأرز الشهية ومطهو بمرق اللحم والليمون ودبس الرمان لمذاق حامض وحلو رائع.',
    descriptionEn: 'Stuffed vine leaves cooked with meat broth, lemon, and pomegranate molasses for a perfect sweet & sour tang.',
    price: 90,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'a4',
    nameAr: 'سمبوسك مشكل (٦ قطع)',
    nameEn: 'Mixed Sambousek (6 Pcs)',
    descriptionAr: 'قطع من السمبوسك المقرمشة الذهبية، ٣ قطع محشوة باللحم المفروم المتبل و٣ قطع محشوة بمزيج الأجبان الغنية.',
    descriptionEn: 'Crispy golden pastry pockets, 3 stuffed with seasoned minced beef and 3 stuffed with a rich blend of cheeses.',
    price: 85,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80' // crispy pastries
  },
  {
    id: 'a5',
    nameAr: 'سلطة دقوس حار',
    nameEn: 'Spicy Daqoos Salad',
    descriptionAr: 'السلطة الحضرمية الشهيرة المرافقة للمندي: طماطم طازجة مفرومة مع الفلفل الحار والكزبرة والثوم والليمون.',
    descriptionEn: 'The famous Hadramout salsa served with Mandi: fresh crushed tomatoes blended with hot green chili, coriander, garlic, and lemon juice.',
    price: 25,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80'
  },

  // --- Desserts & Drinks (الحلويات والمشروبات) ---
  {
    id: 'd1',
    nameAr: 'كنافة السلطان بالقشطة والفسدق',
    nameEn: 'Sultan Kunafa with Cream & Pistachio',
    descriptionAr: 'كنافة ذهبية مقرمشة ومحشوة بالقشطة البلدية الغنية، تسقى بالقطر الساخن وتزين برشة سخية من الفسدق الحلبي.',
    descriptionEn: 'Crispy golden Kunafa pastry stuffed with rich clotted cream (Ashta), drizzled with warm sugar syrup, and dusted generously with premium pistachios.',
    price: 110,
    category: 'desserts_drinks',
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=600&q=80', // middle eastern sweet
    popular: true
  },
  {
    id: 'd2',
    nameAr: 'أم علي بالمكسرات والقشطة والزبدة',
    nameEn: 'Royal Um Ali with Mixed Nuts',
    descriptionAr: 'رقائق الميل فوي الهشة المخبوزة في فرن الحجر بالحليب الساخن الكثيف والقشطة والزبدة، مع تشكيلة مكسرات فاخرة وزبيب وجوز هند.',
    descriptionEn: 'Crispy puff pastry baked with hot sweetened milk, fresh cream, butter, topped with a premium assortment of almonds, pistachios, and raisins.',
    price: 120,
    category: 'desserts_drinks',
    image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd3',
    nameAr: 'مشروبات غازية',
    nameEn: 'Soft Drinks',
    descriptionAr: 'كانز بارد ومنعش (بيبسي، ميرندا، سفن أب) للمساعدة في الهضم بعد وجبة المندي الدسمة.',
    descriptionEn: 'Chilled refreshing carbonated soda (Pepsi, Mirinda, 7Up) to complement your rich Mandi meal.',
    price: 35,
    category: 'desserts_drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    optionsLabelAr: 'النوع',
    optionsLabelEn: 'Type',
    options: ['بيبسي', 'سفن أب', 'ميرندا برتقال', 'مياه معدنية']
  }
];

export const STATIC_REVIEWS = [
  {
    id: 'r1',
    name: 'أحمد زهران',
    rating: 5,
    comment: 'مندي اللحم عندهم حكاية تانية خالص! اللحم مستوي جداً لدرجة أنه بيقع من العضم والأرز ريحته سمن بلدي وتتبيلته ممتازة. صينية السعادة كفتنا وزيادة وبجد الخدمة محترمة والأكل وصل في علب حرارية سخن كأنك قاعد في المطعم.',
    date: 'منذ يومين',
    isVerified: true
  },
  {
    id: 'r2',
    name: 'شريف إسماعيل',
    rating: 5,
    comment: 'مطعم محترم جداً، والموقع قريب في المهندسين والتعامل قمة في الذوق. المظبي على الحجر عندهم مميز جداً وطعمه مدخن رائع ومقرمش من برة وطري من جوة. مرقة اللحم المجانية في البداية روعة.',
    date: 'منذ أسبوع',
    isVerified: true
  },
  {
    id: 'r3',
    name: 'مي عبد الرحمن',
    rating: 5,
    comment: 'عملنا عزومة كبيرة وطلبنا صينية السلطان الملكية بجد شرفتنا قدام الضيوف! الرز طعم ومتبل صح والمكسرات محمصة بامتياز والكتف الضاني دايب والكل انبهر بيه. الكنافة بالقشطة ختمت اليوم بأجمل شكل.',
    date: 'منذ أسبوعين',
    isVerified: true
  },
  {
    id: 'r4',
    name: 'محمد علي البكري',
    rating: 4,
    comment: 'طعم المندي الحضرمي الأصيل بنفس المذاق اللي كلته في اليمن والخليج. الحنيذ رائع جداً، وتوصيل الأكل سريع لبيتنا بالدقي. هطلب منهم دايماً.',
    date: 'منذ شهر',
    isVerified: true
  }
];
