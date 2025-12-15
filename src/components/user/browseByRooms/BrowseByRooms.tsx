import { RoomCategory } from '@/types/types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import img1 from '@/assets/user/img/bed.jpeg'
import img2 from '@/assets/user/img/images (2).jpeg'
import img3 from '@/assets/user/img/decore.jpeg'
import img4 from '@/assets/user/img/download.jpeg'

export default function BrowseByRooms() {
  const { t } = useTranslation();
  const rooms: RoomCategory[] = [
    {
      name: t('home.browseByRooms.bedroom'),
      products: 24,
      image: img1,
      link: '/product-category/bedroom'
    },
    {
      name: t('home.browseByRooms.livingRoom'),
      products: 15,
      image: img2,
      link: '/product-category/living-room'
    },
    {
      name: t('home.browseByRooms.walkInCloset'),
      products: 30,
      image: img3,
      link: '/product-category/storage'
    },
    {
      name: t('home.browseByRooms.kitchen'),
      products: 24,
      image: img4,
      link: '/product-category/kitchen'
    }
  ];

  return (
    <section className="isolate_bars paddingtop paddingbottom">
      <div className="bg-linear-to-br from-deep_walnut to-dark_wood rounded-3xl overflow-hidden p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between">
            <div className="mb-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('home.browseByRooms.title')}
              </h2>
              <p className="text-primary1 font-base leading-relaxed max-w-md">
                {t('home.browseByRooms.description')}
              </p>
            </div>

            <Link 
              to={rooms[0].link}
              className="group relative rounded-2xl overflow-hidden  block"
            >
              <img 
                src={rooms[0].image}
                alt={rooms[0].name}
                className="w-full h-120 object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=Living+Room';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{rooms[0].name}</h3>
                <p className="text-base text-primary1">{rooms[0].products} {t('home.browseByRooms.products')}</p>
              </div>
            </Link>
          </div>

          {/* Right Section - Grid of 3 Rooms */}
          <div className="grid grid-rows-2 gap-6">
            {/* Top - Bedroom (Full Width) */}
            <Link 
              to={rooms[1].link}
              className="group relative rounded-2xl overflow-hidden  block"
            >
              <img 
                src={rooms[1].image}
                alt={rooms[1].name}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=Bedroom';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{rooms[1].name}</h3>
                <p className="text-base text-primary1">{rooms[1].products} products</p>
              </div>
            </Link>

            <div className="grid grid-cols-2 gap-6">
              <Link 
                to={rooms[2].link}
                className="group relative rounded-2xl overflow-hidden  block"
              >
                <img 
                  src={rooms[2].image}
                  alt={rooms[2].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Closet';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{rooms[2].name}</h3>
                  <p className="text-base text-primary1">{rooms[2].products} products</p>
                </div>
              </Link>

              <Link 
                to={rooms[3].link}
                className="group relative rounded-2xl overflow-hidden  block"
              >
                <img 
                  src={rooms[3].image}
                  alt={rooms[3].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Kitchen';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{rooms[3].name}</h3>
                  <p className="text-base text-primary1">{rooms[3].products} products</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
