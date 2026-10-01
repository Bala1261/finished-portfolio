"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Award, Calendar } from "lucide-react";
import certifications, { Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

const CertificationsSection = () => {
    if (!certifications || certifications.length === 0) {
        return null;
    }

    return (
        <section id="certifications" className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 pointer-events-none overflow-visible">
            <Link href={"#certifications"} className="pointer-events-auto block w-fit mx-auto mb-10 md:mb-16">
                <h2
                    className={cn(
                        "bg-clip-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center text-transparent font-display font-extrabold tracking-tight",
                        "bg-gradient-to-b from-white via-white/95 to-slate-200 drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]"
                    )}
                >
                    CERTIFICATIONS
                </h2>
            </Link>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pb-16 pointer-events-auto">
                {certifications.map((cert) => (
                    <CertificationCard key={cert.id} certification={cert} />
                ))}
            </div>
        </section>
    );
};

const CertificationCard = ({ certification }: { certification: Certification }) => {
    return (
        <div className="flex items-center justify-center p-2">
            <div
                className={cn(
                    "group relative overflow-hidden rounded-lg w-full max-w-[400px]", // Desktop matches projects, mobile is compact
                    "transition-all duration-500 ease-in-out",
                    "border border-white/20 hover:border-purple-500/50",
                    "shadow-[0_0_20px_rgba(168,85,247,0.5)]",
                    "hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]",
                    "dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
                    "hover:-translate-y-1",
                    "cursor-pointer"
                )}
                style={{ aspectRatio: "3/2" }}
            >
                <Image
                    src={certification.certificateImage}
                    alt={certification.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={95}
                />

                {/* Overlay text (Exactly like Projects) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <p className="text-white text-sm md:text-base font-semibold truncate mb-1">
                        {certification.title}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] bg-white text-black rounded-lg px-2 py-0.5 font-bold shrink-0">
                            {certification.issuer}
                        </span>
                        <p className="text-[10px] text-white/60 truncate">
                            {certification.issueDate}
                        </p>
                    </div>
                </div>

                {/* External Link (Top Corner) */}
                {certification.credentialUrl && (
                    <Link
                        href={certification.credentialUrl}
                        target="_blank"
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ExternalLink className="w-3.5 h-3.5 text-white" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CertificationsSection;
