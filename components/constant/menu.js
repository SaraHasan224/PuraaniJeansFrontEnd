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
         { path: '/shop/right_sidebar', title: 'Body Shop', type: 'link' },
         { path: '/shop/no_sidebar', title: 'Tiam', type: 'link', },
         { path: '/shop/sidebar_popup', title: 'Yuja Niacin', type: 'link' },
         { path: '/shop/metro', title: 'Garnier', type: 'link', tag: 'new' },
         { path: '/shop/full_width', title: 'Bioderma', type: 'link', tag: 'new' },
         { path: '/shop/three_grid', title: 'Dr Rashel', type: 'link' },
         { path: '/shop/six_grid', title: 'Hira Ali Beauty', type: 'link' },
         { path: '/shop/list_view', title: 'Loreal Professional', type: 'link' }
      ],
   },
   {
      title: 'Brands', megaMenu: true, megaMenuType: 'small', type: 'sub', children: [
         {
            title: 'Men', type: 'sub', children: [
               { path: '/portfolio/grid-2', title: 'Portfolio Grid 2', type: 'link', icon: 'alert' },
               { path: '/portfolio/masonry-full-width', title: 'masonry Full Width', type: 'link', icon: 'map-alt' },
            ]
         },
         {
            title: 'Women', type: 'sub', children: [
               { path: '/layouts/Nursery', title: 'Cart Modal Popup', type: 'link', icon: 'list' },
               { path: '/layouts/Watch', title: 'Cart Left', type: 'link', icon: 'alarm-clock' },
               { path: '/layouts/Tools', title: 'Cart Right', type: 'link', icon: 'alarm-clock' }
            ]
         },
         {
            title: 'Kids', type: 'sub', children: [
               { path: '/portfolio/title', title: 'Title', type: 'link', icon: 'bar-chart' },
            ]
         },
         {
            title: 'Accessories', type: 'sub', children: [
               { path: '/portfolio/product-box', title: 'Product Box', type: 'link', icon: 'bar-chart' },
               { path: '/portfolio/product-slider', title: 'Product Slider', type: 'link', icon: 'thought' },
               { path: '/portfolio/no-slider', title: 'No Slider', type: 'link', icon: 'video-camera' },
               { path: '/portfolio/multi-slider', title: 'Multi Slider', type: 'link', icon: 'headphone' },
               { path: '/portfolio/tab', title: 'Tab', type: 'link', icon: 'headphone' }
            ]
         },
         {
            title: 'FootWear', type: 'sub', children: [
               { path: '/portfolio/order-success', title: 'Order Success', type: 'link', icon: 'bar-chart' },
               { path: '/portfolio/order-success-2', title: 'Order Success 2', type: 'link', icon: 'thought' },
               { path: '/portfolio/email-template', title: 'Email Template', type: 'link', icon: 'headphone' },
               { path: '/portfolio/email-template-2', title: 'Email Template 2', type: 'link', icon: 'headphone' }
            ]
         }
      ]
   },
   {
      title: 'More', type: 'sub', children: false, megaMenu: false, path: `shop?category=more&fashion&brand=&color=&size=&minPrice=&maxPrice=`
   },
]

