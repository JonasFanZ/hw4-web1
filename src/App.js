import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icons (無依賴版) ---
const Icons = {
  Github: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Camera: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  Code2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4z"/></svg>
  ),
  Tv: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
  ),
  Gamepad2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  GitBranch: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
};

// --- FadeIn Animation ---
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`
  };

  return <div ref={domRef} style={style} className={className}>{children}</div>;
};

// --- 資料設定 ---
const content = {
  name: "Jonas Fan",
  chineseName: "范子昊",
  tagline: "用熱情與創意打造獨一無二的自己",
  bio: "我是范子昊(Jonas Fan)，就讀國立台灣師範大學，科技應用與人力資源發展學系二年級的學生，目前也正在雙主修資訊工程學系，平常的愛好是打電動與看動畫，攝影與扯鈴也略知一二。",
  email: "matcha20150203@gmail.com",
  githubUsername: "jonasfanz", 
  github: "https://github.com/jonasfanz", 
  linkedin: "https://www.linkedin.com/in/jonasfan/", 
  instagram: "https://www.instagram.com/xcltrnlyz.02.03/",   
};

// --- 圖片路徑 ---
const images = {
  avatar: "/images/avatar.jpg", 
  interests: [
    { id: 1, title: "校內程式設計競賽", desc: "2025/03/21《一輩子地牢》資訊技術特優獎", img: "/images/pic01.jpg", icon: <Icons.Code2 /> },
    { id: 2, title: "海山海盜大眾傳播社成果發表", desc: "2023/05/14《盜轉》", img: "/images/pic03.jpg", icon: <Icons.Camera /> },
    { id: 3, title: "師大扯鈴社", desc: "2025/08/28社團博覽會扯鈴表演", img: "/images/pic02.jpg", icon: <Icons.Zap /> },
  ]
};

// --- GitHub 數據區塊 ---
const GithubSection = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${content.githubUsername}`)
      .then(res => {
        if (!res.ok) throw new Error("GitHub User Not Found");
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("GitHub API Error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
           <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-stone-200/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-100/50 transition-colors duration-700"></div>
             <div className="flex flex-col items-center md:items-start gap-4 z-10 min-w-[180px]">
               <div className="relative">
                 <img src={profile.avatar_url} alt={profile.login} className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                 <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Available for hire"></div>
               </div>
               <div className="text-center md:text-left">
                 <h3 className="text-xl font-bold text-stone-800 font-serif">{profile.name || profile.login}</h3>
                 <p className="text-stone-500 text-sm mb-2">@{profile.login}</p>
                 {profile.location && (
                   <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-stone-400">
                     <Icons.MapPin /><span>{profile.location}</span>
                   </div>
                 )}
               </div>
             </div>
             <div className="flex-1 z-10 text-center md:text-left">
               <div className="flex items-center justify-center md:justify-between mb-4">
                  <div className="flex items-center gap-2 text-stone-600 font-bold uppercase tracking-wider text-xs">
                    <Icons.Code2 /><span>Developer Stats</span>
                  </div>
                  <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1 rounded-full transition-colors">
                    View Profile <Icons.Github />
                  </a>
               </div>
               <p className="text-stone-600 mb-6 text-sm leading-relaxed max-w-lg mx-auto md:mx-0">{profile.bio || "Programming enthusiast and full-stack developer in training."}</p>
               <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-6">
                 <div className="text-center md:text-left">
                   <div className="text-2xl font-bold text-stone-800">{profile.public_repos}</div>
                   <div className="text-xs text-stone-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1"><Icons.GitBranch /> Repos</div>
                 </div>
                 <div className="text-center md:text-left border-l border-stone-200 pl-4 md:border-none md:pl-0">
                   <div className="text-2xl font-bold text-stone-800">{profile.followers}</div>
                   <div className="text-xs text-stone-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1"><Icons.Users /> Followers</div>
                 </div>
                 <div className="text-center md:text-left border-l border-stone-200 pl-4 md:border-none md:pl-0">
                   <div className="text-2xl font-bold text-stone-800">{profile.following}</div>
                   <div className="text-xs text-stone-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1"><Icons.Users /> Following</div>
                 </div>
               </div>
               <div className="mt-6 md:hidden">
                 <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center text-sm font-bold text-white bg-stone-800 hover:bg-stone-700 px-4 py-3 rounded-lg transition-colors">Visit GitHub Profile</a>
               </div>
             </div>
           </div>
        </FadeIn>
      </div>
    </section>
  );
};

// --- 遊戲區塊元件 (API 2 - RAWG) - 支援環境變數 ---
const GameSection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null); 

  // 👇 修改處：嘗試從環境變數讀取，若沒有則使用備用字串 (開發用)
  // React 規定自定義環境變數必須以 REACT_APP_ 開頭
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  const customGameImages = {
    'genshin-impact': 'https://cdn2.unrealengine.com/cht-egs-genshin-impact-6-2-breaker-1920x1080-a30059976d54.jpg?resize=1&w=854&h=480&quality=medium',       // 例如: 'https://images.alphacoders.com/112/1126211.jpg'
    'wuthering-waves': 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3513350/f3f38da2c60cece7bed24ded42695da88463724b/capsule_616x353.jpg?t=1763596285',      // 例如: '/images/ww-cover.jpg'
    'honkai-star-rail': 'https://fastcdn.hoyoverse.com/mi18n/hkrpg_global/m20251011hy1e0kf400/upload/2478e93092feb0dfc22256b26d123bfb_8641399746462482490.png',    
    'zenless-zone-zero': 'https://cdn1.epicgames.com/spt-assets/dcd83ace86fb4501bde1316ca03e29ad/zenless-zone-zero-czvdx.jpg',  
    
  };

  useEffect(() => {
    const gameSlugs = ['genshin-impact', 'wuthering-waves', 'honkai-star-rail', 'zenless-zone-zero'];
    
    const fetchGames = async () => {
      // 檢查是否取得 Key
      if (!apiKey) {
        setLoading(false);
        setErrorMsg("API Key 未設定 (請設定 REACT_APP_RAWG_API_KEY)");
        return;
      }

      try {
        const gameData = await Promise.all(
          gameSlugs.map(async (slug) => {
            const res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`);
            if (!res.ok) {
              console.error(`RAWG API Error [${slug}]: Status ${res.status}`);
              if (res.status === 401) setErrorMsg("API Key 無效 (401 Unauthorized)");
              if (res.status === 404) console.error(`找不到遊戲: ${slug}`);
              return null;
            }
            return res.json();
          })
        );
        const validGames = gameData.filter(g => g !== null);
        setGames(validGames);
        
        if (validGames.length === 0 && !errorMsg) {
            setErrorMsg("找不到任何遊戲資料 (請檢查 Key 或網路)");
        }
        setLoading(false);

      } catch (error) {
        console.error("RAWG API Error:", error);
        setErrorMsg(`連線錯誤: ${error.message}`);
        setLoading(false);
      }
    };

    fetchGames();
  }, [apiKey]);

  if (!apiKey) {
    return (
      <section className="py-12 bg-stone-50 text-center border-t border-stone-200">
        <div className="inline-block p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
           <h3 className="text-yellow-700 font-bold mb-2">⚠️ 尚未設定 API Key</h3>
           <p className="text-stone-600 text-sm mb-2">為了安全起見，請勿將 Key 直接寫在程式碼中。</p>
           <ul className="text-left text-xs text-stone-500 list-disc list-inside space-y-1">
             <li><strong>本地開發：</strong>請在專案根目錄建立 <code>.env</code> 檔案，並填入 <code>REACT_APP_RAWG_API_KEY=您的Key</code>。</li>
             <li><strong>雲端部署 (Vercel/Render)：</strong>請在後台的 Environment Variables 設定該變數。</li>
           </ul>
        </div>
      </section>
    );
  }

  if (loading) return <div className="py-24 text-center text-stone-400">Loading Games...</div>;

  return (
    <section id="games" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <div>
            <span className="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-2 block flex items-center gap-2">
              <Icons.Gamepad2 /> Gaming Rotation
            </span>
            <h2 className="text-3xl font-bold text-stone-900 font-serif">Now Playing</h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-stone-400 text-sm font-serif italic">
              Powered by RAWG API
            </p>
          </div>
        </div>
        
        {errorMsg && games.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-red-100">
                <p className="text-red-500 font-bold mb-2">無法載入遊戲</p>
                <p className="text-stone-500 text-sm">{errorMsg}</p>
                <p className="text-stone-400 text-xs mt-2">請按 F12 打開 Console 查看詳細錯誤</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game, index) => {
                const displayImage = customGameImages[game.slug] || game.background_image;

                return (
                  <FadeIn key={game.id} delay={index * 0.1}>
                    <a href={`https://rawg.io/games/${game.slug}`} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="relative overflow-hidden rounded-xl aspect-video mb-4 shadow-lg bg-stone-800">
                        <img 
                          src={displayImage} 
                          alt={game.name} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur border border-white/20 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                          <Icons.Star /> {game.rating}
                        </div>
                        
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-300 transition-colors drop-shadow-md">
                            {game.name}
                          </h3>
                        </div>
                      </div>
                    </a>
                  </FadeIn>
                );
              })}
            </div>
        )}
      </div>
    </section>
  );
};

