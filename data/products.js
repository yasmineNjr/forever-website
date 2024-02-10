const DUMMY_PRODUCTS = [
    {
        id: 'p1',
        title: 'Forever Aloe Vera Gel',
        //image: 'https://cdn.foreverliving.com/content/products/images/ALOE_VERA_GEL__pd_main_512_X_512_1617785242148.png',
        //image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5awNHuGQq5W9bTL8pkDD70XSqSYcxRFRMVquz0lN5PiE6kP5Zl2MkXKudZHvf66gmDyc&usqp=CAU',
        image: 'https://static-01.daraz.pk/p/2feb410217f4f68c79e2aa91b04a6b16.jpg',
        description: 'Forever Aloe Vera Gel is a sugar-free drink made from the pure gel from the inner leaf of the aloe vera plant. And also important: no preservatives are added during the processing process, only vitamin C. In addition, the drink is gluten-free. This Aloe Vera Gel is therefore a healthy addition to a balanced diet.',
        //'فوريفر ألوفيرا جل هو مشروب خالي من السكر مصنوع من الجل النقي المستخرج من الورقة الداخلية لنبات الصبار. ومن المهم أيضًا: لا تتم إضافة أي مواد حافظة أثناء عملية المعالجة، بل يتم إضافة فيتامين C فقط. بالإضافة إلى ذلك، فإن المشروب خالي من الغلوتين. لذلك يعد جل الصبار هذا إضافة صحية لنظام غذائي متوازن.'
        price: '$10',
        department: {id: 'supplement', title: 'Dietary Supplement'},
        groups: [
                    {id: 'g1', title: 'Forever belly slimming group'},
                    {id: 'g2', title: 'The mini slimming group'},
                    {id: 'g3', title: 'Fit 1 group'},
                ],
        date: '10-02-2022',
        rate: '5',
        salesCount: '1200'
    },
    {
        id: 'p2',
        title: 'Forever Therm',
        image: 'https://static.wixstatic.com/media/b7a980_44a00e861d98417489bc4d5dec9a2c7e~mv2.jpg/v1/fill/w_544,h_540,al_c/b7a980_44a00e861d98417489bc4d5dec9a2c7e~mv2.jpg',
        description: 'Forever Therm ™ is a fat burner that contains plant extracts (green tea, green coffee, Guarana) associated with B vitamins and vitamin C. It helps maintain and control weight, lower fat , increase fat oxidation and reduce fatigue.',
        //'فوريفر ثيرم™ هو حارق للدهون يحتوي على مستخلصات نباتية (الشاي الأخضر، القهوة الخضراء، الجوارانا) المرتبطة بفيتامينات ب وفيتامين سي. يساعد في الحفاظ على الوزن والتحكم فيه، وخفض الدهون، وزيادة أكسدة الدهون وتقليل التعب.'
        price: '7',
        department: {id: 'weight', title: 'Slimming and weight control'},
        groups: [
                    {id: 'g3', title: 'Fit 1 group'},
                ],
        date: '05-12-2023',
        rate: '3',
        salesCount: '750'
    },
    {
        id: 'p3',
        title: 'Forever Lean',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtnNuAepdNPOybjKeKFhiz0166sATRawnA2g&usqp=CAU',
        description: 'Forever Lean™ is a dietary supplement with extract of Indian fig and white kidney beans, and also contains chromium, which contributes to the maintenance of normal blood glucose levels.',
        //'فوريفر لين™ هو مكمل غذائي يحتوي على خلاصة التين الهندي والفاصوليا البيضاء، ويحتوي أيضًا على الكروم الذي يساهم في الحفاظ على مستويات السكر في الدم الطبيعية.'
        price: '10',
        department: {id: 'weight', title: 'Slimming and weight control'},
        groups: 'none',
        date: '05-10-2022',
        rate: '4',
        salesCount: '500'
    },
    {
        id: 'p4',
        title: 'Forever Fields Of Greens',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZPS3wvuIljzgrmguZYJz8V1OrQIHMmGF6yy-PxAU_qZ3ImO7e2kvWr6zf0Ihd1vPI114&usqp=CAU',
        description: 'Pack in the nutrition of barley grass, wheat grass, alfalfa and other important greens with Forever Fields of Greens®! Not only is this supplement an easy source of green nutrition, it also contains beneficial phytonutrients and antioxidants.',
        price: '15',
        department: {id: 'weight', title: 'Slimming and weight control'},
        groups: [
                    {id: 'g1', title: 'Forever belly slimming group'},
                ],
        date: '01-10-2021',
        rate: '4',
        salesCount: '750'
    },
    {
        id: 'p5',
        title: 'Forever Lite Ultra',
        image: 'https://www.aloevera-bienetre-beaute.fr/_media/img/small/forever-lite-ultra-2-2.jpg',
        description: 'Shake up your diet and lifestyle with naturally-flavoured, plant-powered protein. Forever Lite Ultra contains vital vitamins and minerals and is available in chocolate or vanilla.',
        price: '15',
        department: {id: 'weight', title: 'Slimming and weight control'},
        groups: [
                    {id: 'g3', title: 'Fit 1 group'},
                ],
        date: '05-12-2023',
        rate: '4',
        salesCount: '1000'
    },
    {
        id: 'p6',
        title: 'Forever Fiber',
        //image: 'https://cdn.foreverliving.com/content/products/images/forever_fiber__pd_main_512_X_512_1680691916090.jpg',
        image: 'https://forever-gulf.com/wp-content/uploads/2019/09/fiber.jpg',
        //https://arabforever.com/wp-content/uploads/2019/10/forever-fiber.jpg
        //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvg6NMkxWuLEDhyIAdxKpHHJXX6NoJV6QFQlHtyhkLt6_wiIRlUzEvwy5WSKULvOkKRPs&usqp=CAU
        description: 'Get your fiber on the go with Forever Fiber®. These packets feature four types of fiber – including fructooligosaccharides, which is also a prebiotic. Pack in an extra five grams of fiber with each serving of this easy-dissolving formula.',
        price: '10',
        department: {id: 'weight', title: 'Slimming and weight control'},
        groups: [
                    {id: 'g3', title: 'Fit 1 group'},
                ],
        date: '04-01-2023',
        rate: '3',
        salesCount: '800'
    },
    {
        id: 'p7',
        title: 'Forever Garcinia Plus',
        image: 'https://pictures-ghana.jijistatic.com/26200610_NjIwLTc3Mi04MzU4ZTc1NzMx.webp',
        //image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj2VUiUoPyB4ibc8lDRRS8tFE0sSK3zKtBEzbqwFPbx2HwZEn-pTWqJHzGXOR2Ts8fN3A&usqp=CAU',
        description: 'Forever Garcinia Plus promotes the regulation of appetite and blocks the transformation of sugars into fats, it also contains chromium which helps stabilize and normalize the levels of sugars and insulin in the blood.',
        price: '12',
        department: {id: 'weight', title: 'Slimming and weight control'},
        groups: [
                    {id: 'g2', title: 'The mini slimming group'},
                ],
        date: '08-09-2022',
        rate: '4',
        salesCount: '1200'
    },
    {
        id: 'p8',
        title: 'Forever Aloe Blossom Herbal Tea',
        image: 'https://i.pinimg.com/564x/cc/74/b7/cc74b72afafb643e3a1ed6e432fc4acd.jpg',
        description: 'The Aloe Blossom Herbal Tea® is a tea with aloe vera, without calories, without fat! A soothing and refreshing decaffeinated herbal tea, which will help you relax and unwind. Naturally low in calories. Can either be served as a hot beverage or as a cold, refreshing drink on ice. Every pack contains 25 individually foil-wrapped tea pieces.',
        price: '8',
        department: {id: 'supplement', title: 'Dietary Supplement'},
        groups: [
                    {id: 'g3', title: 'Fit 1 group'},
                ],
        date: '05-20-2022',
        rate: '3',
        salesCount: '550'
    },
]

export default DUMMY_PRODUCTS;



