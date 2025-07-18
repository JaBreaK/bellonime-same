'use client';

import { useState, useMemo, Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'; // Impor motion
import { motion } from 'framer-motion';
import type { Episode, ServerInfo } from '@/types/anime';
import { ChevronDown, Clapperboard } from 'lucide-react';
import { getServerUrl } from '@/lib/services';

export default function EpisodePlayerSection({ episode }: { episode: Episode }) {
  // ... (kode useMemo untuk serversByName tetap sama) ...
  const serversByName = useMemo(() => {
    const grouped: Record<string, (ServerInfo & { quality: string })[]> = {};
    episode.server.qualities.forEach(quality => {
      quality.serverList.forEach(server => {
        const serverName = server.title.replace(` ${quality.title}`, '').trim();
        if (!grouped[serverName]) {
          grouped[serverName] = [];
        }
        grouped[serverName].push({ ...server, quality: quality.title });
      });
    });
    return grouped;
  }, [episode.server.qualities]);


  const [activeServer, setActiveServer] = useState<ServerInfo | null>(null);
  const [activeStreamUrl, setActiveStreamUrl] = useState(episode.defaultStreamingUrl);
  const [isLoading, setIsLoading] = useState(false);

  // --- LOGIKA BARU UNTUK VISIBILITAS MENU ---
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cek ukuran layar saat komponen dimuat
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Timer untuk menyembunyikan menu setelah 5 detik di desktop
    const timer = setTimeout(() => {
      if (window.innerWidth >= 768) { // Cek lagi untuk memastikan ini desktop
        setIsMenuVisible(false);
      }
    }, 5000);

    // Membersihkan event listener dan timer
    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timer);
    };
  }, []);
  // -----------------------------------------

  const handleServerChange = async (server: ServerInfo) => {
    setIsLoading(true);
    try {
      const newUrl = await getServerUrl(server.serverId);
      setActiveStreamUrl(newUrl);
      setActiveServer(server);
    } catch (error) {
      console.error('Gagal ganti server:', error);
      alert('Gagal mengganti server. Coba server lain.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className="aspect-video w-full bg-black rounded-lg shadow-lg relative"
      // Munculkan menu saat mouse masuk (hanya di desktop)
      onMouseEnter={() => !isMobile && setIsMenuVisible(true)}
      // Sembunyikan menu saat mouse keluar (hanya di desktop)
      onMouseLeave={() => !isMobile && setIsMenuVisible(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
          <div className="text-white">Mengganti server...</div>
        </div>
      )}
      <iframe
        key={activeStreamUrl}
        src={activeStreamUrl}
        allowFullScreen
        className="w-full h-full rounded-lg absolute inset-0 z-0"
      ></iframe>
      
      {/* Kontrol Server yang Melayang dengan Animasi */}
      <motion.div
        className="absolute top-0 right-0 p-4 z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isMenuVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center gap-2 w-full justify-center rounded-md bg-black/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-black/70">
              <Clapperboard size={16} />
              <span>{activeServer?.title || 'Pilih Server'}</span>
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 max-h-60 overflow-y-auto origin-top-right divide-y divide-gray-700 rounded-md bg-gray-900/90 backdrop-blur-sm shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1">
                {Object.entries(serversByName).map(([serverName, qualities]) => (
                  <div key={serverName} className="px-2 py-2">
                    <span className="text-xs font-bold text-gray-400 uppercase">{serverName}</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {qualities.map(server => (
                        <Menu.Item key={server.serverId}>
                          <button
                            onClick={() => handleServerChange(server)}
                            className="w-full text-left px-2 py-1.5 text-sm text-gray-300 hover:bg-pink-500 hover:text-white rounded-md transition-colors"
                          >
                            {server.quality}
                          </button>
                        </Menu.Item>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </motion.div>
    </section>
  );
}