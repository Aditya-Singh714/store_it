"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Sort = () => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize the selected sort as undefined on the server side to avoid mismatch
  const [selectedSort, setSelectedSort] = useState<string | undefined>(undefined);

  // Sync selected sort with query parameter on client-side only
  useEffect(() => {
    const sortParam = searchParams.get("sort") || sortTypes[0].value;
    setSelectedSort(sortParam);
  }, [searchParams]);

  const handleSort = (value: string) => {
    setSelectedSort(value);
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort} value={selectedSort}>
      <SelectTrigger className="sort-select">
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent className="sort-select-content">
        {sortTypes.map((sort) => (
          <SelectItem key={sort.label} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
