import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type LeaderboardEntry = {
  email: string;
  score: number;
};

interface LeaderboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaderboard: LeaderboardEntry[];
  yourScore: number;
}

const LeaderboardDialog = ({
  open,
  onOpenChange,
  leaderboard,
  yourScore
}: LeaderboardDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Financial Fortune Leaderboard 🏆</DialogTitle>
          <DialogDescription className="text-center pt-2">
            See how you stack up against other financial wizards!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-green-50 p-4 rounded-lg mb-4 text-center">
            <h3 className="font-semibold text-lg">Your Score: {yourScore}</h3>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <tr key={index} className={index === 0 ? "bg-yellow-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                        {index === 0 && " 👑"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.email.split('@')[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right font-semibold">
                        {entry.score}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                      No scores recorded yet. Be the first!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardDialog;