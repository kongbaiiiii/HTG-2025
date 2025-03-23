import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function UniversityInput({ universityInfo, handleUniversityInfoChange }: { universityInfo: any, handleUniversityInfoChange: any }) {
  return (<>
    <DialogTitle>University Expenses</DialogTitle>
    <DialogDescription className="text-base">
      Please enter your estimated university expenses:
    </DialogDescription>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="flex flex-col">
        <label htmlFor="tuition" className="text-sm font-medium mb-1">Tuition per Semester ($)</label>
        <input
          type="number"
          id="tuition"
          name="tuition"
          min="0"
          value={universityInfo.tuition}
          onChange={handleUniversityInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="rent" className="text-sm font-medium mb-1">Monthly Rent ($)</label>
        <input
          type="number"
          id="rent"
          name="rent"
          min="0"
          value={universityInfo.rent}
          onChange={handleUniversityInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="food" className="text-sm font-medium mb-1">Monthly Food ($)</label>
        <input
          type="number"
          id="food"
          name="food"
          min="0"
          value={universityInfo.food}
          onChange={handleUniversityInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="transportation" className="text-sm font-medium mb-1">Monthly Transportation ($)</label>
        <input
          type="number"
          id="transportation"
          name="transportation"
          min="0"
          value={universityInfo.transportation}
          onChange={handleUniversityInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="books" className="text-sm font-medium mb-1">Books per Semester ($)</label>
        <input
          type="number"
          id="books"
          name="books"
          min="0"
          value={universityInfo.books}
          onChange={handleUniversityInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="other" className="text-sm font-medium mb-1">Other Monthly Expenses ($)</label>
        <input
          type="number"
          id="other"
          name="other"
          min="0"
          value={universityInfo.other}
          onChange={handleUniversityInfoChange}
          className="border rounded-md p-2"
        />
      </div>
    </div>
  </>);
}
