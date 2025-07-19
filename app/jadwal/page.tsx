// app/jadwal/page.tsx
import { getScheduleData } from '@/lib/services/ScheduleService'; // Sesuaikan path
import ScheduleTabs from '@/components/jadwal/ScheduleTabs'; // Komponen baru yang akan kita buat
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Jadwal Rilis Anime',
  description: 'Jadwal rilis anime terbaru setiap harinya.',
};

export default async function SchedulePage() {
  try {
    const scheduleData = await getScheduleData();

    if (!scheduleData || scheduleData.days.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold">Jadwal Tidak Ditemukan</h1>
        </div>
      );
    }
    
    return (
      <main className="min-h-screen py-6 px-2 md:px-4">
        <Breadcrumb  />
        <div className=" items-center text-center-between mb-2 bg-white/5 dark:bg-black/40 border border-white/10 dark:border-white/20 rounded-xl  md:p-6 backdrop-blur-xl shadow-lg">
           <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 dark:text-white sm:text-4xl">
             Jadwal
           </h1>
        </div>
        
        {/* Melempar data ke komponen client yang handle tab */}
        <ScheduleTabs scheduleData={scheduleData} />
      </main>
    );

  } catch (error) {
    console.error(error);
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Gagal Memuat Jadwal</h1>
      </div>
    );
  }
}