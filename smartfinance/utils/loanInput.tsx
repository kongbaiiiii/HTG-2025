import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LoanInput({ loanInfo, handleLoanInfoChange }: { loanInfo: any, handleLoanInfoChange: any }) {
  return (<>
    <DialogTitle>Loans & Financial Aid</DialogTitle>
    <DialogDescription className="text-base">
      Please enter your estimated loans and financial aid:
    </DialogDescription>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="flex flex-col">
        <label htmlFor="osapGrant" className="text-sm font-medium mb-1">OSAP Grant ($/year)</label>
        <input
          type="number"
          id="osapGrant"
          name="osapGrant"
          min="0"
          value={loanInfo.osapGrant}
          onChange={handleLoanInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="osapLoan" className="text-sm font-medium mb-1">OSAP Loan ($/year)</label>
        <input
          type="number"
          id="osapLoan"
          name="osapLoan"
          min="0"
          value={loanInfo.osapLoan}
          onChange={handleLoanInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="totalOsapAid" className="text-sm font-medium mb-1">OSAP Aid ($/year)</label>
        <input
          type="number"
          id="totalOsapAid"
          name="totalOsapAid"
          min="0"
          value={loanInfo.totalOsapAid}
          onChange={handleLoanInfoChange}
          className="border rounded-md p-2"
          disabled
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="osapLoanRemaining" className="text-sm font-medium mb-1">OSAP Loan Remaining ($/year)</label>
        <input
          type="number"
          id="osapLoanRemaining"
          name="osapLoanRemaining"
          min="0"
          value={loanInfo.osapLoanRemaining}
          onChange={handleLoanInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      {/* <div className="flex flex-col">
        <label htmlFor="creditCardDebt" className="text-sm font-medium mb-1">Credit Card Debt ($ total)</label>
        <input
          type="number"
          id="creditCardDebt"
          name="creditCardDebt"
          min="0"
          value={loanInfo.creditCardDebt}
          onChange={handleLoanInfoChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="otherDebt" className="text-sm font-medium mb-1">Other Debt ($ total)</label>
        <input
          type="number"
          id="otherDebt"
          name="otherDebt"
          min="0"
          value={loanInfo.otherDebt}
          onChange={handleLoanInfoChange}
          className="border rounded-md p-2"
        />
      </div> */}
    </div>
  </>);
}
