import HeroClient from './HeroClient';
import { fetchBannerProducts } from '@/lib/api/server/bannerProducts';

export default async function Hero() {
    const bannerData = await fetchBannerProducts();
    return <HeroClient bannerData={bannerData ?? undefined} />;
}
