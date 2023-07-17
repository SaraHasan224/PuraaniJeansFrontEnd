
export const CONSTANTS = {
	YES: 1,
	NO: 0,
	HTTP_RESPONSE: {
		SUCCESS: 200,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		INPROCESSIBLE: 422,
		SERVER_ERROR: 500,
	},
}
export const MENUITEMS = [
   {
      title: 'Men', type: 'sub', children: false, megaMenu: false, path: `/shop?category=men&brand=&color=&size=&minPrice=&maxPrice=`
   },
   {
      title: 'Women', type: 'sub', children: false, megaMenu: false, path: `/shop?category=Women&brand=&color=&size=&minPrice=&maxPrice=` 
   },
   {
      title: 'Jewellery', type: 'sub', children: false, megaMenu: false,  path: `/shop?category=Jewellery&brand=&color=&size=&minPrice=&maxPrice=`
   },
   {
      title: 'Beauty', type: 'sub', children: [
         { path: '/shop', title: 'The Ordinary', type: 'link' },
         { path: '/shop', title: 'Body Shop', type: 'link' },
         { path: '/shop', title: 'Tiam', type: 'link', },
         { path: '/shop', title: 'Yuja Niacin', type: 'link' },
         { path: '/shop', title: 'Garnier', type: 'link', tag: 'new' },
         { path: '/shop', title: 'Bioderma', type: 'link', tag: 'new' },
         { path: '/shop', title: 'Dr Rashel', type: 'link' },
         { path: '/shop', title: 'Hira Ali Beauty', type: 'link' },
         { path: '/shop', title: 'Loreal Professional', type: 'link' }
      ],
   },
   {
      title: 'Brands', megaMenu: true, megaMenuType: 'small', type: 'sub', children: [
         {
            title: 'Men', type: 'sub', children: [
               { path: '/shop?category=PortfolioGrid2&brand=&color=&size=&minPrice=&maxPrice=', title: 'Portfolio Grid 2', type: 'link', icon: 'alert' },
               { path: '/shop?category=masonryFullWidth&brand=&color=&size=&minPrice=&maxPrice=', title: 'masonry Full Width', type: 'link', icon: 'map-alt' },
            ]
         },
         {
            title: 'Women', type: 'sub', children: [
               { path: '/shop?category=CartModalPopup&brand=&color=&size=&minPrice=&maxPrice=', title: 'Cart Modal Popup', type: 'link', icon: 'list' },
               { path: '/shop?category=CartLeft&brand=&color=&size=&minPrice=&maxPrice=', title: 'Cart Left', type: 'link', icon: 'alarm-clock' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Cart Right', type: 'link', icon: 'alarm-clock' }
            ]
         },
         {
            title: 'Kids', type: 'sub', children: [
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Title', type: 'link', icon: 'bar-chart' },
            ]
         },
         {
            title: 'Accessories', type: 'sub', children: [
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Product Box', type: 'link', icon: 'bar-chart' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Product Slider', type: 'link', icon: 'thought' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'No Slider', type: 'link', icon: 'video-camera' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Multi Slider', type: 'link', icon: 'headphone' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Tab', type: 'link', icon: 'headphone' }
            ]
         },
         {
            title: 'FootWear', type: 'sub', children: [
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Order Success', type: 'link', icon: 'bar-chart' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Order Success 2', type: 'link', icon: 'thought' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Email Template', type: 'link', icon: 'headphone' },
               { path: '/shop?category=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Email Template 2', type: 'link', icon: 'headphone' }
            ]
         }
      ]
   },
   {
      title: 'More', type: 'sub', children: false, megaMenu: false, path: `/shop?category=more&fashion&brand=&color=&size=&minPrice=&maxPrice=`
   },
]
