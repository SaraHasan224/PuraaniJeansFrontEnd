
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
   ERROR_TYPE: {
      TOAST: "TOAST",
      ALERT: "ALERT"
   },
   PRODUCT_ADDED: {
      PHOTO_AND_DESCRIPTION: "photo_and_description",
      ITEM_INFORMATION: "item_information",
      SHIPMENT_AND_LOCATION: "shipment_and_location",
      VARIANTS: "product_variants",
   },
	CKEDITOR_CONFIG: {
      fontFamily: {
        options: [
          'default',
          'Ubuntu, Arial, sans-serif',
          'Ubuntu Mono, Courier New, Courier, monospace'
        ]
      },
      toolbar: [ 
          'alignment',
          '|', 'heading',
          '|', 'fontsize', 'fontColor', 'fontBackgroundColor',
          '|', 'bold', 'italic', 'Underline', 'strikethrough', 'subscript', 'superscript', 'code', 'blockQuote', 'codeBlock',
          '|', 'link',
          '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
          'insertTable',
          '|',
          'undo', 'redo',
      ]
  }
}
export const MENUITEMS = [
   {
      title: 'Men', type: 'sub', children: false, megaMenu: false, path: `/shop?slug=men&brand=&color=&size=&minPrice=&maxPrice=`
   },
   {
      title: 'Women', type: 'sub', children: false, megaMenu: false, path: `/shop?slug=Women&brand=&color=&size=&minPrice=&maxPrice=` 
   },
   {
      title: 'Jewellery', type: 'sub', children: false, megaMenu: false,  path: `/shop?slug=Jewellery&brand=&color=&size=&minPrice=&maxPrice=`
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
               { path: '/shop?slug=PortfolioGrid2&brand=&color=&size=&minPrice=&maxPrice=', title: 'Portfolio Grid 2', type: 'link', icon: 'alert' },
               { path: '/shop?slug=masonryFullWidth&brand=&color=&size=&minPrice=&maxPrice=', title: 'masonry Full Width', type: 'link', icon: 'map-alt' },
            ]
         },
         {
            title: 'Women', type: 'sub', children: [
               { path: '/shop?slug=CartModalPopup&brand=&color=&size=&minPrice=&maxPrice=', title: 'Cart Modal Popup', type: 'link', icon: 'list' },
               { path: '/shop?slug=CartLeft&brand=&color=&size=&minPrice=&maxPrice=', title: 'Cart Left', type: 'link', icon: 'alarm-clock' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Cart Right', type: 'link', icon: 'alarm-clock' }
            ]
         },
         {
            title: 'Kids', type: 'sub', children: [
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Title', type: 'link', icon: 'bar-chart' },
            ]
         },
         {
            title: 'Accessories', type: 'sub', children: [
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Product Box', type: 'link', icon: 'bar-chart' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Product Slider', type: 'link', icon: 'thought' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'No Slider', type: 'link', icon: 'video-camera' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Multi Slider', type: 'link', icon: 'headphone' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Tab', type: 'link', icon: 'headphone' }
            ]
         },
         {
            title: 'FootWear', type: 'sub', children: [
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Order Success', type: 'link', icon: 'bar-chart' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Order Success 2', type: 'link', icon: 'thought' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Email Template', type: 'link', icon: 'headphone' },
               { path: '/shop?slug=CartRight&brand=&color=&size=&minPrice=&maxPrice=', title: 'Email Template 2', type: 'link', icon: 'headphone' }
            ]
         }
      ]
   },
   {
      title: 'More', type: 'sub', children: false, megaMenu: false, path: `/shop?slug=more&fashion&brand=&color=&size=&minPrice=&maxPrice=`
   },
]
