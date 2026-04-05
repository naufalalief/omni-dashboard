import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";

export default function ProjectInfoModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full shadow-lg p-3 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Project Info"
      >
        <Info className="h-6 w-6" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-full sm:max-w-md md:max-w-lg px-4 sm:px-8 py-5 sm:py-8 overflow-y-auto rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Info className="h-5 w-5 text-primary" />
              <DialogTitle>Project Explanation</DialogTitle>
            </div>
            <DialogDescription>
              A brief explanation about the insights, priorities, and usage of
              this dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-1">
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                Insights discovered from the data:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Most popular sales channels</li>
                <li>
                  Daily revenue trends and revenue distribution by channel
                </li>
                <li>
                  Number of completed orders, profit margin, high shipping fee
                  detection
                </li>
                <li>Average transaction value and total items sold</li>
              </ul>
            </section>
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                What was prioritized:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  Key business metrics (revenue, orders, items, avg value, top
                  channels)
                </li>
                <li>Trend and distribution visualizations</li>
                <li>Transaction table with easy search, filter, and sort</li>
                <li>Automatic insights (profit margin, high shipping fee)</li>
              </ul>
            </section>
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                What was intentionally NOT included:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Customer analysis (no data available)</li>
                <li>Export/import, notifications, backend integration</li>
                <li>Irrelevant visualizations/charts</li>
                <li>Edit/delete data features</li>
              </ul>
            </section>
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                How a user would use this daily:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>View business performance summary</li>
                <li>Monitor most effective channels and sales trends</li>
                <li>Detect shipping cost anomalies</li>
                <li>Search/filter/sort transactions for detailed analysis</li>
                <li>Make quick decisions from dashboard insights</li>
              </ul>
            </section>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
