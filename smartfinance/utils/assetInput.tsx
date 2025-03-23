import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AssetInput({ assetsInfo, handleAssetsInfoChange }: { assetsInfo: any, handleAssetsInfoChange: any }) {
  return (<>
    <DialogTitle>Assets & Debts</DialogTitle>
    <DialogDescription className="text-base">
      Please enter your current assets and debts:
    </DialogDescription>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="flex flex-col">
        <label htmlFor="savingsAccount" className="text-sm font-medium mb-1">Savings Account ($)</label>
        <input
          type="number"
          id="savingsAccount"
          name="savingsAccount"
          min="0"
          value={assetsInfo.savingsAccount}
          onChange={handleAssetsInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="savingsAccountInterest" className="text-sm font-medium mb-1">Savings Account Interest (%)</label>
        <input
          type="number"
          id="savingsAccountInterest"
          name="savingsAccountInterest"
          min="0"
          value={assetsInfo.savingsAccountInterest}
          onChange={handleAssetsInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="creditCardDebt" className="text-sm font-medium mb-1">Credit Card Debt ($)</label>
        <input
          type="number"
          id="creditCardDebt"
          name="creditCardDebt"
          min="0"
          value={assetsInfo.creditCardDebt}
          onChange={handleAssetsInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="otherDebt" className="text-sm font-medium mb-1">Other Debt ($)</label>
        <input
          type="number"
          id="otherDebt"
          name="otherDebt"
          min="0"
          value={assetsInfo.otherDebt}
          onChange={handleAssetsInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="otherDebtInterest" className="text-sm font-medium mb-1">Other Debt Interest Rate (%)</label>
        <input
          type="number"
          id="otherDebtInterest"
          name="otherDebtInterest"
          min="0"
          value={assetsInfo.otherDebtInterest}
          onChange={handleAssetsInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="otherDebtCompounding" className="text-sm font-medium mb-1 no-wrap">Other Debt Compound (per year)</label>
        <input
          type="number"
          id="otherDebtCompounding"
          name="otherDebtCompounding"
          min="0"
          value={assetsInfo.otherDebtCompounding}
          onChange={handleAssetsInfoChange}
          className="border rounded-md p-2"
        />
      </div>
    </div>
  </>);
}
