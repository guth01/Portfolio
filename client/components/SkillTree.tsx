import { FolderOpen, Folder, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SkillBlock = {
  title: string;
  items: string[];
};

export function SkillTree({ blocks }: { blocks: SkillBlock[] }) {
  return (
    <div className="font-mono text-sm sm:text-base border border-portfolio-gray/25 bg-[#2b3039]/20 p-6 sm:p-8 shadow-[0_0_40px_rgba(199,120,221,0.05)] backdrop-blur-sm transition-all hover:border-portfolio-primary/40">
      <div className="flex items-center gap-2 text-portfolio-primary mb-2 h-10">
        <FolderOpen className="w-5 h-5" />
        <span className="font-bold text-white text-lg">skills/</span>
      </div>
      
      <div className="flex flex-col ml-2">
        {blocks.map((block, idx) => (
          <div 
            key={block.title} 
            className={cn(
              "relative pl-6 pb-2",
              "before:absolute before:left-0 before:top-0 before:w-px before:bg-portfolio-gray/40",
              idx === blocks.length - 1 ? "before:h-5" : "before:h-full",
              "after:absolute after:left-0 after:top-5 after:w-4 after:h-px after:bg-portfolio-gray/40"
            )}
          >
            <div className="flex items-center gap-2 h-10 group cursor-default">
              <Folder className="w-4 h-4 text-portfolio-primary/80 transition-colors group-hover:text-portfolio-primary" />
              <span className="font-semibold text-white transition-colors group-hover:text-portfolio-primary">{block.title}/</span>
            </div>
            
            <div className="flex flex-col">
              {block.items.map((item, itemIdx) => {
                const isLastItem = itemIdx === block.items.length - 1;
                return (
                  <div 
                    key={item} 
                    className={cn(
                      "relative pl-6",
                      "before:absolute before:left-0 before:top-0 before:w-px before:bg-portfolio-gray/40",
                      isLastItem ? "before:h-4" : "before:h-full",
                      "after:absolute after:left-0 after:top-4 after:w-4 after:h-px after:bg-portfolio-gray/40"
                    )}
                  >
                    <div className="flex items-center gap-2 h-8 group cursor-default">
                      <FileCode2 className="w-3.5 h-3.5 text-portfolio-gray/50 transition-colors group-hover:text-portfolio-primary" />
                      <span className="text-portfolio-gray transition-colors group-hover:text-white">
                        {item}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
