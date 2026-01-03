"use client";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Smartphone, Copy, CheckCircle2 } from "lucide-react";

function generateId(length = 12) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export default function Qr_part() {
  const [qrId, setQrId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = generateId();
    setQrId(id);
    localStorage.setItem("qr_code", id);
  }, []);

  const fullUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/demopage/${qrId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl mt-30 mb-10">
      <div className="p-8 flex flex-col items-center text-center space-y-6">
        
        {/* Header Icon & Text */}
        <div className="space-y-2">
          <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-serif text-slate-900">Scan to Continue</h2>
          <p className="text-slate-500 text-sm max-w-[220px]">
            Scan this code with your phone camera to upload your room photo.
          </p>
        </div>

        {/* QR Code Container with Scan Line Effect */}
        <div className="relative p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
          {qrId ? (
            <>
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />
              
              <QRCodeCanvas
                value={fullUrl}
                size={200}
                level="H"
                includeMargin={false}
                className="rounded-lg"
              />
              
              {/* Animated Scan Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/30 blur-sm animate-[scan_3s_linear_infinite]" />
            </>
          ) : (
            <div className="w-[200px] h-[200px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* URL / ID Display and Copy Button */}
        <div className="w-full space-y-3 pt-2">
          <div 
            onClick={copyToClipboard}
            className="flex items-center justify-between bg-slate-100 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors group"
          >
            <span className="text-xs font-mono text-slate-600 truncate mr-2">
              {qrId ? `/demopage/${qrId}` : "Generating..."}
            </span>
            {copied ? (
              <CheckCircle2 size={16} className="text-green-600" />
            ) : (
              <Copy size={16} className="text-slate-400 group-hover:text-blue-600" />
            )}
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Session ID: {qrId}
          </p>
        </div>
      </div>
    </div>
  );
}