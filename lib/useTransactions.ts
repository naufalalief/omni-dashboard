import { useEffect, useState } from "react";
import { parseCsv } from "@/lib/csv";
import { Transaction } from "@/lib/interfaces";

export function useTransactions(): Transaction[] {
  const [data, setData] = useState<Transaction[]>([]);
  useEffect(() => {
    fetch("/import/frontend-engineer-task.csv")
      .then(res => res.text())
      .then(text => {
        setData(parseCsv(text) as Transaction[]);
      });
  }, []);
  return data;
}
