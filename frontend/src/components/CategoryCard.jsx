import React from 'react';

function CategoryCard({ image,name,onClick }) {
  return (
    <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] shrink-0 overflow-hidden rounded-3xl border border-[#d5ece9] bg-white shadow-xl shadow-teal-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#0f8b8d]" onClick={()=>onClick()}>
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={name || 'Category'}
          className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />

        {/* small white label box over image (bottom centered) */}
        <div className="absolute bottom-0 left-0 w-full bg-white/85 px-3 py-2 text-center text-sm font-bold text-[#173a3a] shadow backdrop-blur">
          {name}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
