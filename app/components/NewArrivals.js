// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Upload, Search, Loader2, X, Sparkles, Image as ImageIcon, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";


// // API Config
// const STRAPI_URL = "https://api.mynestbd.com";
// const NANOBANANA_API_KEY = "b40a3407c9d6ab58131f225299174b1c";
// const NANOBANANA_ENDPOINT = "https://api.nanobananaapi.ai/api/v1/nanobanana/generate";

// export default function DressTryOnForm() {
//   const [dressUserImage, setDressUserImage] = useState(null);
//   const [dressUserImagePreview, setDressUserImagePreview] = useState("");
//   const [dresses, setDresses] = useState([]);
//   const [selectedDress, setSelectedDress] = useState(null);
//   const [isFetching, setIsFetching] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // AI State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingStage, setLoadingStage] = useState("");
//   const [resultImage, setResultImage] = useState("");

//   const pollingInterval = useRef(null);

//   // 1. Fetch Gallery from Strapi
//   useEffect(() => {
//     const fetchDresses = async () => {
//       setIsFetching(true);
//       setError(null);
//       try {
//         const res = await fetch(`${STRAPI_URL}/api/dresses?populate=*`);
//         if (!res.ok) throw new Error(`Server responded with ${res.status}`);
//         const json = await res.json();

//         if (json.data) {
//           const mapped = json.data.map((item) => {
//             const attr = item.attributes || item;
//             const imageData = attr.image?.data?.attributes || attr.image;
//             const imageUrl = imageData?.url || "";

//             return {
//               id: item.id,
//               name: attr.title || "Untitled Set",
//               // Use prompt from Strapi or a default for dresses
//               prompt: attr.prompt || "Virtual try-on: replace the clothes on the person in the first image with the dress from the second image. High fashion photography style.",
//               image: imageUrl.startsWith("http") ? imageUrl : `${STRAPI_URL}${imageUrl}`,
//             };
//           });
//           setDresses(mapped);
//         }
//       } catch (err) {
//         console.error("Fetch Error:", err);
//         setError("Could not connect to the fashion catalog.");
//       } finally {
//         setIsFetching(false);
//       }
//     };
//     fetchDresses();
//   }, []);

//   const handleDressImageUpload = (file) => {
//     if (!file || !file.type.startsWith("image/")) return;
//     setDressUserImage(file);
//     const reader = new FileReader();
//     reader.onloadend = () => setDressUserImagePreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   // 2. The Core AI Logic (Adapted for Dresses)
//   const handleGenerateFitting = async () => {
//     if (!dressUserImage || !selectedDress) return;

//     setResultImage("");
//     setError("");
//     setIsModalOpen(true);
//     setIsLoading(true);
//     setLoadingStage("Uploading portrait to MyNest...");

//     try {
//       // Step A: Upload user image to Strapi
//       const formData = new FormData();
//       formData.append("files", dressUserImage);
//       const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, { method: "POST", body: formData });
//       const uploadData = await uploadRes.json();
//       const userPublicUrl = `${STRAPI_URL}${uploadData[0].url}`;

//       const chosenDress = dresses.find(d => d.id === selectedDress);
//       const dressPublicUrl = chosenDress?.image;

//       // Step B: Trigger AI Generation
//       setLoadingStage("Preparing virtual dressing room...");
//       const nanoRes = await fetch(NANOBANANA_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${NANOBANANA_API_KEY}`
//         },
//         body: JSON.stringify({
//           prompt: chosenDress?.prompt,
//           imageUrls: [userPublicUrl, dressPublicUrl],
//           type: "IMAGETOIAMGE",
//           numImages: 1,
//           image_size: "1:1"
//         })
//       });

//       const nanoData = await nanoRes.json();
//       if (nanoData.code !== 200) throw new Error("AI Engine failed to start.");
//       const taskId = nanoData.data.taskId;

//       // Step C: Timer Animation
//       let timeLeft = 30;
//       const timer = setInterval(() => {
//         timeLeft--;
//         if (timeLeft > 0) {
//           setLoadingStage(`Stitching your outfit... ${timeLeft}s`);
//         } else {
//           setLoadingStage("Final touches on fabric and lighting...");
//           clearInterval(timer);
//         }
//       }, 1000);

//       // Step D: Hard wait for processing
//       await new Promise(resolve => setTimeout(resolve, 30000));
//       clearInterval(timer);

//       // Step E: Fetch Final Result
//       const finalRes = await fetch(`https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=${taskId}`, {
//         headers: { "Authorization": `Bearer ${NANOBANANA_API_KEY}` }
//       });

//       const finalData = await finalRes.json();
//       const finalUrl = finalData.data?.response?.resultImageUrl;

//       if (finalUrl && finalUrl.startsWith("http")) {
//         setResultImage(finalUrl);
//         setIsLoading(false);
//       } else {
//         throw new Error("Generation took longer than expected. Please try again.");
//       }

//     } catch (err) {
//       console.error("Workflow Error:", err);
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

