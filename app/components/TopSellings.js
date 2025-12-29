"use client";
import { useEffect, useState } from "react";
// Add ChevronRight and ShoppingBag to your lucide-react imports
import { 
  Upload, 
  Loader2, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ChevronRight,
  ShoppingBag  
} from "lucide-react";import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const STRAPI_URL = "https://api.mynestbd.com"; 
const NANOBANANA_API_KEY = "b40a3407c9d6ab58131f225299174b1c";
const NANOBANANA_ENDPOINT = "https://api.nanobananaapi.ai/api/v1/nanobanana/generate";
const NANOBANANA_POLL_ENDPOINT = "https://api.nanobananaapi.ai/api/v1/nanobanana/record-info";

export default function TopSellings() {
  const [userImagePreview, setUserImagePreview] = useState("");
  const [bedsheets, setBedsheets] = useState([]);
  const [selectedDress, setSelectedDress] = useState(null);
  const [isFetchingBedsheets, setIsFetchingBedsheets] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [countdown, setCountdown] = useState(0); 
  const [resultImage, setResultImage] = useState("");
  const [error, setError] = useState("");

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Fetch Designs
  useEffect(() => {
    const fetchBedsheets = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/bedsheets?populate=*`);
        const json = await res.json();
        if (json.data) {
          const mapped = json.data.map((item) => {
            const attr = item.attributes || item;
            const photo = attr.bedsheetPhoto?.data?.attributes || attr.bedsheetPhoto;
            return {
              id: item.id,
              name: attr.title || "Untitled",
              prompt: attr.prompt || "Change the bedsheet design in the first image using the pattern from the second image. High quality, interior photography style.",
              image: photo?.url.startsWith("http") ? photo.url : `${STRAPI_URL}${photo?.url}`,
            };
          });
          setBedsheets(mapped);
        }
      } catch (err) { console.error("Fetch Error:", err); }
      finally { setIsFetchingBedsheets(false); }
    };
    fetchBedsheets();
  }, []);

  // 2. Mobile Upload Sync
  useEffect(() => {
    if (userImagePreview) return;
    const interval = setInterval(async () => {
      const savedQrCode = localStorage.getItem("qr_code");
      if (!savedQrCode) return;
      try {
        const res = await fetch(`${STRAPI_URL}/api/user-photos?filters[customid][$eq]=${savedQrCode}&populate=*`);
        const result = await res.json();
        if (result.data?.[0]?.photo?.[0]) {
          const url = result.data[0].photo[0].url;
          setUserImagePreview(url.startsWith("http") ? url : `${STRAPI_URL}${url}`);
          clearInterval(interval);
        }
      } catch (e) { console.log("Waiting for mobile upload..."); }
    }, 4000);
    return () => clearInterval(interval);
  }, [userImagePreview]);

  // 3. Main AI Visualization Logic
const handleVisualize = async () => {
    if (!userImagePreview || !selectedDress) return;
    setResultImage("");
    setError("");
    setIsModalOpen(true);
    setIsLoading(true);
    
    try {
      const chosenSheet = bedsheets.find(b => b.id === selectedDress);
      setLoadingStage("Sending design to AI...");

      // 1. Submit the Task
      const nanoRes = await fetch(NANOBANANA_ENDPOINT, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${NANOBANANA_API_KEY}` 
        },
        body: JSON.stringify({
          prompt: chosenSheet?.prompt,
          imageUrls: [userImagePreview, chosenSheet?.image],
          type: "IMAGETOIAMGE",
          numImages: 1,
          image_size: "1:1",
          callBackUrl: "https://mynestbd.com/api/callback" 
        })
      });
      
      const nanoData = await nanoRes.json();
      if (nanoData.code !== 200) throw new Error(nanoData.msg || "AI startup failed.");
      
      const taskId = nanoData.data.taskId;
      let foundUrl = null;
      let attempts = 0;
      const maxAttempts = 20; // Will poll for up to 100 seconds (5s * 20)

      // 2. Smart Polling Loop
      while (!foundUrl && attempts < maxAttempts) {
        attempts++;
        setLoadingStage(attempts < 5 ? "Analyzing your room..." : "Applying fabric textures...");
        
        // Wait 5 seconds between checks
        for (let i = 5; i > 0; i--) {
          setCountdown(i);
          await sleep(1000);
        }

        const res = await fetch(`${NANOBANANA_POLL_ENDPOINT}?taskId=${taskId}`, {
          headers: { "Authorization": `Bearer ${NANOBANANA_API_KEY}` }
        });
        const statusData = await res.json();

        // LOGIC BASED ON YOUR PROVIDED JSON:
        // Path: data -> response -> resultImageUrl
        // Success indicator: data -> successFlag === 1
        if (statusData.code === 200 && statusData.data) {
          const successFlag = statusData.data.successFlag;
          const resultUrl = statusData.data.response?.resultImageUrl;

          if (successFlag === 1 && resultUrl) {
            foundUrl = resultUrl;
            break;
          }
          
          // If errorCode exists and isn't null, something went wrong
          if (statusData.data.errorCode) {
            throw new Error(statusData.data.errorMessage || "AI generation failed.");
          }
        }
      }

      if (!foundUrl) throw new Error("Taking longer than usual. Please check your internet or try again.");

      setResultImage(foundUrl);
      setIsLoading(false);
      setCountdown(0);
    } catch (err) {
      console.error("Workflow Error:", err);
      setError(err.message);
      setIsLoading(false);
      setCountdown(0);
    }
  };

