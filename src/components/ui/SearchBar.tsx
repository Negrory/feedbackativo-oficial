
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Buscar...', 
  className, 
  initialValue = '' 
}) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'relative flex w-full max-w-3xl mx-auto',
        className
      )}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        
        <input
          type="search"
          className="block w-full p-3 pl-10 pr-12 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-primary/20 dark:focus:border-primary transition-all duration-200"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-16 flex items-center pr-3"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="ml-2 flex-shrink-0"
        disabled={!query.trim()}
      >
        Buscar
      </Button>
    </form>
  );
};

export default SearchBar;
