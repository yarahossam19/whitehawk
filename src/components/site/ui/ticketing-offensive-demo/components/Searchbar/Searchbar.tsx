"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import "./search-bar.scss";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  className?: string;
  parentClassName?: string;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch = () => {},
  className = "",
  parentClassName = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className={`search-bar ${parentClassName || ""}`}>
      <Search className="search-bar__icon" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`search-bar__input ${className}`}
      />
      {searchTerm && (
        <button onClick={clearSearch} className="search-bar__clear" type="button">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
