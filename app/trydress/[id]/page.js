"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Added useRouter
import { Upload, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import PromoBanner from "@/app/components/topBar";
import Footer from "@/app/components/Footer";

export default function MobileUpload() {
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  
  const params = useParams();
  const router = useRouter(); // Initialize router
  const id = params?.id;

  // 1. Save ID and Prefetch the home page for a faster redirect later
  useEffect(() => {
    if (id) {
      localStorage.setItem("qr_session_id", id);
    }
    router.prefetch("/"); // Pre-loads the home page code
  }, [id, router]);

  // 2. Redirect logic: Watch the 'done' state
  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2500); // Redirects after 2.5 seconds so user sees the success state

      return () => clearTimeout(timer);
    }
  }, [done, router]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !id) {
      alert("Missing file or Session ID");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("files", file);

      const uploadRes = await fetch(`https://api.mynestbd.com/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("File upload failed");
      
      const uploadedFiles = await uploadRes.json();
      const fileId = uploadedFiles[0].id;

      const saveRes = await fetch(`https://api.mynestbd.com/api/user-photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            customid: id,
            photo: fileId,
          },
        }),
      });

      if (saveRes.ok) {
        setDone(true);
      } else {
        throw new Error("Failed to link photo");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <PromoBanner />
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
        <div className="mb-4 text-center">
          <p className="text-sm font-medium text-slate-500">
            Session ID: <span className="text-blue-600 font-bold">{id || "Loading..."}</span>
          </p>
        </div>

        {!done ? (
          <label className="w-full max-w-xs flex flex-col items-center p-10 bg-white rounded-3xl shadow-xl border-2 border-dashed border-slate-300 cursor-pointer">
            {uploading ? <Loader2 className="animate-spin text-blue-500" size={40} /> : <Upload size={40} />}
            <span className="mt-4 font-medium">
              {uploading ? "Uploading..." : "Tap to Upload Room Photo"}
            </span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*" 
              disabled={!id || uploading}
            />
          </label>
        ) : (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800">Upload Complete!</h2>
            <p className="text-slate-600 mt-2">Redirecting you to the home page...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}