// --- 動畫區塊元件 (API 3 - Jikan) ---
const AnimeSection = () => {
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seasonRes = await fetch('https://api.jikan.moe/v4/seasons/now?filter=tv&limit=3');
        const seasonData = await seasonRes.json();
        setSeasonalAnime(seasonData.data || []);

        const myFavIds = [16498, 2581, 1575];
        const favs = [];
        for (const id of myFavIds) {
          await new Promise(r => setTimeout(r, 400)); 
          const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
          const data = await res.json();
          if (data.data) favs.push(data.data);
        }
        setTopAnime(favs);
        setLoading(false);

      } catch (error) {
        console.error("API Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null; 

  const AnimeCard = ({ anime, label }) => (
    <a href={anime.url} target="_blank" rel="noopener noreferrer" className="block group relative">
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-4 shadow-md bg-stone-200">
        <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold text-stone-800 rounded shadow-sm flex items-center gap-1">
          <span className="text-yellow-500"><Icons.Star /></span>{anime.score}
        </div>
        {label && <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur px-2 py-1 text-xs font-bold text-white rounded shadow-sm">{label}</div>}
      </div>
      <h3 className="text-lg font-bold text-stone-800 group-hover:text-orange-600 transition-colors line-clamp-1">{anime.title_japanese || anime.title}</h3>
      <p className="text-sm text-stone-500 line-clamp-1">{anime.genres.map(g => g.name).join(', ')}</p>
    </a>
  );

  return (
    <section id="anime" className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16">
          <div>
            <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-2 block flex items-center gap-2">
              <Icons.Tv /> API Integration
            </span>
            <h2 className="text-3xl font-bold text-stone-900 font-serif">Anime Collection</h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-stone-400 text-sm font-serif italic">Powered by Jikan API (MyAnimeList)</p>
          </div>
        </div>
        <div className="mb-16">
          <h3 className="text-xl font-bold text-stone-700 mb-6 flex items-center gap-2 border-l-4 border-orange-400 pl-3">Current Season Highlights (本季熱門)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {seasonalAnime.map((anime, index) => (
              <FadeIn key={anime.mal_id} delay={index * 0.1}><AnimeCard anime={anime} label="Now Airing" /></FadeIn>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-stone-700 mb-6 flex items-center gap-2 border-l-4 border-stone-800 pl-3">Jonas's Hall of Fame (我的神作 TOP 3)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {topAnime.map((anime, index) => (
              <FadeIn key={anime.mal_id} delay={0.3 + (index * 0.1)}><AnimeCard anime={anime} label="All Time Fav" /></FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Components ---
const Navbar = () => (
  <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-stone-100">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="text-xl font-bold tracking-tight text-stone-800 font-serif">
        {content.name} <span className="text-stone-400 font-normal font-sans text-base">| Portfolio</span>
      </div>
      <div className="hidden md:flex gap-6 text-sm font-medium text-stone-500">
        <a href="#about" className="hover:text-stone-900 transition-colors">關於我</a>
        <a href="#games" className="hover:text-stone-900 transition-colors text-indigo-600">遊戲</a>
        <a href="#anime" className="hover:text-stone-900 transition-colors text-orange-600">動畫</a>
        <a href="#contact" className="hover:text-stone-900 transition-colors">聯絡方式</a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex flex-col items-center justify-center bg-stone-50 overflow-hidden">
      <div className="absolute top-10 left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-6 tracking-wide">{content.name}</h1>
          <p className="text-xl md:text-2xl text-stone-500 font-light tracking-widest uppercase mb-8">{content.chineseName}</p>
          <div className="w-16 h-1 bg-stone-900 mx-auto mb-8"></div>
        </FadeIn>
      </div>
    </section>
  );
};

const AboutMe = () => {
  return (
    <section id="about" className="pt-24 pb-8 bg-white relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <FadeIn className="w-full md:w-5/12 relative">
            <div className="bg-white p-4 shadow-xl shadow-stone-200 rotate-2 transform transition-transform hover:rotate-0 duration-500 border border-stone-100">
              <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                <img src={images.avatar} alt={content.name} className="w-full h-full object-cover" />
              </div>
              <div className="pt-4 text-center font-serif text-stone-400 text-sm italic">Jonas Fan / 2024</div>
            </div>
          </FadeIn>
          <div className="w-full md:w-7/12">
            <FadeIn delay={0.2} className="mb-6">
              <span className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-2 block">Profile</span>
              <h2 className="text-4xl font-bold text-stone-900 font-serif mb-2">About Me</h2>
              <h3 className="text-xl text-stone-500 italic font-serif font-medium">{content.tagline}</h3>
            </FadeIn>
            <FadeIn delay={0.4} className="prose prose-stone prose-lg text-stone-600 leading-loose">
              <p>{content.bio}</p>
            </FadeIn>
            <FadeIn delay={0.6} className="mt-8 flex flex-wrap gap-3">
              {["#NTNU", "#TAHRD", "#CSIE", "#Photography"].map(tag => (
                <span key={tag} className="px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm">{tag}</span>
              ))}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const InterestsGallery = () => {
  return (
    <section id="interests" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-stone-900 font-serif mb-4">Interests & Life</h2>
          <div className="w-24 h-[1px] bg-stone-300 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.interests.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.1} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4 shadow-md bg-white">
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors z-10"></div>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-stone-400 group-hover:text-orange-500 transition-colors">{item.icon}</div>
                <h3 className="text-xl font-bold text-stone-800 group-hover:text-stone-600 transition-colors">{item.title}</h3>
              </div>
              <p className="text-stone-500 text-sm">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${content.email}`;
  return (
    <footer id="contact" className="bg-white border-t border-stone-100 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-serif text-stone-900 mb-8">Let's Connect</h2>
        <div className="flex justify-center flex-wrap gap-8 mb-12">
          <a href={content.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group text-stone-400 hover:text-stone-900 transition-colors">
            <div className="p-4 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors"><Icons.Github /></div>
            <span className="text-xs uppercase tracking-widest">Github</span>
          </a>
          <a href={content.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group text-stone-400 hover:text-stone-900 transition-colors">
            <div className="p-4 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors"><Icons.Linkedin /></div>
            <span className="text-xs uppercase tracking-widest">LinkedIn</span>
          </a>
          <a href={gmailLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group text-stone-400 hover:text-stone-900 transition-colors">
            <div className="p-4 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors"><Icons.Mail /></div>
            <span className="text-xs uppercase tracking-widest">Gmail</span>
          </a>
          <a href={content.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group text-stone-400 hover:text-stone-900 transition-colors">
            <div className="p-4 rounded-full bg-stone-50 group-hover:bg-stone-100 transition-colors"><Icons.Instagram /></div>
            <span className="text-xs uppercase tracking-widest">Instagram</span>
          </a>
        </div>
        <p className="text-stone-400 text-sm">&copy; {new Date().getFullYear()} Jonas Fan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 selection:bg-orange-100 selection:text-orange-900 font-sans">
      <Navbar />
      <Hero />
      <AboutMe />
      <GithubSection />
      <GameSection />
      <InterestsGallery />
      <AnimeSection />
      <Footer />
    </div>
  );
}