//   const filteredDresses = dresses.filter((d) =>
//     d.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const canSubmit = dressUserImage && selectedDress !== null && !isLoading;

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-16 space-y-20 bg-[#FAFAFA] text-slate-900">

//       {/* Header */}
//       <header className="text-center space-y-4">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
//           <Sparkles size={12} className="text-amber-500" />
//           Virtual Fitting Room
//         </div>
//         <h1 className="text-5xl md:text-6xl font-serif tracking-tight">
//           Style <span className="italic font-light text-slate-400">Yourself</span>
//         </h1>
//       </header>

//       {/* Upload Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <div
//           onClick={() => document.getElementById("dress-file-upload").click()}
//           onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleDressImageUpload(e.dataTransfer.files[0]); }}
//           onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//           onDragLeave={() => setIsDragging(false)}
//           className={cn(
//             "group relative rounded-[2.5rem] border border-slate-200 bg-white flex flex-col items-center justify-center p-12 transition-all cursor-pointer min-h-[400px]",
//             isDragging ? "border-slate-400 bg-slate-50" : "hover:border-slate-300 shadow-sm",
//             dressUserImage && "border-green-200 bg-green-50/20"
//           )}
//         >
//           <input id="dress-file-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleDressImageUpload(e.target.files[0])} />
//           <div className="flex flex-col items-center gap-6 text-center">
//             <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white flex items-center justify-center">
//               <Upload size={24} />
//             </div>
//             <p className="text-xl font-medium">{dressUserImage ? "Change Portrait" : "Upload Portrait"}</p>
//           </div>
//         </div>

//         <div className="rounded-[2.5rem] bg-white border border-slate-200 flex items-center justify-center overflow-hidden relative min-h-[400px]">
//           {dressUserImagePreview ? (
//             <img
//               src={dressUserImagePreview}
//               className="w-full h-full object-cover"
//               alt="Preview"
//             />
//           ) : (
//             <div className="flex flex-col items-center text-slate-300">
//               <ImageIcon size={60} className="mb-2 opacity-10" />
//               <p className="font-serif italic">Preview Canvas</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Gallery Section */}
//       <div className="space-y-10">
//         <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b pb-8">
//           <h2 className="text-3xl font-serif">The Collection</h2>
//           <div className="relative w-full md:w-80">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
//             <Input
//               placeholder="Search designs..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-12 h-14 rounded-2xl bg-white border-slate-200"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
//           {isFetching ? (
//             <div className="col-span-full py-20 flex flex-col items-center gap-4">
//               <Loader2 className="animate-spin text-slate-300 h-8 w-8" />
//               <p className="text-xs text-slate-400 uppercase tracking-widest">Accessing Strapi...</p>
//             </div>
//           ) : (
//             filteredDresses.map((dress) => (
//               <div
//                 key={dress.id}
//                 onClick={() => setSelectedDress(dress.id)}
//                 className={cn(
//                   "relative group rounded-[2rem] overflow-hidden cursor-pointer transition-all",
//                   selectedDress === dress.id ? "ring-2 ring-slate-950 ring-offset-8" : "hover:-translate-y-2"
//                 )}
//               >
//                 <div className="aspect-[3/4] bg-slate-100">
//                   <img src={dress.image} className="h-full w-full object-cover" alt={dress.name} />
//                   {selectedDress === dress.id && (
//                     <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
//                       <div className="bg-white rounded-full p-2"><CheckCircle2 size={20} className="text-slate-950" /></div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-4 bg-white text-center">
//                   <p className="text-[10px] font-bold uppercase tracking-widest truncate">{dress.name}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Action Button */}
//       <div className="flex justify-center pt-10">
//         <Button
//           size="xl"
//           disabled={!canSubmit}
//           onClick={handleGenerateFitting}
//           className="rounded-full px-12 py-8 bg-slate-950 text-white text-lg font-light tracking-wide shadow-xl disabled:opacity-20 transition-all hover:scale-105"
//         >
//           {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-5 w-5 text-amber-400" />}
//           {isLoading ? "Styling..." : "Generate Fitting"}
//         </Button>
//       </div>

//       {/* Result Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-[3rem] overflow-hidden max-w-4xl w-full flex flex-col md:flex-row relative shadow-2xl"
//             >
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-6 right-6 z-10 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
//               >
//                 <X size={20} />
//               </button>

//               <div className="md:w-1/2 bg-slate-100 h-[400px] md:h-[600px] flex items-center justify-center relative">
//                 {isLoading ? (
//                   <div className="text-center space-y-4 px-6">
//                     <Loader2 className="animate-spin text-slate-950 h-10 w-10 mx-auto" />
//                     <p className="font-serif italic animate-pulse text-slate-600">{loadingStage}</p>
//                   </div>
//                 ) : error ? (
//                   <div className="text-center p-8 text-red-500 space-y-2">
//                     <AlertCircle size={40} className="mx-auto" />
//                     <p className="text-sm font-medium">{error}</p>
//                   </div>
//                 ) : (
//                   <img src={resultImage} className="w-full h-full object-cover" alt="AI Generated Fitting" />
//                 )}
//               </div>

//               <div className="md:w-1/2 p-12 flex flex-col justify-center space-y-6">
//                 <h3 className="text-3xl font-serif">
//                   {isLoading ? "Your New Look..." : "Fitting Complete"}
//                 </h3>
//                 <p className="text-slate-500 font-light leading-relaxed">
//                   {isLoading
//                     ? "Our AI is currently mapping the fabric to your portrait. This usually takes about 25 seconds."
//                     : "Your custom ensemble has been rendered with precision lighting and fabric physics."}
//                 </p>
//                 {!isLoading && !error && (
//                   <div className="space-y-3">
//                     <Button className="w-full rounded-2xl h-14 bg-slate-950 hover:bg-slate-800 transition-colors">
//                       Order This Three-Piece
//                     </Button>
//                     <button
//                       onClick={() => window.open(resultImage, '_blank')}
//                       className="w-full text-center text-xs text-slate-400 hover:text-slate-600 underline"
//                     >
//                       Download High-Res Image
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

