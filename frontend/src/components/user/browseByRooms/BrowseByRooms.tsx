import { Link } from 'react-router-dom';

interface RoomCategory {
  name: string;
  products: number;
  image: string;
  link: string;
}

export default function BrowseByRooms() {
  const rooms: RoomCategory[] = [
    {
      name: 'Bedroom',
      products: 24,
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      link: '/product-category/bedroom'
    },
    {
      name: 'Living Room',
      products: 15,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      link: '/product-category/living-room'
    },
    {
      name: 'Walk-in Closet',
      products: 30,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      link: '/product-category/storage'
    },
    {
      name: 'Kitchen',
      products: 24,
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
      link: '/product-category/kitchen'
    }
  ];

  return (
    <section className="container px-4 mx-auto">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - Main Featured Room */}
          <div className="flex flex-col justify-between">
            <div className="mb-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Browse by rooms
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Sit massa etiam urna id. Non pulvinar senean ultrices lectus vitae imperdiet 
                vulputate a eu. Aliquet ullamcorper leo mi vel sit pretium euismod eget.
              </p>
            </div>

            <Link 
              to={rooms[0].link}
              className="group relative rounded-2xl overflow-hidden bg-slate-700 block"
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
                <p className="text-sm text-slate-200">{rooms[0].products} products</p>
              </div>
            </Link>
          </div>

          {/* Right Section - Grid of 3 Rooms */}
          <div className="grid grid-rows-2 gap-6">
            {/* Top - Bedroom (Full Width) */}
            <Link 
              to={rooms[1].link}
              className="group relative rounded-2xl overflow-hidden bg-slate-700 block"
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
                <p className="text-sm text-slate-200">{rooms[1].products} products</p>
              </div>
            </Link>

            {/* Bottom - Two Equal Columns */}
            <div className="grid grid-cols-2 gap-6">
              {/* Walk-in Closet */}
              <Link 
                to={rooms[2].link}
                className="group relative rounded-2xl overflow-hidden bg-slate-700 block"
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
                  <p className="text-xs text-slate-200">{rooms[2].products} products</p>
                </div>
              </Link>

              {/* Kitchen */}
              <Link 
                to={rooms[3].link}
                className="group relative rounded-2xl overflow-hidden bg-slate-700 block"
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
                  <p className="text-xs text-slate-200">{rooms[3].products} products</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
