"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterService: (service: string | null) => void;
  services: string[];
}

export function SearchBar({
  onSearch,
  onFilterService,
  services,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleQueryChange(value: string) {
    setQuery(value);
    debouncedSearch(value);
  }

  function handleServiceSelect(service: string | null) {
    setSelectedService(service);
    onFilterService(service);
    setDropdownOpen(false);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar profissionais..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            type="button"
            onClick={() => handleQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          variant="outline"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={cn(
            "w-full sm:w-auto justify-between gap-2 min-w-[180px]",
            selectedService && "border-violet-300 bg-violet-50"
          )}
        >
          <span className="truncate">
            {selectedService ?? "Todos os serviços"}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 flex-shrink-0 transition-transform",
              dropdownOpen && "rotate-180"
            )}
          />
        </Button>

        {dropdownOpen && (
          <div className="absolute z-50 mt-1 w-full min-w-[200px] rounded-lg border bg-white shadow-lg">
            <div className="p-1">
              <button
                type="button"
                onClick={() => handleServiceSelect(null)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-violet-50 transition-colors",
                  !selectedService && "bg-violet-50 text-violet-700 font-medium"
                )}
              >
                Todos os serviços
              </button>
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceSelect(service)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-violet-50 transition-colors",
                    selectedService === service &&
                      "bg-violet-50 text-violet-700 font-medium"
                  )}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedService && (
        <Badge
          variant="secondary"
          className="bg-violet-100 text-violet-700 gap-1 self-center cursor-pointer hover:bg-violet-200"
          onClick={() => handleServiceSelect(null)}
        >
          {selectedService}
          <X className="h-3 w-3" />
        </Badge>
      )}
    </div>
  );
}
