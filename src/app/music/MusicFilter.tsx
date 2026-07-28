'use client';

import { EnhancedButton } from '@/components/ui';

interface MusicFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function MusicFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: MusicFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => (
        <EnhancedButton
          key={category}
          variant={activeCategory === category ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="capitalize"
        >
          {category}
        </EnhancedButton>
      ))}
    </div>
  );
}