return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16 bg-white">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-5xl font-serif text-slate-900 tracking-tight">Visualize Your Space</h1>
        <p className="text-slate-500 text-lg">Upload your room photo and see our premium collections come to life instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Interactive Preview (5 Cols) */}
        <div className="lg:col-span-7 group relative">
          <div className="aspect-[4/3] rounded-[3rem] bg-slate-50 border-8 border-slate-50 shadow-2xl overflow-hidden relative">
            {userImagePreview ? (
              <>
                <img src={userImagePreview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Room" />
                <button onClick={() => setUserImagePreview("")} className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:bg-white transition-colors">
                  <RefreshCw size={20} className="text-slate-700" />
                </button>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-slate-800 shadow-lg">Current Selection</div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-6 text-slate-400">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-inner">
                  <Upload size={32} className="text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-medium text-slate-600">Waiting for room photo</p>
                  <p className="text-sm">Scan the QR code on your mobile to upload</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Design Grid (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif text-slate-800">Select Collection</h3>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{bedsheets.length} Designs</span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-4 custom-scrollbar">
            {bedsheets.map((sheet) => (
              <motion.div
                key={sheet.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedDress(sheet.id)}
                className={cn(
                  "group relative cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300",
                  selectedDress === sheet.id ? "border-slate-900 ring-4 ring-slate-100" : "border-transparent bg-slate-50"
                )}
              >
                <img src={sheet.image} className="aspect-square object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="p-4 bg-white/80 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-800 truncate">{sheet.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Premium Cotton</p>
                </div>
                {selectedDress === sheet.id && (
                  <div className="absolute top-3 right-3 bg-slate-900 rounded-full p-1.5 shadow-lg">
                    <CheckCircle2 className="text-white h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <Button
            disabled={!userImagePreview || !selectedDress || isLoading}
            onClick={handleVisualize}
            className="w-full h-20 rounded-[2rem] bg-slate-900 hover:bg-black text-white text-xl font-medium shadow-2xl transition-all disabled:bg-slate-200"
          >
            {isLoading ? <Loader2 className="animate-spin mr-3" /> : <Sparkles className="mr-3 text-amber-400" />}
            Visualize on My Bed
          </Button>
        </div>
      </div>

      {/* Modern Result Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] overflow-hidden max-w-6xl w-full relative border border-white/20">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-xl"><X size={24} /></button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {isLoading ? (
                    <div className="text-center space-y-8 p-12">
                      <div className="relative inline-block">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200" />
                          <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * (5 - countdown)) / 5} className="text-slate-900 transition-all duration-1000" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{countdown}s</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-serif italic text-slate-800">{loadingStage}</h4>
                        <p className="text-slate-400 animate-pulse">Our AI is meticulously rendering your custom look...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="p-12 text-center">
                      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle size={40} className="text-red-500" /></div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h4>
                      <p className="text-slate-500 mb-6">{error}</p>
                      <Button onClick={handleVisualize} variant="outline" className="rounded-full">Try Again</Button>
                    </div>
                  ) : (
                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={resultImage} className="w-full h-full object-cover" alt="Result" />
                  )}
                </div>

                <div className="p-16 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-blue-600 mb-4">
                      <Sparkles size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">AI Masterpiece</span>
                    </div>
                    <h3 className="text-5xl font-serif text-slate-900 mb-6">A New Level of Comfort.</h3>
                    <p className="text-lg text-slate-500 leading-relaxed mb-8">The chosen design harmonizes perfectly with your room's lighting and layout. Ready to make it yours?</p>
                    
                    <div className="space-y-4 mb-12">
                      {['Premium Percale Weave', 'Natural Breathability', 'Fade-Resistant Colors'].map((item) => (
                        <div key={item} className="flex items-center space-x-3 text-slate-700">
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center"><ChevronRight size={12} /></div>
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 h-16 bg-slate-900 text-white rounded-2xl text-lg font-medium group hover:bg-black">
                      <ShoppingBag className="mr-2 group-hover:scale-110 transition-transform" /> Add to Cart
                    </Button>
                    <Button variant="outline" className="h-16 w-16 rounded-2xl border-slate-200">
                      <RefreshCw size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}