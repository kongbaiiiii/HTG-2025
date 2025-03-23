import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function IncomeInput({ incomeInfo, handleIncomeInfoChange }: { incomeInfo: any, handleIncomeInfoChange: any }) {
  return (<>
    <DialogTitle>Income</DialogTitle>
    <DialogDescription className="text-base">
      Please enter your estimated income sources:
    </DialogDescription>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="flex flex-col">
        <label htmlFor="partTimeJob" className="text-sm font-medium mb-1">Part-Time Job ($/month)</label>
        <input
          type="number"
          id="partTimeJob"
          name="partTimeJob"
          min="0"
          value={incomeInfo.partTimeJob}
          onChange={handleIncomeInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="scholarships" className="text-sm font-medium mb-1">Scholarships ($/year)</label>
        <input
          type="number"
          id="scholarships"
          name="scholarships"
          min="0"
          value={incomeInfo.scholarships}
          onChange={handleIncomeInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bursaries" className="text-sm font-medium mb-1">Bursaries ($/year)</label>
        <input
          type="number"
          id="bursaries"
          name="bursaries"
          min="0"
          value={incomeInfo.bursaries}
          onChange={handleIncomeInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="RESP" className="text-sm font-medium mb-1">RESP ($ total)</label>
        <input
          type="number"
          id="RESP"
          name="RESP"
          min="0"
          value={incomeInfo.RESP}
          onChange={handleIncomeInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="parentalSupport" className="text-sm font-medium mb-1">Parental Support ($/month)</label>
        <input
          type="number"
          id="parentalSupport"
          name="parentalSupport"
          min="0"
          value={incomeInfo.parentalSupport}
          onChange={handleIncomeInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="otherIncome" className="text-sm font-medium mb-1">Other Income ($/month)</label>
        <input
          type="number"
          id="otherIncome"
          name="otherIncome"
          min="0"
          value={incomeInfo.otherIncome}
          onChange={handleIncomeInfoChange}
          className="border rounded-md p-2"
        />
      </div>
    </div>
  </>);
}
