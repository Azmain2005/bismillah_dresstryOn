"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Loader2, X, Sparkles, CheckCircle2, AlertCircle, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTANT: NanoBanana cannot see 'localhost'. 
// Use your Ngrok URL here for testing: e.g., "https://a1b2-c3d4.ngrok-free.app"
const STRAPI_URL = "https://api.mynestbd.com";
const NANOBANANA_API_KEY = "b40a3407c9d6ab58131f225299174b1c";
const NANOBANANA_ENDPOINT = "https://api.nanobananaapi.ai/api/v1/nanobanana/generate";
const NANOBANANA_POLL_ENDPOINT = "https://api.nanobananaapi.ai/api/v1/nanobanana/detail";

export default function TopSellings() {
  const [userImage, setUserImage] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState("");
  const [bedsheets, setBedsheets] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [selectedDress, setSelectedDress] = useState(null); // This stores the ID
  const [isFetchingBedsheets, setIsFetchingBedsheets] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [error, setError] = useState("");

  const pollingInterval = useRef(null);

  // 1. Fetch Gallery from Strapi
  useEffect(() => {
    const fetchBedsheets = async () => {
      setIsFetchingBedsheets(true);
      try {
        const res = await fetch(`${STRAPI_URL}/api/bedsheets?populate=*`);
        const json = await res.json();
        if (json.data) {
          const mapped = json.data.map((item) => {
            const attr = item.attributes || item;
            const photo = attr.bedsheetPhoto?.data?.attributes || attr.bedsheetPhoto;
            const url = photo?.url || "";
            return {
              id: item.id,
              name: attr.title || "Untitled",
              prompt: attr.prompt || "Replace the existing bedsheet with the pattern from the second image.", // ADD THIS LINE
              image: url.startsWith("https") ? url : `${STRAPI_URL}${url}`,
            };
          });
          setBedsheets(mapped);
        }
      } catch (err) {
        console.error("Gallery fetch failed:", err);
      } finally {
        setIsFetchingBedsheets(false);
      }
    };
    fetchBedsheets();
  }, []);

  const handleImageUpload = (file) => {
    if (!file) return;
    setUserImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setUserImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

// 2. The Core AI Logic
const handleVisualize = async () => {
  if (!userImage || !selectedDress) return;

  setResultImage("");
  setError("");
  setIsModalOpen(true);
  setIsLoading(true);
  setLoadingStage("Uploading room to MyNest...");

  try {
    // 1. UPLOAD
    const formData = new FormData();
    formData.append("files", userImage);
    const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, { method: "POST", body: formData });
    const uploadData = await uploadRes.json();
    const bedPublicUrl = `${STRAPI_URL}${uploadData[0].url}`;

    const chosenSheet = bedsheets.find(b => b.id === selectedDress);
    const sheetPublicUrl = chosenSheet?.image;

    // 2. TRIGGER GENERATION
    setLoadingStage("Waking up AI Engine...");
    const nanoRes = await fetch(NANOBANANA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${NANOBANANA_API_KEY}` },
      body: JSON.stringify({
        prompt: chosenSheet?.prompt,
        imageUrls: [bedPublicUrl, sheetPublicUrl],
        type: "IMAGETOIAMGE",
        numImages: 1,
        image_size: "1:1"
      })
    });

    const nanoData = await nanoRes.json();
    if (nanoData.code !== 200) throw new Error("AI startup failed.");
    const taskId = nanoData.data.taskId;

    // --- STEP 3: THE BEAUTIFUL COUNTDOWN & POLLING ---
    let secondsLeft = 40; // Total countdown time
    let finalUrl = null;

    // Function to handle the visual countdown
    const countdownInterval = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        setLoadingStage(`Stitching fabrics... ${secondsLeft}s`);
      } else {
        setLoadingStage("Final touches... almost there!");
      }
    }, 1000);

    // Function to keep checking the API (Polling)
    const checkStatus = async () => {
      for (let i = 0; i < 20; i++) { // Max 20 checks
        // Wait 4 seconds between checks
        await new Promise(resolve => setTimeout(resolve, 4000));

        const res = await fetch(`https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=${taskId}`, {
          headers: { "Authorization": `Bearer ${NANOBANANA_API_KEY}` }
        });
        const statusData = await res.json();
        
        const foundUrl = statusData.data?.response?.resultImageUrl;
        if (foundUrl && foundUrl.startsWith("http")) {
          return foundUrl;
        }
      }
      return null;
    };

    // Execute the check
    finalUrl = await checkStatus();
    
    // Cleanup
    clearInterval(countdownInterval);

    if (finalUrl) {
      setResultImage(finalUrl);
      setIsLoading(false);
    } else {
      throw new Error("Taking longer than usual. Please try again.");
    }

  } catch (err) {
    console.error("Workflow Error:", err);
    setError(err.message);
    setIsLoading(false);
  }
};
const startPolling = (taskId) => {
  setLoadingStage("AI is rendering your results... (usually 20-40s)");
  let startTime = Date.now();

  if (pollingInterval.current) clearInterval(pollingInterval.current);

  pollingInterval.current = setInterval(async () => {
    // 1. Safety Timeout: Stop after 3 minutes
    if (Date.now() - startTime > 180000) {
      clearInterval(pollingInterval.current);
      setError("The AI is taking longer than usual. Please check back in a moment.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${NANOBANANA_POLL_ENDPOINT}?taskId=${taskId}`, {
        headers: { 
          "Authorization": `Bearer ${NANOBANANA_API_KEY}`,
          "Content-Type": "application/json"
        }
      });
      
      const result = await res.json();
      console.log("NanoBanana Polling Response:", result);

      // Matches the docs: code 200 means the API request worked
      if (result.code === 200) {
        // MATCHING YOUR DOCS: data.info.resultImageUrl
        const finalUrl = result.data?.info?.resultImageUrl;
         
        if (finalUrl && finalUrl.startsWith("http")) {
          console.log("Image Found!", finalUrl);
          setResultImage(finalUrl);
          setIsLoading(false);
          clearInterval(pollingInterval.current);
        } else {
          // Still processing if URL is missing or empty
          setLoadingStage("Stitching fabrics and lighting...");
        }
      } 
      // Handle the specific error codes from your documentation (400, 500, 501)
      else if ([400, 500, 501].includes(result.code)) {
        throw new Error(result.msg || "AI generation failed.");
      }
    } catch (err) {
      console.error("Polling Error:", err);
      // Only stop if it's a confirmed error message from the API
      if (err.message.includes("failed") || err.message.includes("policy")) {
        clearInterval(pollingInterval.current);
        setError(err.message);
        setIsLoading(false);
      }
    }
  }, 8000); // 8 seconds is a good balance for NanoBanana
};

  useEffect(() => () => clearInterval(pollingInterval.current), []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 bg-white text-slate-900">
      {/* Step 1: Upload UI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div
          onClick={() => document.getElementById("file-upload").click()}
          className={cn(
            "rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 min-h-[400px]",
            userImage && "border-solid border-green-200 bg-green-50/30"
          )}
        >
          <input id="file-upload" type="file" accept="image/*" hidden onChange={(e) => handleImageUpload(e.target.files?.[0])} />
          <Upload className="mb-4 text-slate-400" size={40} />
          <p className="text-xl font-medium">Upload your room photo</p>
        </div>

        <div className="rounded-[2.5rem] bg-slate-100 overflow-hidden flex items-center justify-center">
          {userImagePreview ? (
            <img src={userImagePreview} className="w-full h-full object-cover" alt="Preview" />
          ) : (
            <div className="text-slate-400 italic">No image uploaded</div>
          )}
        </div>
      </div>

      {/* Step 2: Selection Grid */}
      <div className="space-y-10">
        <h2 className="text-3xl font-serif border-b pb-4">Choose a Design</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {isFetchingBedsheets ? <Loader2 className="animate-spin" /> : bedsheets.map((sheet) => (
            <div
              key={sheet.id}
              onClick={() => setSelectedDress(sheet.id)}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer transition-all",
                selectedDress === sheet.id ? "ring-4 ring-black scale-95" : "hover:opacity-80"
              )}
            >
              <img src={sheet.image} className="aspect-square object-cover" alt={sheet.name} />
              <div className="p-3 bg-white border-t text-sm font-bold truncate">{sheet.name}</div>
              {selectedDress === sheet.id && (
                <div className="absolute top-2 right-2 bg-black rounded-full p-1"><CheckCircle2 className="text-white h-4 w-4" /></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Action Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!userImage || !selectedDress || isLoading}
          onClick={handleVisualize}
          className="rounded-full px-12 py-8 bg-slate-950 text-white text-xl"
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 text-amber-400" />}
          Visualize on My Bed
        </Button>
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <motion.div className="bg-white rounded-[2rem] overflow-hidden max-w-5xl w-full relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-lg"><X size={24} /></button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square bg-slate-200 flex items-center justify-center">
                  {isLoading ? (
                    <div className="text-center space-y-4">
                      <Loader2 className="animate-spin h-12 w-12 mx-auto" />
                      <p className="font-serif italic animate-pulse">{loadingStage}</p>
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500 p-8"><AlertCircle size={48} className="mx-auto mb-4" /><p>{error}</p></div>
                  ) : (
                    <img src={resultImage} className="w-full h-full object-cover" alt="AI Result" />
                  )}
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-serif mb-4">Your New Sanctuary</h3>
                  <Button className="w-full h-14 bg-black text-white rounded-xl text-lg">Order This Look</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}