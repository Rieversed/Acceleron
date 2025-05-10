import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import Icon from './Icon';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const searchBarClasses = [
    'search-bar',
    isFocused ? 'search-bar-focused' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={searchBarClasses}>
      <div className="search-bar-icon">
        <Icon type="search" size={20} />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {query && (
        <button className="search-bar-clear" onClick={handleClear}>
          <span className="search-bar-clear-icon">×</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
