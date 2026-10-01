"use client";
import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";

import SmoothScroll from "../smooth-scroll";
import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto py-12 md:py-24 px-4 sm:px-6">
      <Link href={"#projects"}>
        <h2
          className={cn(
            "bg-clip-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center text-transparent font-display font-extrabold tracking-tight",
            "bg-gradient-to-b from-white via-white/95 to-slate-200 drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]",
            "mb-8 md:mb-16"
          )}
        >
          PROJECTS
        </h2>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <Modall key={project.src} project={project} />
        ))}
      </div>
    </section>
  );
};
const Modall = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-center p-2">
      <Modal>
        <ModalTrigger className="bg-transparent flex justify-center group/modal-btn w-full">
          <div
            className={cn(
              "relative w-full max-w-[450px] h-auto rounded-lg overflow-hidden transition-all duration-500",
              "border border-white/20 group-hover/modal-btn:border-purple-500/50",
              "shadow-[0_0_20px_rgba(168,85,247,0.5)]",
              "group-hover/modal-btn:shadow-[0_0_30px_rgba(168,85,247,0.5)]",
              "dark:group-hover/modal-btn:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            )}
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              className="absolute w-full h-full top-0 left-0 hover:scale-[1.05] transition-all object-cover"
              src={project.src}
              alt={project.title}
              width={800}
              height={533}
              quality={90}
              priority
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none">
              <div className="flex flex-col h-full items-start justify-end p-4 sm:p-6">
                <div className="text-base sm:text-lg text-left font-semibold">{project.title}</div>
                <div className="text-xs bg-white text-black rounded-lg w-fit px-2 py-0.5 mt-1">
                  {project.category}
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="max-w-4xl">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-2 md:gap-4">
            {/* Source Code Button */}
            {project.github && (
              <Link href={project.github} target="_blank">
                <button className="group px-2 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded-md text-sm w-32 flex items-center justify-center gap-2 transition-colors duration-200">
                  <FaGithub className="w-4 h-4" />
                  Code
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Link>
            )}

            {/* Live Demo Button - Only show if it's different from GitHub */}
            {project.live && project.live !== project.github && (
              <Link href={project.live} target="_blank">
                <button className="group px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm w-28 flex items-center justify-center gap-2 transition-colors duration-200">
                  Visit
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Link>
            )}
          </ModalFooter>

        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2 md:mb-8">
        {project.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-2 md:mb-8">
          <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
            Frontend
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-2 md:mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      {/* <div className="flex justify-center items-center">
        {project.screenshots.map((image, idx) => (
          <motion.div
            key={"images" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            whileTap={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={`${project.src.split("1.png")[0]}${image}`}
              alt="screenshots"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div> */}
      {project.content}
    </>
  );
};
