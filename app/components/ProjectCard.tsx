import React from "react";

type ProjectCardProps = {
  image: string;
  title: string;
  description: string;
  filters?: string[];
};

export default function ProjectCard({
  image,
  title,
  description,
  filters = [],
}: ProjectCardProps) {
  return (
    <div className="flex-none w-[560px] h-[420px] bg-white rounded-md overflow-hidden shadow-sm">
      {/* IMAGEM */}
      <div className="w-full h-[250px] bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXTO */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        <p className="text-sm text-gray-700 mt-1">{description}</p>
      </div>

      {/* FILTROS */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {filters.map((filter, index) => (
            <span
              key={index}
              className="bg-[#0077CC] text-white text-xs px-4 py-2 rounded-sm"
            >
              {filter}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
